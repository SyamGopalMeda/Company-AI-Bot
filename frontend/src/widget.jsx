import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import ReactMarkdown from 'react-markdown';
import './index.css';

// Using a lightweight fallback for icons to avoid huge bundle sizes from react-icons in the widget
const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);

function WidgetApp({ companyId, apiUrl }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [companyName, setCompanyName] = useState('Assistant');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!companyId) return;
        fetch(`${apiUrl}/api/branding/${companyId}`)
            .then(res => res.json())
            .then(data => {
                if (data.companyName) {
                    setCompanyName(data.companyName);
                    setMessages([{ role: 'bot', text: `Hi there! I'm the AI assistant for ${data.companyName}. How can I help you today?` }]);
                } else {
                    setMessages([{ role: 'bot', text: `Hi there! How can I help you today?` }]);
                }
            })
            .catch(() => {
                setMessages([{ role: 'bot', text: `Hi there! How can I help you today?` }]);
            });
    }, [companyId, apiUrl]);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen, loading]);

    const handleSend = async () => {
        if (!input.trim() || !companyId) return;
        
        const userMsg = { role: 'user', text: input };
        const newHistory = [...messages, userMsg];
        
        setMessages(newHistory);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch(`${apiUrl}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ companyId, message: input, history: messages })
            });
            const data = await res.json();
            setMessages([...newHistory, { role: 'bot', text: data.reply || 'Sorry, an error occurred.' }]);
        } catch (error) {
            setMessages([...newHistory, { role: 'bot', text: 'Sorry, I encountered a system error.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999999, fontFamily: 'sans-serif' }}>
            {isOpen && (
                <div style={{ 
                    position: 'absolute', bottom: '70px', right: '0', 
                    width: '350px', height: '500px', 
                    backgroundColor: '#111827', 
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                    display: 'flex', flexDirection: 'col', overflow: 'hidden', border: '1px solid #374151'
                }}>
                    <div style={{ padding: '16px', backgroundColor: '#1F2937', color: 'white', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontWeight: 'bold' }}>{companyName} AI</div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer' }}>
                            <CloseIcon />
                        </button>
                    </div>
                    
                    <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{ 
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                backgroundColor: msg.role === 'user' ? '#8B5CF6' : '#374151',
                                color: 'white',
                                padding: '10px 14px',
                                borderRadius: '12px',
                                maxWidth: '85%',
                                fontSize: '14px',
                                lineHeight: '1.4'
                            }}>
                                {msg.role === 'bot' ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div style={{ alignSelf: 'flex-start', backgroundColor: '#374151', color: '#9CA3AF', padding: '10px 14px', borderRadius: '12px', fontSize: '14px' }}>
                                Processing...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div style={{ padding: '12px', backgroundColor: '#1F2937', borderTop: '1px solid #374151', display: 'flex', gap: '8px' }}>
                        <input 
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            style={{ flex: 1, padding: '10px 14px', borderRadius: '20px', border: 'none', outline: 'none', backgroundColor: '#374151', color: 'white' }}
                        />
                        <button 
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            style={{ 
                                width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#8B5CF6', 
                                border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: (loading || !input.trim()) ? 'not-allowed' : 'pointer', opacity: (loading || !input.trim()) ? 0.5 : 1
                            }}
                        >
                            <SendIcon />
                        </button>
                    </div>
                </div>
            )}

            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    backgroundColor: '#8B5CF6', color: 'white', border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'transform 0.2s ease-in-out'
                }}
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </button>
        </div>
    );
}

// Auto-initialize when script loads
(function initWidget() {
    const scriptTag = document.currentScript;
    if (!scriptTag) return;
    
    const companyId = scriptTag.getAttribute('data-company-id');
    const apiUrl = scriptTag.getAttribute('data-api-url') || 'http://localhost:3001';
    
    if (!companyId) {
        console.error("AI Widget Error: data-company-id is missing from script tag");
        return;
    }

    const rootElement = document.createElement('div');
    rootElement.id = 'ai-chat-widget-root';
    document.body.appendChild(rootElement);
    
    const root = createRoot(rootElement);
    root.render(<WidgetApp companyId={companyId} apiUrl={apiUrl} />);
})();
