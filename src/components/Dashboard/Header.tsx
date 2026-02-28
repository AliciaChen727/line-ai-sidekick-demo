import { Bell, HelpCircle, Settings } from 'lucide-react';

const Header = () => {
    return (
        <div className="flex flex-col w-full bg-white border-b border-line-border z-10 shrink-0">
            {/* Top Bar */}
            <div className="flex items-center justify-between h-14 px-6 border-b border-line-border">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-[32px] font-black text-[#111111] tracking-tighter leading-none mt-1">LINE</span>
                        <div className="flex flex-col text-[14px] font-bold text-[#111111] leading-[1.1] mt-1 items-start font-sans">
                            <span>Official Account</span>
                            <span>Manager</span>
                        </div>
                    </div>

                    <div className="h-6 w-[1px] bg-line-border"></div>

                    <div className="flex items-center gap-2 hover:bg-slate-50 cursor-pointer p-1.5 rounded-md transition-colors">
                        <img src="https://ui-avatars.com/api/?name=A&background=random&color=fff" alt="Account" className="w-8 h-8 rounded-full" />
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-line-dark text-sm">Alicia的機器人</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-line-gray"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                        <span className="text-[10px] text-line-gray ml-2">@627oziuc</span>
                        <span className="text-[10px] bg-slate-100 text-line-gray px-1.5 py-0.5 rounded-full ml-1">輕用量</span>
                        <div className="flex items-center gap-1 ml-4 text-[11px] text-line-gray">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            1
                            <span className="ml-2">聊天：關閉</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-line-gray">
                    <button className="hover:text-line-dark transition-colors"><Bell className="w-5 h-5" /></button>
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-md transition-colors">
                        <img src="https://ui-avatars.com/api/?name=Alicia+Chen&background=0D8ABC&color=fff" alt="User" className="w-6 h-6 rounded-full" />
                        <span className="text-sm">Alicia Chen</span>
                    </div>
                    <button className="flex items-center gap-1 hover:text-line-dark transition-colors text-sm">
                        <HelpCircle className="w-4 h-4" /> Help
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-between px-6 h-12">
                <div className="flex items-center h-full gap-8 text-[13px] font-semibold text-line-gray">
                    <button className="h-full border-b-2 border-line-green text-line-dark">主頁</button>
                    <button className="h-full border-b-2 border-transparent hover:text-line-dark transition-colors">分析</button>
                    <button className="h-full border-b-2 border-transparent hover:text-line-dark transition-colors">聊天</button>
                    <button className="h-full border-b-2 border-transparent hover:text-line-dark transition-colors">商業簡介</button>
                    <button className="h-full border-b-2 border-transparent hover:text-line-dark transition-colors">LINE VOOM</button>
                    <button className="h-full border-b-2 border-transparent hover:text-line-dark transition-colors">擴充功能</button>
                    <button className="h-full border-b-2 border-transparent hover:text-line-dark transition-colors">開店幫手</button>
                    <button className="h-full border-b-2 border-transparent hover:text-line-dark transition-colors">OA Plus</button>
                </div>
                <button className="flex items-center gap-1 text-[13px] text-line-gray hover:text-line-dark transition-colors">
                    <Settings className="w-4 h-4" /> 設定
                </button>
            </div>
        </div>
    );
};

export default Header;
