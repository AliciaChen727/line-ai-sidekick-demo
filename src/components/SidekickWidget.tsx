import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Maximize2, Minimize2, Settings, Sparkles, History, MoreHorizontal, Bookmark, Edit, FileText } from 'lucide-react';
import ChatContainer from './Chat/ChatContainer';
import { HistoryDrawer } from './Chat/HistoryDrawer';
import { useSidekick } from '../hooks/useSidekick';

const SidekickWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [historyMode, setHistoryMode] = useState<'all' | 'saved'>('all');
    const [isPersonalized, setIsPersonalized] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [showSettingsTooltip, setShowSettingsTooltip] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOnboarding(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // Provide clearChat from context or hook if hoisting is possible, 
    // or simulate it if it's trapped inside ChatContainer
    // Right now SidekickWidget wraps ChatContainer, so we don't have direct access to useSidekick here unless we hoist it. 
    // Wait, earlier I added useSidekick import here. Let me use it.
    const sidekick = useSidekick();

    return (
        <>
            <AnimatePresence>
                {/* Floating Action Button */}
                {!isOpen && (
                    <>
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            onClick={() => {
                                setIsOpen(true);
                                setShowOnboarding(false);
                            }}
                            className="fixed bottom-6 right-6 w-14 h-14 bg-line-green rounded-full shadow-lg flex items-center justify-center text-white hover:bg-line-greenHover transition-colors z-50 group"
                        >
                            <Sparkles className="w-6 h-6 absolute opacity-0 group-hover:opacity-100 transition-opacity translate-x-3 -translate-y-3" />
                            <MessageCircle className="w-7 h-7 absolute" />
                        </motion.button>

                        {/* Onboarding Tooltip */}
                        <AnimatePresence>
                            {showOnboarding && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className="fixed bottom-9 right-[90px] bg-[#495C75] text-white px-5 py-3.5 rounded-2xl rounded-tr-md shadow-xl z-50 max-w-[260px]"
                                >
                                    {/* Right-pointing arrow */}
                                    <div className="absolute top-4 -right-2 w-0 h-0 border-t-[8px] border-t-transparent border-l-[10px] border-l-[#495C75] border-b-[8px] border-b-transparent drop-shadow-sm" />
                                    <p className="text-[15px] leading-relaxed font-medium tracking-wide">
                                        您好！LINE AI Sidekick 在此。現在就和我聊聊吧！
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {/* The Sidebar panel */}
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                        className={`fixed bottom-0 right-0 top-0 bg-white shadow-widget z-50 flex flex-col border-l border-line-border ${isExpanded ? 'w-[600px] md:w-[800px]' : 'w-[380px] sm:w-[420px]'
                            } transition-all duration-300 ease-in-out`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-line-border bg-white sticky top-0 z-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-line-green to-emerald-300 flex items-center justify-center shadow-sm">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-line-dark text-[15px] leading-tight flex items-center gap-2">
                                        LINE AI Sidekick
                                        <span className="text-[10px] bg-slate-100 text-line-gray px-1.5 py-0.5 rounded-sm uppercase font-bold tracking-wider">Beta</span>
                                    </h2>
                                    <p className="text-xs text-line-gray">Your intelligent co-pilot</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="p-1.5 rounded-md hover:bg-line-lightBg text-line-gray transition-colors"
                                    title={isExpanded ? "Collapse" : "Expand"}
                                >
                                    {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                </button>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowMoreMenu(!showMoreMenu)}
                                        className={`p-1.5 rounded-md transition-colors relative ${showMoreMenu ? 'bg-line-lightBg text-line-dark' : 'text-line-gray hover:bg-line-lightBg'}`}
                                        title="More Options"
                                    >
                                        <MoreHorizontal className="w-5 h-5" />
                                        {/* Active Dot indicator for personalized reply */}
                                        {isPersonalized && (
                                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-line-green rounded-full border border-white" />
                                        )}
                                    </button>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {showMoreMenu && (
                                            <>
                                                {/* Backdrop to close menu */}
                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() => setShowMoreMenu(false)}
                                                />
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute right-0 top-full mt-2 w-56 bg-white border border-line-border shadow-widget rounded-2xl py-2 z-[999] text-[14px] text-line-dark font-medium"
                                                >
                                                    {/* Dropdown Arrow */}
                                                    <div className="absolute -top-2 right-3 w-4 h-4 bg-white border-t border-l border-line-border transform rotate-45" />

                                                    <div className="relative z-10 bg-white rounded-2xl">
                                                        {/* Option: Chat History */}
                                                        <button
                                                            onClick={() => {
                                                                setHistoryMode('all');
                                                                setIsHistoryOpen(true);
                                                                setShowMoreMenu(false);
                                                            }}
                                                            className="w-full text-left px-5 py-3 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                                                        >
                                                            <History className="w-[18px] h-[18px] text-line-dark" />
                                                            聊天紀錄
                                                        </button>

                                                        {/* Option: Saved Chats */}
                                                        <button
                                                            onClick={() => {
                                                                setHistoryMode('saved');
                                                                setIsHistoryOpen(true);
                                                                setShowMoreMenu(false);
                                                            }}
                                                            className="w-full text-left px-5 py-3 hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-100"
                                                        >
                                                            <Bookmark className="w-[18px] h-[18px] text-line-dark" />
                                                            已收藏的對話
                                                        </button>

                                                        {/* Option: New Session */}
                                                        <button
                                                            onClick={() => {
                                                                sidekick.clearChat();
                                                                setShowMoreMenu(false);
                                                            }}
                                                            className="w-full text-left px-5 py-3 hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-100"
                                                        >
                                                            <Edit className="w-[18px] h-[18px] text-line-dark" />
                                                            開始新對話
                                                        </button>

                                                        {/* Option: Personalized Reply Toggle */}
                                                        <div
                                                            className="w-full text-left px-5 py-3 flex items-center justify-between border-b border-slate-100 group relative"
                                                            onMouseEnter={() => setShowSettingsTooltip(true)}
                                                            onMouseLeave={() => setShowSettingsTooltip(false)}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <Sparkles className="w-[18px] h-[18px] text-line-dark" />
                                                                個人化回覆
                                                            </div>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setIsPersonalized(!isPersonalized);
                                                                }}
                                                                className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-colors ${isPersonalized ? 'bg-[#3366FF]' : 'bg-slate-300'}`}
                                                            >
                                                                <motion.div
                                                                    className="w-5 h-5 bg-white rounded-full shadow-sm"
                                                                    animate={{ x: isPersonalized ? 16 : 0 }}
                                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                                />
                                                            </button>

                                                            {/* Settings Tooltip */}
                                                            <AnimatePresence>
                                                                {showSettingsTooltip && (
                                                                    <motion.div
                                                                        initial={{ opacity: 0, x: 5 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        exit={{ opacity: 0, x: 5 }}
                                                                        transition={{ duration: 0.15 }}
                                                                        className="absolute right-[calc(100%+8px)] top-1/2 -translate-y-1/2 w-64 bg-white border border-line-border shadow-2xl rounded-xl p-4 z-[999]"
                                                                    >
                                                                        <div className="flex items-start gap-2">
                                                                            <div className="flex-1 space-y-2 text-[12px] leading-relaxed text-line-gray">
                                                                                <p className="whitespace-normal">
                                                                                    LINE AI Sidekick 可能會使用您在 AI Sidekick 的歷史記錄來推薦個人化體驗。可透過選單中的 "個人化回覆" 選項管理。啟用此功能即表示您同意 LINE AI Sidekick 的 <a href="#" className="text-line-green hover:underline cursor-pointer">使用條款</a>。
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>

                                                        {/* Option: Terms of Use */}
                                                        <button
                                                            onClick={() => setShowMoreMenu(false)}
                                                            className="w-full text-left px-5 py-3 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                                                        >
                                                            <FileText className="w-[18px] h-[18px] text-line-dark" />
                                                            使用條款
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-md hover:bg-red-50 text-line-gray hover:text-line-red transition-colors ml-1"
                                    title="Close"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Main Chat Interface */}
                        <div className="flex-1 overflow-hidden flex flex-col relative bg-[#F4F5F7]">
                            <ChatContainer sidekick={sidekick} />

                            {/* History Drawer Overlay */}
                            <HistoryDrawer
                                isOpen={isHistoryOpen}
                                mode={historyMode}
                                onClose={() => setIsHistoryOpen(false)}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SidekickWidget;
