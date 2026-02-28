export interface SidekickMessage {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    timestamp: number;
    submodel?: 'Greeting' | 'General' | 'Onboarding' | 'Navigation' | 'Diagnostic' | 'SafetyAudit';

    // Feedback
    showFeedback?: boolean;
    isHelpful?: boolean | null;

    // Legacy Payload Types
    taskCards?: TaskCardType[];
    diagnostics?: DiagnosticInsight;
    action?: ChatAction;

    // Phase 3: Reasoning Agent (ReAct) Additions
    isThinking?: boolean; // shows the spinning loader
    thinkingProcess?: string[]; // Array of 'Thoughts' or 'Actions'

    // Actionable Suggestions List
    suggestions?: ActionableSuggestion[];

    // Data Visualization (Charts/Cards)
    chartData?: {
        type: 'performance' | 'audience';
        title: string;
        data: any;
    };

    // Phase 4: Live-Stream Quota Alert
    alertCard?: {
        title: string;
        description: string;
        progressUsed: number;
        progressTotal: number;
        purchaseAmount: number;
        purchasePrice: number;
    };

    // Phase 9: Rich Menu Architect
    richMenuGuidance?: {
        steps: {
            id: string;
            title: string;
            description: string;
            actionUrl: string;
            actionText: string;
        }[];
    };
    sizeConsultant?: {
        imageUrl: string;
        largeSize: string;
        smallSize: string;
        downloadUrl: string;
    };
    proactiveAlert?: {
        title: string;
        description: string;
        suggestionText: string;
        actionUrl: string;
    };
}

export interface ActionableSuggestion {
    id: string;
    title: string;
    icon?: 'link' | 'settings' | 'send' | 'activity';
    actionUrl?: string;
}

export interface TaskCardType {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    actionUrl?: string;
    actionText?: string;
}

export interface DiagnosticInsight {
    metric: string;
    currentValue: string;
    trend: 'up' | 'down' | 'neutral';
    percentageChange: string;
    possibleReasons: string[];
}

export interface ChatAction {
    type: 'deeplink' | 'scroll';
    target: string;
    label: string;
}
