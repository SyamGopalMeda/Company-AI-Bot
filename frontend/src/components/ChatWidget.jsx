import { useState, useRef, useEffect } from 'react';
import { sendChatMessage, getCompanyData } from '../services/api';
import { FaPaperPlane, FaRobot, FaUser, FaCircleNotch, FaDotCircle, FaCog, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function ChatWidget({ isPublic }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [companyName, setCompanyName] = useState('Assistant');
    const messagesEndRef = useRef(null);
    const companyId = import.meta.env.VITE_PUBLIC_COMPANY_ID || localStorage.getItem('activeCompanyId') || 'gloomdev';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        getCompanyData(companyId).then(data => {
            const name = data?.companyName;
            if (name) {
                setCompanyName(name);
                setMessages([
                    { role: 'bot', text: `Hi there! I'm the AI assistant for ${name}. How can I help you today?` }
                ]);
            } else {
                setMessages([
                    { role: 'bot', text: `Hi there! How can I help you today?` }
                ]);
            }
        }).catch(() => {
            setMessages([
                { role: 'bot', text: `Hi there! How can I help you today?` }
            ]);
        });
    }, [companyId]);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, loading, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMsg = { role: 'user', text: input };
        const newHistory = [...messages, userMsg];
        
        setMessages(newHistory);
        setInput('');
        setLoading(true);

        try {
            const res = await sendChatMessage(companyId, input, messages);
            setMessages([...newHistory, { role: 'bot', text: res.reply }]);
        } catch (error) {
            setMessages([...newHistory, { role: 'bot', text: 'Sorry, I encountered a system error while processing your request.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[99999] font-sans">
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[380px] h-[600px] bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
                    
                    {/* Chat Header */}
                    <div className="px-5 py-4 border-b border-gray-800 bg-gray-900 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                    <FaRobot className="text-white" />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-white">{companyName} AI</h2>
                                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-green-400 uppercase tracking-wider">
                                    <FaDotCircle /> Online
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            {isPublic && (
                                <Link to="/admin" className="text-gray-500 hover:text-purple-400 transition-colors p-2 rounded-lg hover:bg-gray-800" title="Admin Settings">
                                    <FaCog size={16} />
                                </Link>
                            )}
                            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800">
                                <FaTimes size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-black/40 custom-scrollbar">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex items-start gap-3 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-md ${
                                    msg.role === 'bot' 
                                        ? 'bg-gray-800 border border-gray-700 text-purple-400' 
                                        : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                                }`}>
                                    {msg.role === 'bot' ? <FaRobot size={12} /> : <FaUser size={12} />}
                                </div>
                                <div className={msg.role === 'bot' ? 'bg-gray-800 border border-gray-700 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm' : 'bg-purple-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm'}>
                                    {msg.role === 'bot' ? (
                                        <div className="markdown-body"><ReactMarkdown>{msg.text}</ReactMarkdown></div>
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
                            <div className="flex items-start gap-3 animate-fade-in">
                                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gray-800 border border-gray-700 text-purple-400 shadow-md">
                                    <FaRobot size={12} />
                                </div>
                                <div className="bg-gray-800 border border-gray-700 text-gray-400 px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm flex items-center gap-2">
                                    <FaCircleNotch className="animate-spin" /> Processing...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-gray-900 border-t border-gray-800">
                        <div className="relative flex items-center">
                            <input 
                                type="text"
                                className="w-full bg-gray-950 border border-gray-700 rounded-full pl-5 pr-12 py-3.5 text-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                disabled={loading}
                            />
                            <button 
                                onClick={handleSend}
                                disabled={!input.trim() || loading}
                                className="absolute right-1.5 w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-purple-600"
                            >
                                <FaPaperPlane className="ml-[-2px] text-xs" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform"
            >
                {isOpen ? <FaTimes size={24} /> : <FaRobot size={28} />}
            </button>
        </div>
    );
}
