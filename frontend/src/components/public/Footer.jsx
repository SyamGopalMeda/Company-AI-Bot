import { Link } from 'react-router-dom';
import { FaRobot, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="border-t border-gray-900 bg-black pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center font-bold text-white text-xs shadow-lg shadow-purple-500/20">
                                <FaRobot />
                            </div>
                            <span className="text-lg font-bold text-white tracking-tight">GloomDev</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Building the future of enterprise software with intelligent AI chatbot solutions and automated systems.
                        </p>
                        <div className="flex gap-4 text-gray-500">
                            <a href="#" className="hover:text-purple-400 transition-colors"><FaTwitter size={18} /></a>
                            <a href="#" className="hover:text-purple-400 transition-colors"><FaLinkedin size={18} /></a>
                            <a href="#" className="hover:text-purple-400 transition-colors"><FaGithub size={18} /></a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4 text-white">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-purple-400 transition-colors">Services & AI</Link></li>
                            <li><Link to="/pricing" className="hover:text-purple-400 transition-colors">Pricing Plans</Link></li>
                            <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4 text-white">Resources</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">API Reference</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4 text-white">Legal</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Security</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 pt-8 border-t border-gray-900">
                    <div>&copy; {new Date().getFullYear()} GloomDev Private Limited. All rights reserved.</div>
                    <div className="mt-2 md:mt-0">Made with AI precision.</div>
                </div>
            </div>
        </footer>
    );
}
