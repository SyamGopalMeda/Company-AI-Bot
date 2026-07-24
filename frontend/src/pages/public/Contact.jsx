import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function Contact() {
    return (
        <div className="w-full">
            <div className="pt-24 pb-16 text-center border-b border-gray-900 bg-black/30">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Touch</span></h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Whether you're ready to deploy or just have some questions, our AI integration experts are here to help.
                </p>
            </div>

            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
                        <div className="space-y-8 mb-12">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Email Us</h4>
                                    <p className="text-gray-400 text-sm mb-1">For general inquiries and support.</p>
                                    <a href="mailto:hello@gloomdev.in" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">hello@gloomdev.in</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Global Headquarters</h4>
                                    <p className="text-gray-400 text-sm mb-1">Come visit our AI lab.</p>
                                    <span className="text-gray-300 font-medium">101 Innovation Way, Tech District, CA 94107</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                                    <FaPhone />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Call Us</h4>
                                    <p className="text-gray-400 text-sm mb-1">Available Mon-Fri, 9am - 6pm EST.</p>
                                    <a href="tel:+15551234567" className="text-gray-300 font-medium hover:text-white transition-colors">+1 (555) 123-4567</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass-panel p-8 md:p-10 rounded-3xl border border-gray-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>
                        <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Send us a message</h3>
                        <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">First Name</label>
                                    <input type="text" className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Last Name</label>
                                    <input type="text" className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Work Email</label>
                                <input type="email" className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" placeholder="john@company.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Message</label>
                                <textarea rows="4" className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none custom-scrollbar" placeholder="How can we help you automate?"></textarea>
                            </div>
                            <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-purple-500/20 transition-all active:scale-[0.98]">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
