import { Download, Maximize2, Monitor, Smartphone } from 'lucide-react';
import type { SidekickMessage } from '../../types';

export const SizeConsultantCard = ({ data }: { data: NonNullable<SidekickMessage['sizeConsultant']> }) => {
    return (
        <div className="mt-4 border border-line-border bg-white rounded-xl overflow-hidden shadow-sm">
            {/* Header / Graphic Representation Mockup */}
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-center relative min-h-[140px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E8F6EE] to-[#F4F5F7] opacity-50"></div>

                {/* Visualizer Mockup */}
                <div className="relative z-10 flex gap-6 items-end">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-24 h-16 border-2 border-line-green rounded-lg bg-green-50/50 shadow-sm flex items-center justify-center">
                            <Maximize2 className="w-5 h-5 text-line-green opacity-50" />
                        </div>
                        <span className="text-xs font-semibold text-slate-500">大型 (Large)</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-24 h-8 border-2 border-line-green rounded-lg bg-green-50/50 shadow-sm flex items-center justify-center">
                            <Maximize2 className="w-4 h-4 text-line-green opacity-50" />
                        </div>
                        <span className="text-xs font-semibold text-slate-500">小型 (Small)</span>
                    </div>
                </div>
            </div>

            {/* Sizes Text Info */}
            <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-line-gray" />
                        <span className="text-[13px] font-semibold text-line-dark">大型尺寸</span>
                    </div>
                    <span className="text-[13px] font-mono text-slate-500">{data.largeSize}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-line-gray" />
                        <span className="text-[13px] font-semibold text-line-dark">小型尺寸</span>
                    </div>
                    <span className="text-[13px] font-mono text-slate-500">{data.smallSize}</span>
                </div>
            </div>

            {/* Action / Download Template */}
            <div className="p-3 bg-slate-50 border-t border-slate-100">
                <a
                    href={data.downloadUrl}
                    className="w-full flex justify-center items-center gap-2 py-2 px-4 rounded-lg bg-white border border-line-border text-[13px] font-semibold text-line-dark hover:bg-slate-100 hover:text-line-green transition-colors shadow-sm"
                >
                    <Download className="w-4 h-4" />
                    下載官方設計模板
                </a>
            </div>
        </div>
    );
};
