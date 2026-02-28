import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, PlayCircle, Hash, Bookmark } from 'lucide-react';

interface HistoryDrawerProps {
    isOpen: boolean;
    mode?: 'all' | 'saved';
    onClose: () => void;
}

const MOCK_SESSIONS = [
    { id: 's1', title: '分析昨日推播點擊成效', topic: '數據診斷', date: '2 小時前' },
    { id: 's2', title: '建立聊天標籤受眾', topic: '功能導覽', date: '昨天' },
    { id: 's3', title: '如何設定進階影片訊息', topic: '功能導覽', date: '3 天前' },
    { id: 's4', title: '帳號額度與升級方案', topic: '帳號管理', date: '上週' }
];

export const HistoryDrawer = ({ isOpen, mode = 'all', onClose }: HistoryDrawerProps) => {
    // In a real app, this would be provided by a global store or context.
    const [savedSessionIds, setSavedSessionIds] = useState<Set<string>>(new Set(['s1']));

    const toggleSave = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSavedSessionIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    // Filter by mode
    const displayedSessions = mode === 'saved'
        ? MOCK_SESSIONS.filter(s => savedSessionIds.has(s.id))
        : MOCK_SESSIONS;

    // Group by topic
    const groupedSessions = displayedSessions.reduce((acc, session) => {
        if (!acc[session.topic]) acc[session.topic] = [];
        acc[session.topic].push(session);
        return acc;
    }, {} as Record<string, typeof MOCK_SESSIONS>);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/20 z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                        className="absolute left-0 top-0 bottom-0 w-[85%] bg-[#F4F5F7] shadow-xl z-50 flex flex-col border-r border-line-border"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-line-border bg-white shrink-0">
                            <h3 className="font-bold text-line-dark flex items-center gap-2">
                                {mode === 'saved' ? (
                                    <Bookmark className="w-4 h-4 text-line-green fill-current" />
                                ) : (
                                    <MessageSquare className="w-4 h-4 text-line-green" />
                                )}
                                {mode === 'saved' ? '已收藏的對話' : '歷史紀錄 (Topics)'}
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-md hover:bg-slate-100 text-line-gray transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                            {Object.keys(groupedSessions).length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                                    <Bookmark className="w-12 h-12 text-slate-200" />
                                    <p className="text-sm">尚無收藏的對話紀錄</p>
                                </div>
                            ) : (
                                Object.entries(groupedSessions).map(([topic, sessions]) => (
                                    <div key={topic} className="flex flex-col gap-3">
                                        <h4 className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <Hash className="w-3.5 h-3.5" />
                                            {topic}
                                        </h4>

                                        <div className="flex flex-col gap-2">
                                            {sessions.map(session => {
                                                const isSaved = savedSessionIds.has(session.id);
                                                return (
                                                    <div
                                                        key={session.id}
                                                        className="bg-white p-3 rounded-xl border border-line-border shadow-sm flex flex-col gap-2 hover:border-line-green/30 transition-colors group relative"
                                                    >
                                                        <div className="flex justify-between items-start gap-2 pr-6">
                                                            <span className="text-[14px] font-semibold text-line-dark line-clamp-2 leading-tight">
                                                                {session.title}
                                                            </span>
                                                            <span className="text-[11px] text-slate-400 whitespace-nowrap pt-0.5 shrink-0">
                                                                {session.date}
                                                            </span>
                                                        </div>

                                                        {/* Save/Bookmark Button */}
                                                        <button
                                                            onClick={(e) => toggleSave(session.id, e)}
                                                            className={`absolute top-2.5 right-2 p-1.5 rounded-md hover:bg-slate-100 transition-colors ${isSaved ? 'text-line-green' : 'text-slate-300 opacity-0 group-hover:opacity-100'
                                                                }`}
                                                            title={isSaved ? "移除收藏" : "加到收藏"}
                                                        >
                                                            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                                                        </button>

                                                        <div className="flex justify-end pt-1">
                                                            <button
                                                                onClick={onClose}
                                                                className="flex items-center gap-1.5 text-[12px] font-bold text-line-green hover:text-line-greenHover transition-colors bg-line-green/10 px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100"
                                                            >
                                                                <PlayCircle className="w-3.5 h-3.5" />
                                                                Resume Session
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
