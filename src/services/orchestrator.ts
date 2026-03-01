import type { SidekickMessage } from '../types';
import { handleOnboarding } from './submodels/onboarding';
import { handleNavigation } from './submodels/navigation';
import { handleSafetyAudit } from './submodels/safetyAudit';

// The "Brain": Intent Recognition Categories
type IntentCategory = 'Education' | 'FeatureDiscovery' | 'Troubleshooting' | 'QuotaQuery' | 'BasicAnalytics' | 'AdvancedAnalytics' | 'SafetyCheck' | 'Navigation' | 'AudienceCreation' | 'RichMenuSetup' | 'SizeConsultant' | 'ProactivePromo' | 'Unknown';

const detectIntent = (text: string): IntentCategory => {
    const lowerText = text.toLowerCase();

    // Safety always has priority
    if (lowerText.includes('win an iphone') || lowerText.includes('click this link') || lowerText.includes('password')) {
        return 'SafetyCheck';
    }

    // Audience Creation / Tagging
    if (lowerText.includes('標籤') || lowerText.includes('受眾')) {
        return 'AudienceCreation';
    }

    // Phase 9: Rich Menu Architect
    if (lowerText.includes('圖文選單') || lowerText.includes('設定選單') || lowerText.includes('rich menu')) {
        return 'RichMenuSetup';
    }
    if (lowerText.includes('尺寸') || lowerText.includes('大小') || lowerText.includes('size')) {
        return 'SizeConsultant';
    }
    if (lowerText.includes('特賣') || lowerText.includes('促銷') || lowerText.includes('flash sale')) {
        return 'ProactivePromo';
    }

    // Feature Discovery / Onboarding
    if (lowerText.includes('how to start') || lowerText.includes('newbie')) {
        return 'FeatureDiscovery';
    }

    // Advanced Analytics (Regex approach for robustness)
    if (/(分析報告|最近成效|分析|成效報告)/i.test(lowerText) || /(分析報告|最近成效|分析|成效報告)/.test(text)) {
        return 'AdvancedAnalytics';
    }

    // Basic Analytics (Updated for mock services)
    if (/(ctr|open rate|drop|成效)/i.test(lowerText)) {
        return 'BasicAnalytics';
    }

    // Navigation (Troubleshooting or Quota)
    if (lowerText.includes('where is') || lowerText.includes('show me') || lowerText.includes('page') || lowerText.includes('quota')) {
        if (lowerText.includes('quota')) return 'QuotaQuery';
        return 'Navigation';
    }

    return 'Unknown';
};

