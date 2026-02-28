import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Loader2, CheckCircle2 } from 'lucide-react';

interface AlertCardProps {
    data: {
        title: string;
        description: string;
        progressUsed: number;
        progressTotal: number;
        purchaseAmount: number;
        purchasePrice: number;
    };
}

export const AlertCard = ({ data }: AlertCardProps) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handlePurchase = () => {
        setStatus('loading');
        // Simulate API call for purchase
        setTimeout(() => {
            setStatus('success');
        }, 3000);
    };

    const percentage = Math.min((data.progressUsed / data.progressTotal) * 100, 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex flex-col gap-3 p-4 rounded-2xl w-[90%] border shadow-sm transition-colors duration-500 overflow-hidden relative ${status === 'success' ? 'bg-green-50/50 border-green-200' : 'bg-red-50/30 border-red-100'
                }`}
        >
            {/* Warning Label Badge */}
            {status !== 'success' && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-bl-lg shadow-sm flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                    Live Stream Alert
                </div>
            )}

            {status === 'success' ? (
                // Success State
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-4 text-center gap-2"
                >
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-1">
                        <CheckCircle2 className="w-6 h-6 text-green-600" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-bold text-green-800 text-[15px]">✅ 加購成功！</h3>
                    <p className="text-[13px] text-green-700 font-medium">
                        已為您增加 {data.purchaseAmount.toLocaleString()} 則額度。
                    </p>
                </motion.div>
            ) : (
                // Default / Loading State
                <>
                    <div className="flex items-start gap-2.5 pt-2">
                        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div className="flex flex-col gap-1.5">
                            <h3 className="font-bold text-line-dark text-[14px] leading-tight">
                                {data.title}
                            </h3>
                            <p className="text-[12px] text-line-gray leading-relaxed pr-2">
                                {data.description}
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex flex-col gap-1.5 mt-1">
                        <div className="flex justify-between items-end">
                            <span className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Usage</span>
                            <span className="text-[12px] font-mono font-bold text-red-600">{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                            />
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handlePurchase}
                        disabled={status === 'loading'}
                        className="mt-3 w-full bg-line-dark hover:bg-black text-white py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed shadow-md shadow-slate-200/50"
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin opacity-80" />
                                正在授權扣款...
                            </>
                        ) : (
                            `一鍵加購 ${data.purchaseAmount.toLocaleString()} 則訊息 ($${data.purchasePrice})`
                        )}
                    </button>
                </>
            )}
        </motion.div>
    );
};
