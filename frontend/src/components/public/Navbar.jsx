import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaRobot } from 'react-icons/fa';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const NavLink = ({ to, children }) => (
        <Link 
            to={to} 
            onClick={() => setIsOpen(false)}
            className={`font-medium transition-colors ${
                location.pathname === to 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
            }`}
        >
            {children}
        </Link>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">
                        <FaRobot size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">GloomDev</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/services">Services & AI</NavLink>
                    <NavLink to="/pricing">Pricing</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/contact" className="px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button 
                    className="md:hidden text-gray-400 hover:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-gray-950 border-b border-gray-800 flex flex-col p-6 gap-6 shadow-2xl animate-fade-in">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/services">Services & AI</NavLink>
                    <NavLink to="/pricing">Pricing</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <Link to="/contact" className="text-center px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors mt-2">
                        Get Started
                    </Link>
                </div>
            )}
        </nav>
    );
}
