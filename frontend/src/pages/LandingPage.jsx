import { FaRocket, FaCode, FaChartLine, FaCheckCircle, FaStar } from 'react-icons/fa';

export default function LandingPage() {
    return (
        <div className="bg-gray-950 min-h-screen text-gray-100 font-sans selection:bg-purple-500/30">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">
                            NX
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">NexusCorp</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                        <a href="#about" className="hover:text-white transition-colors">About</a>
                        <a href="#services" className="hover:text-white transition-colors">Services</a>
                        <a href="#products" className="hover:text-white transition-colors">Products</a>
                        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <button className="hidden md:block px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-semibold tracking-wide">
                        Welcome to the Future of Enterprise
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tighter">
                        Innovate with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Intelligent Solutions</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        NexusCorp empowers modern businesses with cutting-edge software, strategic insights, and AI-driven automation to accelerate your growth.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-1">
                            Explore Services
                        </button>
                        <button className="px-8 py-4 rounded-full bg-gray-900 border border-gray-700 text-white font-bold text-lg hover:bg-gray-800 transition-all">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-black/50 border-y border-gray-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Capabilities</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">We provide a comprehensive suite of enterprise services designed to optimize operations and drive digital transformation.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <FaCode />, title: 'Custom Software', desc: 'Scalable cloud-native architectures and full-stack development tailored to your exact needs.' },
                            { icon: <FaChartLine />, title: 'Strategic Consulting', desc: 'Data-driven insights and procurement strategies that maximize efficiency and ROI.' },
                            { icon: <FaRocket />, title: 'AI Integration', desc: 'Seamlessly embed artificial intelligence into your existing workflows for unparalleled automation.' }
                        ].map((s, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-colors group">
                                <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center text-2xl text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                    {s.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
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
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted by Industry Leaders</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Our commitment to excellence has helped dozens of Fortune 500 companies achieve their digital transformation goals faster and more securely.
                            </p>
                            <div className="space-y-4">
                                {['99.9% Uptime Guarantee', '24/7 Enterprise Support', 'SOC 2 Type II Compliant'].map((f, i) => (
                                    <div key={i} className="flex items-center gap-3 text-gray-300">
                                        <FaCheckCircle className="text-green-500" />
                                        <span className="font-medium">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 blur-2xl opacity-20 rounded-3xl"></div>
                            <div className="relative p-10 rounded-3xl bg-gray-900 border border-gray-700">
                                <div className="flex gap-1 text-yellow-500 mb-6">
                                    {[1,2,3,4,5].map(star => <FaStar key={star} />)}
                                </div>
                                <p className="text-xl italic text-gray-300 mb-8 leading-relaxed">
                                    "NexusCorp entirely transformed our data pipeline. Their AI integrations alone saved us hundreds of hours in manual processing within the first month."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-700"></div>
                                    <div>
                                        <div className="font-bold text-white">Sarah Jenkins</div>
                                        <div className="text-sm text-gray-400">CTO, TechLogistics Inc.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-900 bg-black pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center font-bold text-white text-xs">NX</div>
                                <span className="text-lg font-bold text-white">NexusCorp</span>
                            </div>
                            <p className="text-gray-500 text-sm">Building the future of enterprise software, one intelligent system at a time.</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-purple-400">About Us</a></li>
                                <li><a href="#" className="hover:text-purple-400">Careers</a></li>
                                <li><a href="#" className="hover:text-purple-400">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-purple-400">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center text-sm text-gray-600 pt-8 border-t border-gray-900">
                        &copy; {new Date().getFullYear()} NexusCorp. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
