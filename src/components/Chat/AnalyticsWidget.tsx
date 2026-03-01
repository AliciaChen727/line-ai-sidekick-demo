import { ArrowUpRight, ArrowDownRight, Download, Send, BarChart2 } from 'lucide-react';
import type { AnalyticsReport } from '../../types';

interface AnalyticsWidgetProps {
    report: AnalyticsReport;
}

const AnalyticsWidget = ({ report }: AnalyticsWidgetProps) => {
    const { weeklyComparison, channels } = report;

    // Calculate open rate difference
    const currentOpenRate = weeklyComparison.current_week.open_rate;
    const prevOpenRate = weeklyComparison.previous_week.open_rate;
    const openRateDiff = ((currentOpenRate - prevOpenRate) * 100);
    const isOpenRateUp = openRateDiff > 0;

    // Calculate friends difference
    const currentFriends = weeklyComparison.current_week.total_friends;
    const prevFriends = weeklyComparison.previous_week.total_friends;
    const friendsDiff = currentFriends - prevFriends;
    const isFriendsUp = friendsDiff > 0;

    // Build Conic Gradient for Pie Chart
    // Ensure channels are sorted or just laid out sequentially. We'll sequence them.
    let cumulativePercentage = 0;
    const cssColors = ['#06C755', '#3366FF', '#FF9900', '#F24F53', '#888888'];
    const conicStops = channels.map((ch, idx) => {
        const start = cumulativePercentage;
        cumulativePercentage += ch.percentage * 100;
        const color = cssColors[idx % cssColors.length];
        return `${color} ${start}% ${cumulativePercentage}%`;
    }).join(', ');

    return (
        <div className="w-full max-w-[320px] bg-white rounded-2xl shadow-widget border border-line-border overflow-hidden mt-2">

            {/* Header */}
            <div className="bg-slate-50 px-4 py-3 border-b border-line-border flex items-center gap-2">
                <div className="p-1.5 bg-line-green/10 rounded-lg">
                    <BarChart2 className="w-4 h-4 text-line-green" />
                </div>
                <div>
                    <h3 className="text-[13px] font-bold text-line-dark leading-none pb-0.5">週報摘要</h3>
                    <p className="text-[11px] text-line-gray">過去 7 天 (與上週相比)</p>
                </div>
            </div>

            {/* Metrics */}
            <div className="p-4 grid grid-cols-2 gap-3 border-b border-line-border relative">
                <div className="absolute top-4 bottom-4 left-1/2 w-[1px] bg-line-border -translate-x-1/2" />

                {/* Metric 1 */}
                <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-[11px] text-line-gray font-semibold mb-1">整體開封率</span>
                    <span className="text-[20px] font-black text-line-dark mb-1">
                        {(currentOpenRate * 100).toFixed(1)}%
                    </span>
                    <div className={`flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded-sm ${isOpenRateUp ? 'text-line-green bg-line-green/10' : 'text-red-500 bg-red-500/10'}`}>
                        {isOpenRateUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(openRateDiff).toFixed(1)}%
                    </div>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-[11px] text-line-gray font-semibold mb-1">總好友人數</span>
                    <span className="text-[20px] font-black text-line-dark mb-1">
                        {currentFriends.toLocaleString()}
                    </span>
                    <div className={`flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded-sm ${isFriendsUp ? 'text-line-green bg-line-green/10' : 'text-red-500 bg-red-500/10'}`}>
                        {isFriendsUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(friendsDiff).toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Chart: Channel Distribution */}
            <div className="p-4 border-b border-line-border">
                <h4 className="text-[12px] font-bold text-line-dark mb-3">好友加入管道分佈</h4>
                <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 shrink-0">
                        <div
                            className="w-full h-full rounded-full shrink-0"
                            style={{ background: `conic-gradient(${conicStops})` }}
                        />
                        <div className="absolute inset-2 bg-white rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                        {channels.slice(0, 3).map((ch, idx) => (
                            <div key={ch.source} className="flex flex-col">
                                <div className="flex justify-between items-center text-[11px]">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cssColors[idx % cssColors.length] }} />
                                        <span className="text-line-gray truncate max-w-[60px]">{ch.source}</span>
                                    </div>
                                    <span className="font-bold text-line-dark">{(ch.percentage * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col bg-slate-50">
                <button className="flex items-center justify-between w-full px-4 py-3 text-[12px] font-bold text-line-dark hover:bg-slate-100 transition-colors border-b border-line-border group">
                    <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-line-gray group-hover:text-line-dark transition-colors" />
                        下載完整 PDF 報表
                    </div>
                    <span className="text-line-gray/50 group-hover:text-line-gray transition-colors">→</span>
                </button>
                <button className="flex items-center justify-between w-full px-4 py-3 text-[12px] font-bold text-line-green hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-2">
                        <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        針對高潛力族群發送訊息
                    </div>
                    <span className="text-line-green/50 group-hover:text-line-green transition-colors">→</span>
                </button>
            </div>
        </div>
    );
};

export default AnalyticsWidget;
