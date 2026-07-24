import { Link } from 'react-router-dom';
import { FaRocket, FaCode, FaChartLine, FaCheckCircle, FaStar, FaRobot } from 'react-icons/fa';

export default function Home() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-semibold tracking-wide">
                        The Next Generation of AI Chatbots
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tighter">
                        Intelligent Automation by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">GloomDev</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        GloomDev builds plug-and-play AI chatbot solutions that seamlessly integrate into your business, delivering 24/7 intelligent customer support and workflow automation.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact" className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-1 flex items-center justify-center">
                            Deploy Your AI Bot
                        </Link>
                        <Link to="/services" className="px-8 py-4 rounded-full bg-gray-900 border border-gray-700 text-white font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center">
                            Explore Capabilities
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-black/50 border-y border-gray-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose GloomDev AI?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Our AI platform goes beyond simple responses. We build RAG-powered systems that understand your exact corporate knowledge base.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <FaRobot />, title: 'Hyper-Personalized AI', desc: 'Our bots ingest your specific website data, PDFs, and documentation to become an instant expert on your business.' },
                            { icon: <FaCode />, title: 'Plug-and-Play Integration', desc: 'No coding required. Just copy and paste a single script tag into your website to deploy your intelligent assistant.' },
                            { icon: <FaChartLine />, title: 'Scalable Architecture', desc: 'Built on top of robust vector databases and cutting-edge LLMs to handle thousands of concurrent interactions effortlessly.' }
                        ].map((s, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-colors group">
                                <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center text-2xl text-purple-400 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/10">
                                    {s.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{s.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Trusted by Modern Enterprises</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Our intelligent AI solutions have transformed customer support and data retrieval for businesses across the globe, significantly reducing overhead while improving user satisfaction.
                            </p>
                            <div className="space-y-4">
                                {['Instant Knowledge Base Scraping', 'Context-Aware Responses', 'Zero Maintenance Required'].map((f, i) => (
                                    <div key={i} className="flex items-center gap-3 text-gray-300">
                                        <FaCheckCircle className="text-purple-500" />
                                        <span className="font-medium">{f}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10">
                                <Link to="/about" className="text-purple-400 font-semibold hover:text-purple-300 flex items-center gap-2">
                                    Learn more about our mission →
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 blur-2xl opacity-20 rounded-3xl"></div>
                            <div className="relative p-10 rounded-3xl bg-gray-900 border border-gray-700 shadow-2xl">
                                <div className="flex gap-1 text-yellow-500 mb-6">
                                    {[1,2,3,4,5].map(star => <FaStar key={star} />)}
                                </div>
                                <p className="text-xl italic text-gray-300 mb-8 leading-relaxed">
                                    "Integrating the GloomDev AI Chatbot took less than five minutes. It immediately began answering complex customer queries by reading our product manuals. It is absolute magic."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600"></div>
                                    <div>
                                        <div className="font-bold text-white">David Chen</div>
                                        <div className="text-sm text-gray-400">Director of Operations, FinTech Solutions</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
