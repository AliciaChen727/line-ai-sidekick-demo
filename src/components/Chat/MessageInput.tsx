import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MessageInputProps {
    onSendMessage: (text: string) => void;
    disabled?: boolean;
}

const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
    const [text, setText] = useState('');
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowAttachMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [text]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!text.trim() || disabled) return;
        onSendMessage(text.trim());
        setText('');
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height after send
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`relative rounded-2xl border border-line-border bg-white transition-colors flex flex-col justify-end p-2 focus-within:border-line-green focus-within:ring-2 focus-within:ring-line-green/10 ${disabled ? 'opacity-70 bg-slate-50' : ''
                }`}
        >
            <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your broadcasts or insights..."
                disabled={disabled}
                className="w-full resize-none bg-transparent outline-none max-h-[120px] text-[15px] pt-1 pb-1 px-3 text-line-dark placeholder:text-line-gray/60"
                rows={1}
            />
            <div className="flex justify-between items-center px-1 mt-2">
                <div className="relative" ref={menuRef}>
                    <button
                        type="button"
                        onClick={() => setShowAttachMenu(!showAttachMenu)}
                        className={`p-1.5 rounded-md transition disabled:opacity-50 ${showAttachMenu ? 'bg-slate-100 text-line-dark' : 'text-line-gray hover:text-line-dark hover:bg-slate-100'}`}
                        title="Attach file"
                        disabled={disabled}
                    >
                        <Paperclip className="w-5 h-5" />
                    </button>

                    <AnimatePresence>
                        {showAttachMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute bottom-[calc(100%+12px)] left-0 w-64 bg-white border border-line-border shadow-widget rounded-2xl p-2 z-50 flex flex-col gap-1"
                            >
                                <button
                                    type="button"
                                    onClick={() => setShowAttachMenu(false)}
                                    className="w-full text-left px-3 py-2.5 rounded-xl bg-[#F0F2F5] hover:bg-slate-200 flex items-center justify-between transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <Paperclip className="w-5 h-5 text-line-dark" />
                                        <span className="text-[15px] font-medium text-line-dark">新增照片和檔案</span>
                                    </div>
                                    <span className="text-[13px] text-line-gray font-mono group-hover:text-line-dark transition-colors">⌘ U</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowAttachMenu(false)}
                                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-3 transition-colors"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 87.3 60" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M58.1 49c-1.3 2.1-3.4 3.5-5.9 3.5H20.3c2.4 0 4.6-1.4 5.9-3.5L46.6 6l5.9 10.3 17.5 30.6-11.9 2.1z" fill="#00832d" />
                                        <path d="M58.1 49l-11.9-20.7H11.5L23.3 49h34.8z" fill="#0066da" />
                                        <path d="M31.8 16.3l14.8-25.7c-2.4 0-4.6 1.4-5.9 3.5L5.9 49C4.6 46.9 3.9 44.5 3.9 42c0-2.5.7-4.9 2-7.1L31.8 16.3z" fill="#e92a2b" />
                                        <path d="M20.3 52.5h31.9l-5.9-10.3H11.5L0 42c1.3 2.1 3.4 3.5 5.9 3.5h14.4z" fill="#ffba00" />
                                        <path d="M40.7 1.1h30.2c2.5 0 4.9.7 7.1 2-2.1-1.3-4.6-2-7.1-2H40.7z" fill="#f3aba8" />
                                        <path d="M87.3 42c0 2.5-.7 4.9-2 7.1l-11.8 20.3-5.9-10.3L87.3 42z" fill="#00a651" />
                                        <path d="M52.3 21.2l5.8-10.1 27.2 47.1c-1.3-2.1-3.4-3.5-5.9-3.5H52.3z" fill="#20c997" />
                                        <path d="M46.6 31.8l-5.9-10.2L14.7 6c1.3-2.1 3.4-3.5 5.9-3.5h31.9l-5.9 10.3L46.6 31.8z" fill="#ffc107" />
                                    </svg>
                                    <span className="text-[15px] font-medium text-line-dark">從 Google Drive 新增</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    type="submit"
                    disabled={!text.trim() || disabled}
                    className="p-1.5 bg-line-green text-white rounded-full hover:bg-line-greenHover transition-colors disabled:opacity-50 disabled:hover:bg-line-green flex items-center justify-center shrink-0"
                >
                    <Send className="w-4 h-4 ml-0.5" />
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
