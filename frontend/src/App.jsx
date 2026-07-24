import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Scraper from './pages/Scraper';
import Progress from './pages/Progress';
import KnowledgeBase from './pages/KnowledgeBase';
import Chat from './pages/Chat';
import { FaRobot, FaDatabase, FaCogs, FaServer, FaComments } from 'react-icons/fa';

function Navigation() {
  const location = useLocation();
  const path = location.pathname;

  const NavItem = ({ to, icon, label }) => (
    <Link 
      to={to} 
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
        path === to 
          ? 'bg-purple-500/15 text-purple-400 shadow-[inset_0_0_20px_rgba(168,85,247,0.1)] border border-purple-500/30' 
          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
      }`}
    >
      {icon} {label}
    </Link>
  );

  return (
    <nav className="sticky top-6 z-50 max-w-5xl mx-auto px-4 mb-12">
      <div className="glass-panel py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3 pl-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <FaRobot className="text-white text-xl" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Enterprise AI</h1>
            <div className="text-[10px] uppercase tracking-wider text-purple-400 font-semibold">Knowledge Platform</div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <NavItem to="/" icon={<FaServer />} label="Dashboard" />
          <NavItem to="/scraper" icon={<FaDatabase />} label="Scraper" />
          <NavItem to="/progress" icon={<FaCogs />} label="Progress" />
          <NavItem to="/kb" icon={<FaDatabase />} label="Knowledge Base" />
          <div className="w-px h-6 bg-gray-800 mx-2"></div>
          <NavItem to="/chat" icon={<FaComments />} label="AI Chat" />
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen pb-20">
        <Navigation />
        <main className="animate-fade-in max-w-5xl mx-auto px-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scraper" element={<Scraper />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/kb" element={<KnowledgeBase />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
