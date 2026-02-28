import SidekickWidget from './components/SidekickWidget';
import DashboardLayout from './components/Dashboard/DashboardLayout';

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* LINE OA Main Content Area */}
      <DashboardLayout />

      {/* Sidekick Widget Overlay */}
      <SidekickWidget />
    </div>
  );
}

export default App;
