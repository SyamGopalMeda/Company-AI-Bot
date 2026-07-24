import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from '../ChatWidget';

export default function PublicLayout() {
    return (
        <div className="bg-gray-950 min-h-screen text-gray-100 font-sans selection:bg-purple-500/30">
            <Navbar />
            
            {/* Main content area */}
            <main className="pt-20 min-h-screen">
                <Outlet />
            </main>
            
            <Footer />
            
            {/* The ChatWidget sits above everything */}
            <ChatWidget isPublic={true} />
        </div>
    );
}
