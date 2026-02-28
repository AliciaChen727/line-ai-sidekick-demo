import { useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useSidekick } from '../../hooks/useSidekick';

interface ChatContainerProps {
    sidekick: ReturnType<typeof useSidekick>;
}

const ChatContainer = ({ sidekick }: ChatContainerProps) => {
    const { messages, isTyping, error, sendMessage, updateMessageFeedback, triggerAlertCard } = sidekick;
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <div className="flex flex-col h-full w-full">
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 scrollbar-hide flex flex-col gap-4 relative"
            >
                {/* Floating Demo Triggers (For Presentation) */}
                <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
                    <button
                        onClick={triggerAlertCard}
                        className="bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md hover:bg-red-600 transition-colors flex items-center gap-1.5 opacity-60 hover:opacity-100"
                        title="Simulate incoming quota alert"
                    >
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        Live Demo
                    </button>
                </div>

                <MessageList
                    messages={messages}
                    isTyping={isTyping}
                    onFeedback={updateMessageFeedback}
                />
                {error && (
                    <div className="text-center text-red-500 text-[13px] bg-red-50 p-2 rounded-lg border border-red-100 mx-4">
                        {error}
                    </div>
                )}
            </div>
            <div className="p-4 bg-white border-t border-line-border">
                <MessageInput onSendMessage={sendMessage} disabled={isTyping} />
            </div>
        </div>
    );
};

export default ChatContainer;
