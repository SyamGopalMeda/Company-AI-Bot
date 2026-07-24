import { FaRobot, FaDatabase, FaCogs, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Services() {
    return (
        <div className="w-full">
            <div className="pt-24 pb-16 text-center border-b border-gray-900 bg-black/30">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Services & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">AI Solutions</span></h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Enterprise-grade artificial intelligence configured specifically for your business data.
                </p>
            </div>

            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                        { 
                            icon: <FaDatabase />, 
                            title: 'Automated Knowledge Scraping', 
                            desc: 'Our proprietary crawler securely ingests your entire corporate website, documentation, and PDFs, converting them into a highly optimized vector knowledge base.'
                        },
                        { 
                            icon: <FaRobot />, 
                            title: 'Custom RAG Chatbots', 
                            desc: 'We deploy Retrieval-Augmented Generation (RAG) models that guarantee hallucinations are minimized. The AI only answers based on the ground truth data you provide.'
                        },
                        { 
                            icon: <FaCogs />, 
                            title: 'Plug-and-Play SDK', 
                            desc: 'Integrate the GloomDev AI widget into any CMS (WordPress, Webflow, React, HTML) using a single line of JavaScript. No complex backend configurations required.'
                        },
                        { 
                            icon: <FaShieldAlt />, 
                            title: 'Enterprise Security', 
                            desc: 'Your corporate data is siloed and secure. We never use your proprietary data to train foundational models, ensuring strict compliance with enterprise privacy standards.'
                        }
                    ].map((s, i) => (
                        <div key={i} className="flex gap-6 p-8 rounded-3xl bg-gray-900/40 border border-gray-800 hover:bg-gray-900/80 transition-colors">
                            <div className="w-16 h-16 shrink-0 rounded-2xl bg-gray-800 flex items-center justify-center text-3xl text-blue-400 shadow-lg shadow-blue-500/10">
                                {s.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center glass-panel p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]"></div>
                    <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Ready to automate your workflows?</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">Deploying a custom AI solution takes less than 5 minutes. Get started today and transform your customer support.</p>
                    <Link to="/contact" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors relative z-10">
                        Request a Demo
                    </Link>
                </div>
            </section>
        </div>
    );
}
