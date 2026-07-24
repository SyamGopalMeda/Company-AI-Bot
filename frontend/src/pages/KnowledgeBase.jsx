import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompanyData } from '../services/api';
import { FaDatabase, FaCheckCircle, FaSpinner, FaComments, FaCode, FaAlignLeft } from 'react-icons/fa';

export default function KnowledgeBase() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const companyId = localStorage.getItem('activeCompanyId') || import.meta.env.VITE_PUBLIC_COMPANY_ID || 'gloomdev';
        if (!companyId) {
            setLoading(false);
            return;
        }

        getCompanyData(companyId).then(res => {
            // Note: If the backend fails or static HTML is returned, handle it
            if (typeof res === 'string' && res.includes('<!DOCTYPE html>')) {
                throw new Error("Received HTML instead of JSON. The backend API is unreachable or VITE_API_URL is misconfigured.");
            }
            setData(res);
            setLoading(false);
        }).catch((err) => {
            console.error("API Error:", err);
            setError("Failed to connect to the backend. Ensure VITE_API_URL is set in Render.");
            setLoading(false);
        });
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-64 text-purple-500 gap-4">
            <FaSpinner className="animate-spin text-4xl" />
            <span className="text-gray-400 font-medium">Retrieving Knowledge Base...</span>
        </div>
    );
    
    if (error) return (
        <div className="text-center py-12">
            <div className="text-red-400 font-semibold mb-2">Network Error</div>
            <div className="text-gray-400 max-w-md mx-auto">{error}</div>
        </div>
    );
    
    if (!data && !loading) return (
        <div className="text-center py-12 text-gray-400">Please select a company in the Company Profiles tab.</div>
    );

    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold mb-4 text-white">
                    Knowledge Base Verified
                </h2>
                <p className="text-gray-400 text-lg">
                    The AI has successfully ingested and indexed the following corporate data.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 md:col-span-1">
                    <div className="flex items-center gap-3 mb-4 text-purple-400">
                        <FaDatabase className="text-xl" />
                        <h3 className="font-semibold text-white">System Status</h3>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 font-medium bg-green-500/10 w-fit px-3 py-1 rounded-full border border-green-500/20">
                        <FaCheckCircle /> Indexed & Ready
                    </div>
                </div>

                <div className="glass-card p-6 md:col-span-2">
                    <div className="flex items-center gap-3 mb-2 text-blue-400">
                        <FaAlignLeft className="text-xl" />
                        <h3 className="font-semibold text-white">Corporate Identity</h3>
                    </div>
                    <div className="mt-4 space-y-4">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Company Name</div>
                            <div className="text-lg font-medium text-gray-200">{data?.companyName || 'Not Set'}</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Description</div>
                            <div className="text-sm text-gray-400 leading-relaxed">{data?.description || 'Not Set'}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-panel p-8 mb-8">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4 text-purple-400">
                    <FaCode className="text-xl" />
                    <h3 className="text-xl font-bold text-white">Extracted Semantic Data</h3>
                </div>
                
                <div className="bg-gray-950/80 rounded-xl border border-gray-800 p-6 overflow-y-auto max-h-[400px] custom-scrollbar shadow-inner">
                    {data?.websiteContent ? (
                        <pre className="whitespace-pre-wrap text-sm text-gray-400 font-mono leading-relaxed">
                            {data.websiteContent}
                        </pre>
                    ) : (
                        <div className="text-gray-500 text-center py-10 italic">
                            No website data scraped yet.
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center">
                <button 
                    onClick={() => navigate('/chat')}
                    disabled={!data?.websiteContent}
                    className="premium-button-primary px-10 py-4 text-lg w-full md:w-auto"
                >
                    Initialize AI Chatbot <FaComments className="ml-2" />
                </button>
            </div>
        </div>
    );
}
