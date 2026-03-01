import { useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useSidekick } from '../../hooks/useSidekick';

interface ChatContainerProps {
    sidekick: ReturnType<typeof useSidekick>;
}

const ChatContainer = ({ sidekick }: ChatContainerProps) => {
    const { messages, isTyping, error, sendMessage, updateMessageFeedback } = sidekick;
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
