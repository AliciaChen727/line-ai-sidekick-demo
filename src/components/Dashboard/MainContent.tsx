import { Send, MessageSquare, CheckCircle, ChevronRight, ChevronLeft, Share2, Award, Settings, Megaphone } from 'lucide-react';

const MainContent = () => {
    return (
        <div className="flex-1 overflow-y-auto p-8 bg-[#F5F5F7]">
            <div className="max-w-[1000px] mx-auto grid grid-cols-[1fr_300px] gap-6">

                {/* Left Column (Main Features) */}
                <div className="flex flex-col gap-6">

                    {/* Profile Card */}
                    <div className="bg-white rounded-lg border border-line-border p-6 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4">
                            <img src="https://ui-avatars.com/api/?name=A&background=random&color=fff" alt="Profile" className="w-16 h-16 rounded-full" />
                            <div>
                                <h2 className="text-xl font-bold text-line-dark mb-1">Alicia的機器人</h2>
                                <div className="flex items-center gap-2 text-sm text-line-gray">
                                    <div className="flex items-center gap-1">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                        1
                                    </div>
                                    <span>·</span>
                                    <span>@627oziuc</span>
                                </div>
                            </div>
                        </div>
                        <button className="px-4 py-1.5 border border-line-border rounded text-sm font-semibold text-line-dark hover:bg-slate-50 transition-colors">
                            編輯
                        </button>
                    </div>

                    {/* Action Cards Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Create Message Card */}
                        <div className="bg-white rounded-lg border border-line-border p-6 shadow-sm relative overflow-hidden group">
                            <div className="flex flex-col h-full z-10 relative">
                                <h3 className="font-bold text-lg text-line-dark mb-2">訊息</h3>
                                <p className="text-sm text-line-gray mb-6">來建立傳送給好友的群發訊息吧。</p>
                                <div className="mt-auto">
                                    <button className="bg-line-green hover:bg-line-greenHover text-white px-4 py-1.5 rounded font-semibold text-sm transition-colors">
                                        建立新訊息
                                    </button>
                                </div>
                            </div>
                            {/* Decorative Icon Background */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-line-dark/10 group-hover:scale-110 transition-transform">
                                <Send className="w-16 h-16" strokeWidth={1} />
                            </div>
                        </div>

                        {/* Create Content Card */}
                        <div className="bg-white rounded-lg border border-line-border p-6 shadow-sm relative overflow-hidden group">
                            <div className="flex flex-col h-full z-10 relative">
                                <h3 className="font-bold text-lg text-line-dark mb-2">內容</h3>
                                <p className="text-sm text-line-gray mb-6">來建立圖文訊息及優惠券吧。</p>
                                <div className="mt-auto">
                                    <button className="bg-white border text-line-green border-line-green hover:bg-green-50 px-4 py-1.5 rounded font-semibold text-sm transition-colors">
                                        建立內容
                                    </button>
                                </div>
                            </div>
                            {/* Decorative Icon Background */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-line-green group-hover:scale-110 transition-transform">
                                <MessageSquare className="w-14 h-14" strokeWidth={1.5} />
                                {/* Fake LINE badge inside message icon */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-line-green text-white text-[8px] font-bold px-1 rounded-sm">LINE</div>
                            </div>
                        </div>
                    </div>

                    {/* Checklist Card */}
                    <div className="bg-white rounded-lg border border-line-border p-6 shadow-sm relative">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-lg text-line-dark relative before:content-[''] before:absolute before:-left-6 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-5 before:bg-line-dark">
                                基本設定列表
                            </h3>
                            <button className="text-line-gray hover:text-line-dark transition-colors">
                                <Settings className="w-5 h-5 opacity-50" />
                            </button>
                        </div>

                        <div className="flex items-center gap-6 mb-10">
                            {/* Fake Progress Circle */}
                            <div className="relative w-24 h-24 rounded-full border-[8px] border-slate-100 flex items-center justify-center">
                                <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
                                    <circle cx="48" cy="48" r="44" stroke="#06C755" strokeWidth="8" fill="none" strokeDasharray="276" strokeDashoffset="276" className="transition-all duration-1000 ease-out" />
                                </svg>
                                <div className="text-center">
                                    <span className="text-xl font-bold text-line-green">0/5</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-xl text-line-green mb-2">增加好友人數</h4>
                                <p className="text-sm text-line-gray">想要有效活用官方帳號，首先必須吸引用戶將您的帳號加入好友。</p>
                            </div>
                        </div>

                        {/* Steps Grid */}
                        <div className="grid grid-cols-5 gap-4 relative">
                            <div className="absolute top-6 left-10 right-10 h-0.5 bg-slate-100 -z-10"></div>

                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center z-10 text-line-gray hover:border-line-green hover:text-line-green transition-colors cursor-pointer group">
                                    <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-xs text-line-gray font-medium">自訂「加入好友的歡迎訊息」</span>
                            </div>

                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center z-10 text-line-gray hover:border-line-green hover:text-line-green transition-colors cursor-pointer group">
                                    <Megaphone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-xs text-line-gray font-medium">於社群平台上宣傳</span>
                            </div>

                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center z-10 text-line-gray hover:border-line-green hover:text-line-green transition-colors cursor-pointer group">
                                    <Award className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-xs text-line-gray font-medium">張貼海報以增加好友人數</span>
                            </div>

                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center z-10 text-line-gray hover:border-line-green hover:text-line-green transition-colors cursor-pointer group">
                                    <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-xs text-line-gray font-medium">申請成為認證官方帳號</span>
                            </div>

                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center z-10 text-line-gray hover:border-line-green hover:text-line-green transition-colors cursor-pointer group">
                                    <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-xs text-line-gray font-medium">設定狀態消息</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-1.5 mt-8">
                            <div className="w-2 h-2 rounded-full border border-line-dark bg-white"></div>
                            <div className="w-2 h-2 rounded-full bg-line-gray"></div>
                            <div className="w-2 h-2 rounded-full bg-line-gray"></div>
                            <div className="w-2 h-2 rounded-full bg-line-gray"></div>
                            <div className="w-2 h-2 rounded-full bg-line-gray"></div>
                        </div>
                    </div>

                    {/* Friends Link */}
                    <div className="bg-white rounded-lg border border-line-border px-6 py-4 shadow-sm flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
                        <span className="font-bold text-line-dark">好友</span>
                        <div className="flex items-center gap-1 text-sm text-line-gray">
                            前往分析畫面 <ChevronRight className="w-4 h-4 text-slate-300" />
                        </div>
                    </div>

                </div>

                {/* Right Column (News & Banners) */}
                <div className="flex flex-col gap-6">

                    {/* Latest News */}
                    <div className="bg-white rounded-lg border border-line-border p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-line-dark">最新資訊</h3>
                            <button className="text-xs text-line-gray hover:text-line-dark flex items-center transition-colors">
                                顯示更多 <ChevronRight className="w-3 h-3 text-slate-300 ml-0.5" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="group cursor-pointer">
                                <div className="flex items-start gap-1">
                                    <span className="text-line-green mt-1 text-xl leading-none flex-shrink-0">•</span>
                                    <p className="text-[13px] text-line-dark leading-snug group-hover:text-line-green transition-colors">[規格變更] 關於「集點卡」分析項目變更說明</p>
                                </div>
                                <p className="text-[11px] text-line-gray ml-3 mt-1">2026/02/24 17:30</p>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="flex items-start gap-1">
                                    <span className="text-line-green mt-1 text-xl leading-none flex-shrink-0">•</span>
                                    <p className="text-[13px] text-line-dark leading-snug group-hover:text-line-green transition-colors">[規格變更] 關於「圖文選單」與「圖文訊息」的圖像設定變更</p>
                                </div>
                                <p className="text-[11px] text-line-gray ml-3 mt-1">2026/01/21 16:10</p>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="flex items-start gap-1">
                                    <span className="text-line-green mt-1 text-xl leading-none flex-shrink-0">•</span>
                                    <p className="text-[13px] text-line-dark leading-snug group-hover:text-line-green transition-colors">[規格變更] 商業簡介中「集點卡」更新設計</p>
                                </div>
                                <p className="text-[11px] text-line-gray ml-3 mt-1">2026/01/21 15:31</p>
                            </div>
                        </div>
                    </div>

                    {/* Banner Card */}
                    <div className="bg-blue-600 rounded-lg border border-line-border overflow-hidden h-64 relative cursor-pointer group shadow-sm flex flex-col justify-end text-white pb-6 px-6">
                        {/* Fake Banner Content */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-10 left-6 flex items-center justify-center">
                                <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=300&h=200" alt="Banner" className="opacity-80 mix-blend-overlay object-cover w-full h-full" />
                            </div>
                        </div>
                        <div className="relative z-10 w-full text-center">
                            <h3 className="font-bold text-xl mb-1">行銷只有兩種人:</h3>
                            <p className="text-sm text-blue-100">已加入商家俱樂部，和準備加入</p>
                            <div className="flex justify-center gap-1 mt-3">
                                <div className="w-1.5 h-1.5 rounded-full border border-white bg-transparent"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                            </div>
                        </div>

                        <button className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MainContent;
