import type { SidekickMessage } from '../../types';

export const handleNavigation = (
    _input: string,
    responseId: string
): SidekickMessage => {
    return {
        id: responseId,
        role: 'assistant',
        text: "I can help with that. Let me take you right to the Broadcast Analytics page.",
        timestamp: Date.now(),
        submodel: 'Navigation',
        showFeedback: true,
        action: {
            type: 'deeplink',
            label: 'Go to Broadcast Analytics',
            target: '/analytics/broadcast',
        }
    };
};
