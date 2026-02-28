import type { SidekickMessage } from '../../types';

export const handleOnboarding = (
    _input: string,
    _context: SidekickMessage[],
    responseId: string
): SidekickMessage => {
    return {
        id: responseId,
        role: 'assistant',
        text: "It looks like you want to learn about advanced features like Rich Menus. I've prepared a quick checklist to help you get started as an advanced merchant.",
        timestamp: Date.now(),
        submodel: 'Onboarding',
        showFeedback: true,
        taskCards: [
            {
                id: 'task-1',
                title: 'Upload a Rich Menu Image',
                description: 'Design and upload your default rich menu background.',
                completed: true,
            },
            {
                id: 'task-2',
                title: 'Set up Action Areas',
                description: 'Map buttons to specific URLs or text replies.',
                completed: false,
                actionText: 'Go to Settings',
                actionUrl: '#rich-menu-settings'
            },
            {
                id: 'task-3',
                title: 'Activate Rich Menu',
                description: 'Publish your rich menu to all users.',
                completed: false,
            }
        ]
    };
};
