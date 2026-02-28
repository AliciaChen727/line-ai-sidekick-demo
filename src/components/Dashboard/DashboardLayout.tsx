import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col h-full w-full overflow-hidden bg-line-lightBg font-sans antialiased text-line-dark">
            <Header />
            <div className="flex flex-1 overflow-hidden relative z-0">
                <Sidebar />
                <MainContent />
            </div>
        </div>
    );
};

export default DashboardLayout;
