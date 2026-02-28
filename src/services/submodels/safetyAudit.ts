import type { SidekickMessage } from '../../types';

export const handleSafetyAudit = (
    _input: string,
    responseId: string
): SidekickMessage => {
    return {
        id: responseId,
        role: 'assistant',
        text: "⚠️ Safety Alert: I detected keywords often associated with phishing or sensitive compliance issues in your message.",
        timestamp: Date.now(),
        submodel: 'SafetyAudit',
        showFeedback: false,
        diagnostics: {
            metric: 'Risk Level',
            currentValue: 'High',
            trend: 'neutral',
            percentageChange: '0%',
            possibleReasons: [
                'Detected "win an iphone" which triggers our anti-spam guidelines.',
                'Links to unverified domains found in the draft.'
            ]
        }
    };
};
