import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Scraper from './pages/Scraper';
import Progress from './pages/Progress';
import KnowledgeBase from './pages/KnowledgeBase';
import LandingPage from './pages/LandingPage';
import ChatWidget from './components/ChatWidget';
import { FaRobot, FaDatabase, FaCogs, FaServer, FaHome } from 'react-icons/fa';

import PublicLayout from './components/public/PublicLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Pricing from './pages/public/Pricing';
import Contact from './pages/public/Contact';

import ProviderDashboard from './pages/ProviderDashboard';

function Navigation() {
  const location = useLocation();
  const path = location.pathname;

  const NavItem = ({ to, icon, label }) => (
    <Link 
      to={to} 
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
        path === to 
          ? 'bg-purple-500/15 text-purple-400 shadow-[inset_0_0_20px_rgba(168,85,247,0.1)] border border-purple-500/30' 
          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
      }`}
    >
      {icon} {label}
    </Link>
  );

  return (
    <nav className="sticky top-6 z-50 max-w-7xl mx-auto px-4 mb-12">
      <div className="glass-panel py-3 px-4 flex items-center justify-between bg-gray-950/90 border border-gray-800 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3 pl-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <FaRobot className="text-white text-xl" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Developer Dashboard</h1>
            <div className="text-[10px] uppercase tracking-wider text-purple-400 font-semibold">SDK Admin Panel</div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <NavItem to="/admin" icon={<FaServer />} label="Profiles" />
          <NavItem to="/admin/scraper" icon={<FaDatabase />} label="Scraper" />
          <NavItem to="/admin/progress" icon={<FaCogs />} label="Jobs" />
          <NavItem to="/admin/kb" icon={<FaDatabase />} label="Knowledge Base" />
          <NavItem to="/admin/providers" icon={<FaServer />} label="Providers" />
          <div className="w-px h-6 bg-gray-800 mx-2"></div>
          <NavItem to="/" icon={<FaHome />} label="Back to Site" />
        </div>
      </div>
    </nav>
  );
}

function AdminLayout() {
  return (
    <div className="min-h-screen pb-20 pt-6 animate-fade-in max-w-7xl mx-auto px-4 bg-gray-950 text-gray-100 selection:bg-purple-500/30 font-sans">
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/scraper" element={<Scraper />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/kb" element={<KnowledgeBase />} />
        <Route path="/providers" element={<ProviderDashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Shared Layout & Chatbot */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
