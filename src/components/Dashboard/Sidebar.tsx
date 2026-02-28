import { Radio, GitMerge, CornerUpLeft, MessageSquarePlus, Gift, ChevronLeft, ChevronDown, MessageCircle, Database, UserPlus } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="w-[200px] h-full bg-white border-r border-line-border flex flex-col justify-between shrink-0 overflow-y-auto">

            {/* Top Menu Items */}
            <div className="py-2 flex flex-col pt-4">

                {/* Expanded Category: Broadcasts */}
                <div className="mb-1">
                    <button className="w-full flex items-center justify-between px-4 py-2 text-line-dark hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <Radio className="w-[18px] h-[18px] text-line-gray" />
                            <span className="text-[13px] font-semibold">群發訊息</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-line-gray" />
                    </button>
                    <div className="flex flex-col pl-11 pr-4 py-1 gap-0.5">
                        <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">訊息一覽</button>
                        <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">建立新訊息</button>
                        <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">廣告活動</button>
                    </div>
                </div>

                {/* Action Category: Step Messages */}
                <button className="w-full flex items-center justify-between px-4 py-2 text-line-dark hover:bg-slate-50 transition-colors mb-1">
                    <div className="flex items-center gap-3">
                        <GitMerge className="w-[18px] h-[18px] text-line-gray" />
                        <span className="text-[13px] font-semibold">漸進式訊息</span>
                    </div>
                </button>

                {/* Expanded Category: Auto-response */}
                <div className="mb-1">
                    <button className="w-full flex items-center justify-between px-4 py-2 text-line-dark hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <CornerUpLeft className="w-[18px] h-[18px] text-line-gray" />
                            <span className="text-[13px] font-semibold">自動回應</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-line-gray" />
                    </button>
                    <div className="flex flex-col pl-11 pr-4 py-1 gap-0.5">
                        <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">自動回應訊息</button>
                        <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors flex items-center gap-2">
                            AI 聊天機器人 <span className="text-[10px] bg-line-border/50 text-line-gray px-1 rounded uppercase tracking-wider">β</span>
                        </button>
                    </div>
                </div>

                {/* Collapsed Category: Message Items */}
                <button className="w-full flex items-center justify-between px-4 py-2 text-line-dark hover:bg-slate-50 transition-colors mt-2 mb-1">
                    <div className="flex items-center gap-3">
                        <MessageSquarePlus className="w-[18px] h-[18px] text-line-gray" />
                        <span className="text-[13px] font-semibold">訊息項目</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-line-gray -rotate-90" />
                </button>
                <div className="flex flex-col pl-11 pr-4 py-1 gap-0.5">
                    <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">圖文訊息</button>
                    <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">進階影片訊息</button>
                    <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">多頁訊息</button>
                </div>

                {/* Collapsed Category: Promotion */}
                <button className="w-full flex items-center justify-between px-4 py-2 text-line-dark hover:bg-slate-50 transition-colors mt-2 mb-1">
                    <div className="flex items-center gap-3">
                        <Gift className="w-[18px] h-[18px] text-line-gray" />
                        <span className="text-[13px] font-semibold">推廣相關</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-line-gray -rotate-90" />
                </button>
                <div className="flex flex-col pl-11 pr-4 py-1 gap-0.5">
                    <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">優惠券</button>
                    <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">集點卡</button>
                    <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">問卷調查</button>
                </div>

                {/* Collapsed Category: Chat Room Related */}
                <button className="w-full flex items-center justify-between px-4 py-2 text-line-dark hover:bg-slate-50 transition-colors mt-2 mb-1">
                    <div className="flex items-center gap-3">
                        <MessageCircle className="w-[18px] h-[18px] text-line-gray" />
                        <span className="text-[13px] font-semibold">聊天室相關</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-line-gray" />
                </button>
                <div className="flex flex-col pl-11 pr-4 py-1 gap-0.5">
                    <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">加入好友的歡迎訊息</button>
                    <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">圖文選單</button>
                </div>

                {/* Collapsed Category: Data Management */}
                <button className="w-full flex items-center justify-between px-4 py-2 text-line-dark hover:bg-slate-50 transition-colors mt-2 mb-1">
                    <div className="flex items-center gap-3">
                        <Database className="w-[18px] h-[18px] text-line-gray" />
                        <span className="text-[13px] font-semibold">資料管理</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-line-gray" />
                </button>
                <div className="flex flex-col pl-11 pr-4 py-1 gap-0.5">
                    <button className="text-left py-1.5 text-[13px] text-line-green font-semibold transition-colors">受眾</button>
                    <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">追蹤（LINE Tag）</button>
                </div>

                {/* Collapsed Category: Add Friends */}
                <button className="w-full flex items-center justify-between px-4 py-2 text-line-dark hover:bg-slate-50 transition-colors mt-2 mb-1">
                    <div className="flex items-center gap-3">
                        <UserPlus className="w-[18px] h-[18px] text-line-gray" />
                        <span className="text-[13px] font-semibold">增加好友人數</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-line-gray" />
                </button>
                <div className="flex flex-col pl-11 pr-4 py-1 gap-0.5 mb-4">
                    <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">增加好友工具</button>
                    <button className="text-left py-1.5 text-[13px] text-line-dark hover:text-line-green transition-colors">加好友廣告</button>
                </div>

            </div>

            {/* Bottom Collapse Button */}
            <div className="border-t border-line-border mt-auto shrink-0 bg-slate-50/50">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-line-gray hover:bg-slate-100 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-[13px] font-semibold">收合選單</span>
                </button>
            </div>

        </div>
    );
};

export default Sidebar;
