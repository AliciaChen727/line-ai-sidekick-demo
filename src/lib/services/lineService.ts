// Mock Service for fetching data from the "LINE backend"
export class LineApiService {
    // Returns performance data for recent broadcasts
    async getBroadcastStats() {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return {
            broadcast_id: "B-2026-02-28",
            name: "春季專屬優惠推播",
            send_date: "2026-02-25",
            target_reach: 8930,
            delivered: 8850,
            open_rate: 0.12, // 12%
            ctr: 0.015,     // 1.5%
            status: "low",  // Categorized performance
            comparison: {
                open_rate: "-3%", // compared to previous
                ctr: "-0.5%"
            }
        };
    }

    // Returns user tag distribution
    async getUserTags() {
        await new Promise(resolve => setTimeout(resolve, 600));

        return {
            total_tagged: 5400,
            tags: [
                { name: "會員_Gold", count: 1200, percentage: 0.22 },
                { name: "近期無互動", count: 2500, percentage: 0.46 },
                { name: "對新品有興趣", count: 800, percentage: 0.15 },
                { name: "實體店常客", count: 900, percentage: 0.17 }
            ]
        };
    }

    async getMerchantStatus() {
        await new Promise(resolve => setTimeout(resolve, 400));
        return {
            account_level: "light",
            remaining_messages: 550,
            total_quota: 1000,
            features_used: ["broadcast", "rich_menu", "auto_reply"],
            features_unused: ["step_message", "coupon", "audience_retargeting"]
        };
    }

    // Returns advanced multi-dimensional analytics
    async getAdvancedAnalytics(timeRange: 'last_7_days' | 'last_30_days') {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            timeRange,
            weeklyComparison: {
                current_week: {
                    total_friends: 12500,
                    open_rate: 0.45 // 45%
                },
                previous_week: {
                    total_friends: 11800,
                    open_rate: 0.40 // 40%
                }
            },
            demographics: {
                gender: { male: 0.3, female: 0.65, unknown: 0.05 },
                ageGroups: [
                    { range: "15-24", percentage: 0.15 },
                    { range: "25-34", percentage: 0.45 },
                    { range: "35-44", percentage: 0.25 },
                    { range: "45+", percentage: 0.15 }
                ],
                locations: [
                    { city: "台北市", percentage: 0.4 },
                    { city: "新北市", percentage: 0.25 },
                    { city: "台中市", percentage: 0.15 },
                    { city: "其他", percentage: 0.2 }
                ]
            },
            channels: [
                { source: "直播廣告", percentage: 0.60, count: 420 },
                { source: "行動條碼", percentage: 0.20, count: 140 },
                { source: "搜尋", percentage: 0.15, count: 105 },
                { source: "貼文串", percentage: 0.05, count: 35 }
            ],
            topContent: [
                { id: "P_001", title: "【滑雪早鳥優惠】最後倒數", ctr: 0.12 },
                { id: "P_002", title: "冬季新品上市：教你怎麼搭", ctr: 0.08 },
                { id: "P_003", title: "限時免運倒數中", ctr: 0.05 }
            ]
        };
    }
}

export const lineService = new LineApiService();