// Phase 3: Simulated ReAct Loop (Reasoning + Act)
export const orchestratorProcess = async (
    userInput: string,
    contextHistory: SidekickMessage[],
    onUpdate?: (partialMsg: Partial<SidekickMessage>) => void
): Promise<SidekickMessage> => {

    const intent = detectIntent(userInput);
    const responseId = `msg-${Date.now()}`;

    // Priority Check
    if (intent === 'SafetyCheck') {
        return handleSafetyAudit(userInput, responseId);
    }

    // --- REASONING LOOP START ---

    if (onUpdate) onUpdate({ isThinking: true, thinkingProcess: ["🧠 正在解析對話意圖與歷史上下文..."] });
    await new Promise(resolve => setTimeout(resolve, 800));

    let finalResponse: Partial<SidekickMessage> = {
        role: 'assistant',
        timestamp: Date.now(),
        showFeedback: true,
        thinkingProcess: ["🧠 正在解析對話意圖與歷史上下文..."]
    };

    if (intent === 'BasicAnalytics') {
        // Step 1: Thought & Action
        if (onUpdate) onUpdate({
            thinkingProcess: [
                ...finalResponse.thinkingProcess!,
                "🔍 正在撈取最新推播數據..."
            ]
        });

        // Execute Tool
        const { executeTool } = await import('../lib/ai/tools');
        const stats: any = await executeTool("get_broadcast_performance");

        // Step 2: Observation
        if (onUpdate) onUpdate({
            thinkingProcess: [
                ...finalResponse.thinkingProcess!,
                "🔍 正在撈取最新推播數據...",
                "💡 正在比對點擊率 (CTR) 與開封率與同產業均值..."
            ]
        });
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Step 3: Final Output Generation
        finalResponse = {
            ...finalResponse,
            submodel: 'Diagnostic',
            text: `我已經為您整理了最近一次推播「${stats.name}」的成效數據。目前看來點擊率 (${stats.ctr * 100}%) 偏低。`,
            diagnostics: {
                metric: "Click-Through Rate (CTR)",
                currentValue: `${stats.ctr * 100}%`,
                trend: "down",
                percentageChange: stats.comparison.ctr,
                possibleReasons: [
                    `推播時間 (${stats.send_date}) 的競爭訊息較多`,
                    "圖片或文案未能有效吸引目前受眾點擊",
                    `受眾輪廓與推播總數 (${stats.target_reach}) 較為發散`
                ]
            },
            chartData: {
                type: 'performance',
                title: `推播成效: ${stats.name}`,
                data: {
                    labels: ['Target', 'Delivered', 'Opened', 'Clicked'],
                    values: [stats.target_reach, stats.delivered, stats.delivered * stats.open_rate, stats.delivered * stats.ctr]
                }
            },
            suggestions: [
                { id: "1", title: "查看詳細分析報告", icon: "activity", actionUrl: "/analytics/broadcast" },
                { id: "2", title: "使用 A/B 測試發送下一檔", icon: "send", actionUrl: "/broadcast/create" }
            ],
            isThinking: false
        };

    } else if (intent === 'AdvancedAnalytics') {
        if (onUpdate) onUpdate({
            thinkingProcess: [
                ...finalResponse.thinkingProcess!,
                "🔍 我需要查過去 7 天的點擊與開封交叉數據..."
            ]
        });

        // Use dynamic import or existing import for lineService if available.
        // For simplicity, we can just import lineService at the top or here.
        const { lineService } = await import('../lib/services/lineService');
        const report = await lineService.getAdvancedAnalytics('last_7_days');

        if (onUpdate) onUpdate({
            thinkingProcess: [
                ...finalResponse.thinkingProcess!,
                "🔍 我需要查過去 7 天的點擊與開封交叉數據...",
                "💡 我需要比對用戶輪廓特徵與轉換來源..."
            ]
        });
        await new Promise(resolve => setTimeout(resolve, 800));

        if (onUpdate) onUpdate({
            thinkingProcess: [
                ...finalResponse.thinkingProcess!,
                "🔍 我需要查過去 7 天的點擊與開封交叉數據...",
                "💡 我需要比對用戶輪廓特徵與轉換來源...",
                "⚙️ 正在彙整以上觀察以產生行銷建議..."
            ]
        });
        await new Promise(resolve => setTimeout(resolve, 800));

        // Data Synthesis
        const currentOpenRate = report.weeklyComparison.current_week.open_rate;
        const prevOpenRate = report.weeklyComparison.previous_week.open_rate;
        const openRateDiff = ((currentOpenRate - prevOpenRate) * 100).toFixed(0);
        const openRateText = Number(openRateDiff) > 0 ? `上升 ${openRateDiff}%` : `下降 ${Math.abs(Number(openRateDiff))}%`;

        // Insight Generation
        const topChannel = report.channels.reduce((prev, current) => (prev.percentage > current.percentage) ? prev : current);
        const topDemographicInfo = report.demographics.ageGroups.reduce((prev, current) => (prev.percentage > current.percentage) ? prev : current);
        const topContent = report.topContent.reduce((prev, current) => (prev.ctr > current.ctr) ? prev : current);

        finalResponse = {
            ...finalResponse,
            submodel: 'Diagnostic',
            text: `👉 **根據我的分析，我發現了三個關鍵因素：**\n\n**1. 成效概況**\n相較於上週，本週整體開封率**${openRateText}**。這是一個不錯的成長幅度！\n\n**2. 用戶輪廓與管道分析**\n目前您有 ${(topChannel.percentage * 100).toFixed(0)}% 的好友來自**${topChannel.source}**。而在主力客群方面，**${topDemographicInfo.range}歲女性**的互動最為活躍。\n\n**3. 最強貼文表現**\n本週表現最好的內容為「${topContent.title}」，點擊率高達 ${(topContent.ctr * 100).toFixed(0)}%。\n\n**💡 Sidekick 建議**\n建議可以針對「${topDemographicInfo.range}歲女性」客群，投放更多類似「${topContent.title}」或相關主題的優惠活動，以延續此刻的高參與度！`,
            analyticsReport: report, // Appends the raw mock data for UI rendering
            isThinking: false
        };

    } else if (intent === 'AudienceCreation') {
        // Step 1: Thought & Action
        if (onUpdate) onUpdate({
            thinkingProcess: [
                ...finalResponse.thinkingProcess!,
                "Intent: Feature Discovery. Need to guide user to create Chat Tag Audience.",
                "Action: check_audience_status()"
            ]
        });
        await new Promise(resolve => setTimeout(resolve, 800));

        // Step 2: Observation
        const audienceStatus = "calculating"; // mocked status
        const obsString = `Observation: Audience creation guide ready. Current audience status is '${audienceStatus}'.`;

        if (onUpdate) onUpdate({
            thinkingProcess: [
                ...finalResponse.thinkingProcess!,
                "Intent: Feature Discovery. Need to guide user to create Chat Tag Audience.",
                "Action: check_audience_status()",
                obsString,
                "Generating step-by-step checklist with proactive suggestions..."
            ]
        });
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Step 3: Final Output Generation
        finalResponse = {
            ...finalResponse,
            submodel: 'Onboarding',
            text: "建立「聊天標籤受眾」可以幫助您更精準地鎖定目標客群。請參考以下步驟進行設定：",
            taskCards: [
                {
                    id: 'step-1',
                    title: '進入後台「受眾」選單',
                    description: '',
                    completed: false,
                    actionText: '前往該頁面',
                    actionUrl: '/audience'
                },
                {
                    id: 'step-2',
                    title: '點擊「建立」按鈕',
                    description: '',
                    completed: false,
                    actionText: '前往該頁面',
                    actionUrl: '/audience/create'
                },
                {
                    id: 'step-3',
                    title: '下拉選單選擇「聊天標籤受眾」',
                    description: '',
                    completed: false,
                    actionText: '前往該頁面',
                    actionUrl: '/audience/create'
                },
                {
                    id: 'step-4',
                    title: '挑選已標記的標籤',
                    description: '（需先有標籤資料）',
                    completed: false,
                    actionText: '前往該頁面',
                    actionUrl: '/audience/create'
                }
            ],
            isThinking: false
        };

    } else if (intent === 'RichMenuSetup') {
        if (onUpdate) onUpdate({
            thinkingProcess: [
                ...finalResponse.thinkingProcess!,
                "Intent: Feature Guidance. User needs help setting up a Rich Menu.",
                "Action: get_rich_menu_guidance_steps()"
            ]
        });
        await new Promise(resolve => setTimeout(resolve, 800));

        finalResponse = {
            ...finalResponse,
            submodel: 'Navigation',
            text: "為您準備了「圖文選單設定」的引導流程，您可以依序完成設定：",
            richMenuGuidance: {
                steps: [
                    {
                        id: 'step-1',
                        title: '步驟 1：選擇版型',
                        description: '依據您的溝通目的，選擇大型或小型的圖文選單版型。',
                        actionUrl: '/richmenu/template',
                        actionText: '選擇版型'
                    },
                    {
                        id: 'step-2',
                        title: '步驟 2：上傳背景圖片',
                        description: '上傳符合規定尺寸的圖片作為圖文選單背景。',
                        actionUrl: '/richmenu/upload',
                        actionText: '上傳圖片'
                    },
                    {
                        id: 'step-3',
                        title: '步驟 3：設定點擊動作',
                        description: '為每個區塊設定對應的連結或關鍵字回覆。',
                        actionUrl: '/richmenu/actions',
                        actionText: '設定動作'
                    },
                    {
                        id: 'step-4',
                        title: '步驟 4：設定顯示期間',
                        description: '決定此圖文選單在哪個時間段對用戶顯示。',
                        actionUrl: '/richmenu/schedule',
                        actionText: '設定期間'
                    }
                ]
            },
            isThinking: false
        };

    } else if (intent === 'SizeConsultant') {
        if (onUpdate) onUpdate({
            thinkingProcess: [
                ...finalResponse.thinkingProcess!,
                "Intent: Specifications. User asked about image dimensions.",
                "Action: provide_size_consultant_card()"
            ]
        });
        await new Promise(resolve => setTimeout(resolve, 600));

        finalResponse = {
            ...finalResponse,
            submodel: 'Onboarding',
            text: "圖文選單有兩種主要尺寸，建議您依照以下規範設計圖片：",
            sizeConsultant: {
                imageUrl: '/sizes.png', // Handled by CSS/Icons in UI
                largeSize: '2500 × 1686 px',
                smallSize: '2500 × 843 px',
                downloadUrl: '#'
            },
            isThinking: false
        };

    } else if (intent === 'ProactivePromo') {
        if (onUpdate) onUpdate({
            thinkingProcess: [
                ...finalResponse.thinkingProcess!,
                "Context Alert: Detected promotional keyword '限時特賣'.",
                "Analysis: Promotions require high visibility calls-to-action.",
                "Action: suggest_rich_menu_update()"
            ]
        });
        await new Promise(resolve => setTimeout(resolve, 800));

        finalResponse = {
            ...finalResponse,
            submodel: 'Diagnostic',
            text: "好的，關於限時特賣的推播設定已經為您準備好。另外，我偵測到您目前正在舉辦促銷活動：",
            proactiveAlert: {
                title: '行銷成效優化建議',
                description: '在活動期間，消費者進站意願高。',
                suggestionText: '建議更新圖文選單的 A 區塊為「立即下單 / 活動會場」專屬連結，預估可提升 15% 轉單率。',
                actionUrl: '/richmenu/edit'
            },
            isThinking: false
        };

    } else if (intent === 'FeatureDiscovery' || intent === 'Education') {
        return handleOnboarding(userInput, contextHistory, responseId);
    } else if (intent === 'Navigation' || intent === 'QuotaQuery') {
        return handleNavigation(userInput, responseId);
    } else {
        finalResponse = {
            ...finalResponse,
            submodel: 'General',
            text: "我了解您的問題了。[最新版系統] 身為您的 AI 助理，我目前仍在學習如何處理這個特定的請求。您可以嘗試詢問關於推播成效 (例如：「我的推播成效如何？」) 或功能設定 (例如：「如何建立圖文選單？」)",
            isThinking: false
        }
    }

    return { ...finalResponse, id: responseId } as SidekickMessage;
};
