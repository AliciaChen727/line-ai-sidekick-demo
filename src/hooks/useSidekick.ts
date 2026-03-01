import { useState, useCallback, useRef } from 'react';
import type { SidekickMessage } from '../types';
import { orchestratorProcess } from '../services/orchestrator';

// The Context Window Constraint: last 10 interactions for the AI model
const MAX_CONTEXT = 10;
// UI Storage Limit
const MAX_HISTORY = 100;

// Throttling Layer Params
const THROTTLE_INTERVAL_MS = 2000; // Only allow 1 request every 2 seconds

const INITIAL_MESSAGES: SidekickMessage[] = [
    {
        id: 'msg-1',
        role: 'assistant',
        text: 'Hello! I am your LINE OA Sidekick. How can I help you manage your official account today?',
        timestamp: Date.now() - 60000,
        submodel: 'Greeting',
    }
];

export const useSidekick = () => {
    const [messages, setMessages] = useState<SidekickMessage[]>(INITIAL_MESSAGES);

    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sync to localStorage
    // Removed localStorage sync

    // Throttling state
    const lastRequestTime = useRef<number>(0);
    // Priority queue mock (simple FIFO for now, ignoring priority for UI simplicity unless needed)
    const isProcessing = useRef<boolean>(false);

    const sendMessage = useCallback(async (text: string) => {
        const now = Date.now();

        // Throttling Layer (Governance)
        if (now - lastRequestTime.current < THROTTLE_INTERVAL_MS) {
            setError('Please wait a moment before sending another request.');
            setTimeout(() => setError(null), 3000);
            return;
        }

        if (isProcessing.current) return;
        isProcessing.current = true;
        lastRequestTime.current = now;

        // 1. Add User Message
        const userMsg: SidekickMessage = {
            id: `msg-${now}`,
            role: 'user',
            text,
            timestamp: now,
        };

        setMessages(prev => [...prev, userMsg].slice(-MAX_HISTORY));
        setIsTyping(true);

        try {
            // Add a temporary thinking message to hold the state
            const tempId = `msg-temp-${now}`;
            const tempMsg: SidekickMessage = {
                id: tempId,
                role: 'assistant',
                text: '',
                timestamp: now,
                isThinking: true,
                thinkingProcess: []
            };
            setMessages(prev => [...prev, tempMsg].slice(-MAX_HISTORY));

            // Dispatch to Orchestrator with Context and onUpdate callback
            const currentContext = [...messages, userMsg].slice(-MAX_CONTEXT);
            const aiResponse = await orchestratorProcess(text, currentContext, (partialMsg) => {
                setMessages(prev => prev.map(msg =>
                    msg.id === tempId ? { ...msg, ...partialMsg } : msg
                ));
            });

            // Replace the temporary message with the final response
            setMessages(prev => prev.map(msg =>
                msg.id === tempId ? aiResponse : msg
            ));
        } catch (err) {
            console.error(err);
            setError('An error occurred while processing your request.');
        } finally {
            setIsTyping(false);
            isProcessing.current = false;
        }
    }, [messages]);

    const updateMessageFeedback = useCallback((id: string, isHelpful: boolean) => {
        setMessages(prev =>
            prev.map(msg => msg.id === id ? { ...msg, isHelpful } : msg)
        );
    }, []);

    const triggerAlertCard = useCallback(() => {
        const now = Date.now();
        const alertMsg: SidekickMessage = {
            id: `msg-alert-${now}`,
            role: 'assistant',
            text: '',
            timestamp: now,
            alertCard: {
                title: '⚠️ 訊息額度即將耗盡',
                description: '目前直播流量激增，剩餘額度 182 則，預計 4 分鐘內用罄。',
                progressUsed: 9600,
                progressTotal: 10000,
                purchaseAmount: 2000,
                purchasePrice: 400
            }
        };
        setMessages(prev => [...prev, alertMsg]);
    }, []);

    const clearChat = useCallback(() => {
        setMessages(INITIAL_MESSAGES);
        setIsTyping(false);
        setError(null);
    }, []);

    return {
        messages,
        isTyping,
        error,
        sendMessage,
        updateMessageFeedback,
        triggerAlertCard,
        clearChat
    };
};
