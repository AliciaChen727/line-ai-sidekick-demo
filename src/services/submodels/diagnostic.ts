import type { SidekickMessage } from '../../types';

export const handleDiagnostic = (
    _input: string,
    _context: SidekickMessage[],
    responseId: string
): SidekickMessage => {
    return {
        id: responseId,
        role: 'assistant',
        text: "I analyzed your recent broadcasts. There has been a significant change in your Click-Through Rate (CTR).",
        timestamp: Date.now(),
        submodel: 'Diagnostic',
        showFeedback: true,
        diagnostics: {
            metric: 'Click-Through Rate (CTR)',
            currentValue: '1.2%',
            trend: 'down',
            percentageChange: '-4.8%',
            possibleReasons: [
                'The last 3 broadcasts were sent outside of optimal engagement hours (usually 6PM - 9PM).',
                'Recent promotions had less clear calls-to-action compared to historical averages.'
            ]
        }
    };
};
