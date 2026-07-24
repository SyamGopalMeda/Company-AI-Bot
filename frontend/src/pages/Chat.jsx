import { useState, useRef, useEffect } from 'react';
import { sendChatMessage, getCompanyData } from '../services/api';
import { FaPaperPlane, FaRobot, FaUser, FaCircleNotch, FaDotCircle } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        getCompanyData().then(data => {
            const companyName = data?.companyName || "the company";
            setMessages([
                { role: 'bot', text: `Hello! I am the virtual assistant for ${companyName}. How can I assist you today?` }
            ]);
        }).catch(() => {
            setMessages([
                { role: 'bot', text: `Hello! I am the virtual assistant here to help. How can I assist you today?` }
            ]);
        });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMsg = { role: 'user', text: input };
        const newHistory = [...messages, userMsg];
        
        setMessages(newHistory);
        setInput('');
        setLoading(true);

        try {
            const res = await sendChatMessage(input, messages);
            setMessages([...newHistory, { role: 'bot', text: res.reply }]);
        } catch (error) {
            setMessages([...newHistory, { role: 'bot', text: 'Sorry, I encountered a system error while processing your request.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-6 h-[85vh] flex flex-col">
            <div className="glass-panel flex flex-col h-full overflow-hidden">
                
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/80 flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <FaRobot className="text-white text-xl" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">AI Knowledge Assistant</h2>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-green-400 uppercase tracking-wider mt-0.5">
                            <FaDotCircle className="text-[10px]" /> Online & Ready
                        </div>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/20">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex items-start gap-4 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 shadow-md ${
                                msg.role === 'bot' 
                                    ? 'bg-gray-800 border border-gray-700 text-purple-400' 
                                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                            }`}>
                                {msg.role === 'bot' ? <FaRobot size={14} /> : <FaUser size={14} />}
                            </div>
                            <div className={msg.role === 'bot' ? 'chat-bubble-bot markdown-body' : 'chat-bubble-user'}>
                                {msg.role === 'bot' ? (
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                ) : (
                                    msg.text.split('\n').map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            <br />
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {loading && (
                        <div className="flex items-start gap-4 animate-fade-in">
                            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 bg-gray-800 border border-gray-700 text-purple-400 shadow-md">
                                <FaRobot size={14} />
                            </div>
                            <div className="chat-bubble-bot flex items-center gap-2 text-gray-400">
                                <FaCircleNotch className="animate-spin" /> Processing...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-gray-900/80 border-t border-gray-800">
                    <div className="relative flex items-center">
                        <input 
                            type="text"
                            className="w-full bg-gray-950/80 border border-gray-700 rounded-full pl-6 pr-14 py-4 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                            placeholder="Ask me anything based on the Knowledge Base..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            disabled={loading}
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!input.trim() || loading}
                            className="absolute right-2 w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-purple-600"
                        >
                            <FaPaperPlane className="ml-[-2px] text-sm" />
                        </button>
                    </div>
                    <div className="text-center mt-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                        Powered by Enterprise Knowledge Engine
                    </div>
                </div>
            </div>
        </div>
    );
}
