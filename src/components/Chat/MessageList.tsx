import { useState } from 'react';
import { Bot, User, ThumbsUp, ThumbsDown, CheckCircle, ArrowRight, TrendingDown, Activity, Settings, Send, Link } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SidekickMessage } from '../../types';
import { AlertCard } from './AlertCard';
import { RichMenuStepper } from './RichMenuStepper';
import { SizeConsultantCard } from './SizeConsultantCard';
import { ProactiveAlertCard } from './ProactiveAlertCard';

interface MessageListProps {
    messages: SidekickMessage[];
    isTyping: boolean;
    onFeedback: (id: string, isHelpful: boolean) => void;
}

const MessageList = ({ messages, isTyping, onFeedback }: MessageListProps) => {
    return (
        <>
            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} onFeedback={onFeedback} />
            ))}
            {isTyping && (
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-line-green flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1 border border-line-border">
                        <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                            className="w-1.5 h-1.5 bg-line-gray rounded-full"
                        />
                        <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                            className="w-1.5 h-1.5 bg-line-gray rounded-full"
                        />
                        <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                            className="w-1.5 h-1.5 bg-line-gray rounded-full"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

const MessageBubble = ({ message, onFeedback }: { message: SidekickMessage, onFeedback: (id: string, isHelpful: boolean) => void }) => {
    const isUser = message.role === 'user';
    const [feedback, setFeedback] = useState<boolean | null>(message.isHelpful ?? null);

    const handleFeedback = (isHelpful: boolean) => {
        setFeedback(isHelpful);
        onFeedback(message.id, isHelpful);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col gap-2 w-full ${isUser ? 'items-end' : 'items-start'}`}
        >
            {/* Thinking Process Rendering */}
            {message.isThinking && message.thinkingProcess && message.thinkingProcess.length > 0 && (
                <div className="flex items-start gap-3 w-full ml-11 mb-2">
                    <div className="flex flex-col gap-3 bg-[#F8F9FA] border border-line-border p-4 rounded-2xl w-[85%]">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-[18px] h-[18px] text-line-green" strokeWidth={2} />
                            <span className="text-[12px] font-bold text-[#8A8A8A] uppercase tracking-wider">SIDEKICK REASONING LOGS</span>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key={message.thinkingProcess.length}
                            className="text-[13px] font-mono text-[#5C6B80] bg-white px-3.5 py-2.5 rounded-lg border border-line-border"
                        >
                            {message.thinkingProcess[message.thinkingProcess.length - 1]}
                        </motion.div>
                    </div>
                </div>
            )}

            <div className={`flex items-start gap-3 w-full ${isUser ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser ? 'bg-blue-500' : 'bg-line-green'}`}>
                    {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>

                <div className={`flex flex-col gap-1 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                    {/* The Message Content */}
                    <div
                        className={`px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm ${isUser ? 'bg-line-green text-white rounded-tr-sm' : 'bg-white text-line-dark rounded-tl-sm border border-line-border'
                            }`}
                    >
                        {message.text}

                        {/* Task Cards Rendering */}
                        {message.taskCards && message.taskCards.length > 0 && (
                            <div className="mt-4 flex flex-col gap-2">
                                {message.taskCards.map(task => (
                                    <div key={task.id} className="border border-line-border rounded-xl p-3 bg-slate-50">
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className={`w-5 h-5 mt-0.5 shrink-0 ${task.completed ? 'text-line-green' : 'text-line-gray/40'}`} />
                                            <div>
                                                <h4 className={`font-semibold text-sm ${task.completed ? 'text-line-dark/60 line-through' : 'text-line-dark'}`}>{task.title}</h4>
                                                <p className={`text-xs mt-0.5 ${task.completed ? 'text-line-gray/60' : 'text-line-gray'}`}>{task.description}</p>

                                                {task.actionText && !task.completed && (
                                                    <button className="mt-2 text-xs font-semibold text-line-green bg-green-50 px-3 py-1.5 rounded-md hover:bg-green-100 transition-colors flex items-center gap-1">
                                                        {task.actionText} <ArrowRight className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Diagnostics Rendering */}
                        {message.diagnostics && (
                            <div className="mt-4 border border-red-100 bg-red-50/50 rounded-xl p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="w-5 h-5 text-red-500" />
                                    <span className="font-semibold text-sm text-line-dark">{message.diagnostics.metric}</span>
                                </div>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-2xl font-bold text-line-dark">{message.diagnostics.currentValue}</span>
                                    <span className="text-sm font-semibold text-red-500 bg-red-100 px-1.5 py-0.5 rounded">{message.diagnostics.percentageChange}</span>
                                </div>
                                <div className="text-xs text-line-gray space-y-1">
                                    <p className="font-semibold text-slate-600 mb-1">Possible Reasons:</p>
                                    {message.diagnostics.possibleReasons.map((reason, idx) => (
                                        <div key={idx} className="flex gap-1.5">
                                            <span className="text-red-400">•</span>
                                            <span>{reason}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Chart Data Rendering */}
                        {message.chartData && (
                            <div className="mt-4 border border-line-border bg-white rounded-xl p-3 overflow-hidden">
                                <h4 className="font-semibold text-sm text-line-dark mb-3">{message.chartData.title}</h4>
                                <div className="flex flex-col gap-2">
                                    {message.chartData.data.labels.map((label: string, idx: number) => {
                                        const value = message.chartData!.data.values[idx];
                                        const maxObj = Math.max(...message.chartData!.data.values);
                                        const percent = (value / maxObj) * 100;
                                        return (
                                            <div key={idx} className="flex items-center gap-3 text-xs">
                                                <div className="w-16 text-right text-line-gray">{label}</div>
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-line-green rounded-full"
                                                        style={{ width: `${percent}%` }}
                                                    />
                                                </div>
                                                <div className="w-12 font-medium text-line-dark">{Math.round(value)}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Alert Card Box Rendering */}
                        {message.alertCard && (
                            <div className="mt-4 flex justify-center w-[110%] -ml-[5%]">
                                <AlertCard data={message.alertCard} />
                            </div>
                        )}

                        {/* Phase 9: Rich Menu Guidance Stepper */}
                        {message.richMenuGuidance && (
                            <RichMenuStepper data={message.richMenuGuidance} />
                        )}

                        {/* Phase 9: Size Consultant Card */}
                        {message.sizeConsultant && (
                            <SizeConsultantCard data={message.sizeConsultant} />
                        )}

                        {/* Phase 9: Proactive Promo Alert */}
                        {message.proactiveAlert && (
                            <ProactiveAlertCard data={message.proactiveAlert} />
                        )}

                        {/* Action Link Rendering (Legacy) */}
                        {message.action && (
                            <button className="mt-3 w-full bg-slate-100 hover:bg-slate-200 text-line-dark font-semibold text-sm py-2.5 px-4 rounded-xl flex items-center justify-between transition-colors border border-line-border">
                                {message.action.label}
                                <ArrowRight className="w-4 h-4 text-line-gray" />
                            </button>
                        )}

                        {/* Actionable Suggestions Rendering (Phase 3) */}
                        {message.suggestions && message.suggestions.length > 0 && (
                            <div className="mt-4 flex flex-col gap-2">
                                {message.suggestions.map(suggestion => (
                                    <button key={suggestion.id} className="w-full bg-slate-50 hover:bg-green-50 text-left border border-line-border hover:border-line-green/50 text-line-dark font-semibold text-sm py-2.5 px-3 rounded-xl flex items-center gap-2 transition-colors group">
                                        {suggestion.icon === 'activity' && <Activity className="w-4 h-4 text-line-green flex-shrink-0" />}
                                        {suggestion.icon === 'settings' && <Settings className="w-4 h-4 text-line-green flex-shrink-0" />}
                                        {suggestion.icon === 'send' && <Send className="w-4 h-4 text-line-green flex-shrink-0" />}
                                        {!suggestion.icon && <Link className="w-4 h-4 text-line-green flex-shrink-0" />}
                                        <span className="flex-1">{suggestion.title}</span>
                                        <ArrowRight className="w-4 h-4 text-line-gray group-hover:text-line-green transition-colors" />
                                    </button>
                                ))}
                            </div>
                        )}

                    </div>

                    {/* Timestamps & Feedback */}
                    <div className={`flex items-center gap-2 text-[11px] text-line-gray mt-1 ${isUser ? 'flex-row-reverse' : ''}`}>
                        <span>
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.submodel && !isUser && (
                            <>
                                <span>•</span>
                                <span className="bg-slate-200/60 px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-500">
                                    {message.submodel}
                                </span>
                            </>
                        )}

                        {/* Feedback UI */}
                        {message.showFeedback && !isUser && (
                            <div className="flex items-center gap-1 ml-2 bg-white rounded-full border border-line-border px-1">
                                <button
                                    onClick={() => handleFeedback(true)}
                                    className={`p-1.5 rounded-full hover:bg-green-50 transition text-line-gray ${feedback === true ? 'text-line-green bg-green-50' : ''}`}
                                    title="Helpful"
                                >
                                    <ThumbsUp className="w-3 h-3" />
                                </button>
                                <div className="w-[1px] h-3 bg-line-border"></div>
                                <button
                                    onClick={() => handleFeedback(false)}
                                    className={`p-1.5 rounded-full hover:bg-red-50 transition text-line-gray ${feedback === false ? 'text-red-500 bg-red-50' : ''}`}
                                    title="Not Helpful"
                                >
                                    <ThumbsDown className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MessageList;
