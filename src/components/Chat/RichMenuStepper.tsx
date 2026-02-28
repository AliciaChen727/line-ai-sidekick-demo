import type { SidekickMessage } from '../../types';

export const RichMenuStepper = ({ data }: { data: NonNullable<SidekickMessage['richMenuGuidance']> }) => {
    return (
        <div className="mt-4 flex flex-col gap-0 relative">
            {/* The vertical tracking line */}
            <div className="absolute left-[15px] top-[15px] bottom-[20px] w-[2px] bg-slate-200 z-0"></div>

            {data.steps.map((step, idx) => {
                return (
                    <div key={step.id} className="relative z-10 flex gap-4 pr-2 pb-4 pt-2">
                        {/* Status Icon Indicator */}
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                            {/* Assuming steps 1-3 are completed for demo, and current is 4. Let's make it simpler: just a clean outline circle, or number */}
                            <div className="w-5 h-5 rounded-full bg-line-green text-white text-[11px] font-bold flex items-center justify-center">
                                {idx + 1}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 bg-white border border-line-border p-3 rounded-xl shadow-sm">
                            <h4 className="text-sm font-semibold text-line-dark mb-1">{step.title}</h4>
                            <p className="text-[13px] text-line-gray mb-3">{step.description}</p>

                            {step.actionUrl && (
                                <button className="text-[13px] font-semibold text-line-green bg-green-50 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors">
                                    {step.actionText}
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
