import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import type { SidekickMessage } from '../../types';

export const ProactiveAlertCard = ({ data }: { data: NonNullable<SidekickMessage['proactiveAlert']> }) => {
    return (
        <div className="mt-4 border border-orange-100 bg-orange-50/50 rounded-xl overflow-hidden shadow-sm relative group cursor-pointer hover:bg-orange-50 transition-colors">
            {/* Accent styling indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-[#FF7F50]"></div>

            <div className="p-4 pl-5 relative z-10 w-[95%]">
                <div className="flex items-start gap-2.5 mb-2">
                    <div className="bg-orange-100 p-1 rounded-md text-orange-500 mt-0.5">
                        <Zap className="w-4 h-4" />
                    </div>
                    <div>
                        <h4 className="font-bold text-[14px] text-line-dark tracking-tight leading-tight mb-1">
                            {data.title}
                        </h4>
                        <p className="text-[13px] text-slate-600 leading-relaxed">
                            {data.description}
                        </p>
                    </div>
                </div>

                <div className="mt-3 ml-8 bg-white/60 border border-orange-200/50 rounded-lg p-2.5">
                    <div className="flex items-start gap-2 text-[12px] font-semibold text-orange-700">
                        <Sparkles className="w-3.5 h-3.5 mt-0.5 opacity-70" />
                        <span className="flex-1 leading-snug">{data.suggestionText}</span>
                    </div>
                </div>

                <div className="mt-3 ml-8 flex">
                    <a
                        href={data.actionUrl}
                        className="flex items-center gap-1 text-[12px] font-bold text-[#FF7F50] hover:text-orange-600 transition-colors"
                    >
                        立即前往設定 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
};
