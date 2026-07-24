import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Pricing() {
    return (
        <div className="w-full">
            <div className="pt-24 pb-16 text-center border-b border-gray-900 bg-black/30">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Pricing</span></h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Scalable AI solutions designed for businesses of all sizes. No hidden fees.
                </p>
            </div>

            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Starter */}
                    <div className="glass-panel p-8 rounded-3xl border border-gray-800 flex flex-col relative">
                        <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                        <p className="text-gray-400 text-sm mb-6">Perfect for small websites.</p>
                        <div className="mb-8">
                            <span className="text-4xl font-bold text-white">$49</span>
                            <span className="text-gray-500">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1 text-sm text-gray-300">
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> Up to 100 pages scraped</li>
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> 1,000 AI responses/mo</li>
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> Standard Support</li>
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> Basic Analytics</li>
                        </ul>
                        <Link to="/contact" className="w-full py-3 rounded-full border border-gray-700 text-white font-semibold hover:bg-gray-800 transition-colors text-center">
                            Get Started
                        </Link>
                    </div>

                    {/* Pro */}
                    <div className="glass-panel p-8 rounded-3xl border-2 border-purple-500 bg-gray-900/60 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-purple-500/20">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            Most Popular
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                        <p className="text-gray-400 text-sm mb-6">For growing businesses & agencies.</p>
                        <div className="mb-8">
                            <span className="text-4xl font-bold text-white">$149</span>
                            <span className="text-gray-500">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1 text-sm text-gray-300">
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> Up to 1,000 pages scraped</li>
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> 10,000 AI responses/mo</li>
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> Priority Support</li>
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> Advanced Analytics</li>
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> Custom Branding</li>
                        </ul>
                        <Link to="/contact" className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:shadow-lg transition-all text-center">
                            Get Started
                        </Link>
                    </div>

                    {/* Enterprise */}
                    <div className="glass-panel p-8 rounded-3xl border border-gray-800 flex flex-col relative">
                        <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                        <p className="text-gray-400 text-sm mb-6">Custom solutions for large scale.</p>
                        <div className="mb-8">
                            <span className="text-4xl font-bold text-white">Custom</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1 text-sm text-gray-300">
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> Unlimited scraping</li>
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> Unlimited responses</li>
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> Dedicated Account Manager</li>
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> On-Premise Deployment options</li>
                            <li className="flex items-center gap-3"><FaCheck className="text-purple-500" /> Custom LLM Fine-tuning</li>
                        </ul>
                        <Link to="/contact" className="w-full py-3 rounded-full border border-gray-700 text-white font-semibold hover:bg-gray-800 transition-colors text-center">
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
