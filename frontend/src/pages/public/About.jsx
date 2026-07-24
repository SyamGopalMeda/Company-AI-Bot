import { FaBrain, FaUsers, FaLightbulb } from 'react-icons/fa';

export default function About() {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="pt-24 pb-16 text-center border-b border-gray-900 bg-black/30">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">GloomDev</span></h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    We are pioneers in intelligent automation, dedicated to transforming how businesses interact with their customers through generative AI.
                </p>
            </div>

            {/* Mission Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                        <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                            At GloomDev, we believe that every business, regardless of size, deserves access to enterprise-grade artificial intelligence. 
                        </p>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            We bridge the gap between complex machine learning technologies and practical business applications by building seamless, plug-and-play chatbot solutions that require zero technical expertise to deploy.
                        </p>
                    </div>
                    <div className="relative h-80 rounded-3xl overflow-hidden border border-gray-800 bg-gray-900 flex items-center justify-center group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-blue-900/40 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <FaBrain className="text-8xl text-purple-500/50 relative z-10" />
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 bg-gray-950/50 border-t border-gray-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Our Core Values</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">The principles that drive our engineering and our commitment to our clients.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { icon: <FaBrain />, title: 'Intelligence First', desc: 'We leverage the most advanced LLMs and RAG architectures to ensure our bots actually understand context, rather than just matching keywords.' },
                            { icon: <FaLightbulb />, title: 'Frictionless Innovation', desc: 'Technology should solve problems, not create new ones. Our SDK is designed to be installed in minutes with zero friction.' },
                            { icon: <FaUsers />, title: 'Customer-Centric', desc: 'Every feature we build is designed to improve the end-user experience, reducing wait times and providing accurate, instant support.' }
                        ].map((v, i) => (
                            <div key={i} className="glass-panel p-8 text-center group">
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-800/80 flex items-center justify-center text-3xl text-purple-400 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/10">
                                    {v.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{v.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
