import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProgressEventSource } from '../services/api';
import { FaCogs, FaArrowRight, FaSpinner, FaCheckCircle, FaNetworkWired } from 'react-icons/fa';

export default function Progress() {
    const [progress, setProgress] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const companyId = localStorage.getItem('activeCompanyId');
        if (!companyId) return;

        const source = getProgressEventSource(companyId);
        
        source.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setProgress(data);
        };

        source.onerror = (err) => {
            console.error("EventSource Error:", err);
            setProgress({ status: 'error', error: 'Failed to establish telemetry connection. Ensure backend is running and VITE_API_URL is correctly set in Render.' });
            source.close();
        };

        return () => {
            source.close();
        };
    }, []);

    const isComplete = progress?.status === 'completed' || progress?.status === 'saved';
    const percent = isComplete ? 100 : (progress?.maxPages ? Math.min(100, Math.round((progress.pagesCrawled / progress.maxPages) * 100)) : 0);

    return (
        <div className="max-w-2xl mx-auto py-12">
            <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-purple-500/15 text-purple-400 rounded-2xl border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] relative">
                        <FaCogs className={`text-3xl ${!isComplete && progress?.status !== 'idle' ? 'animate-spin-slow' : ''}`} />
                        {!isComplete && progress?.status !== 'idle' && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                            </span>
                        )}
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white tracking-tight">Step 3: Scraping Progress</h3>
                        <p className="text-gray-400 mt-1">Real-time telemetry and extraction tracking</p>
                    </div>
                </div>

                <div className="space-y-8 relative z-10">
                    {!progress ? (
                        <div className="flex flex-col items-center justify-center py-16 text-purple-400 gap-4">
                            <FaSpinner className="animate-spin text-4xl" />
                            <span className="text-lg font-medium tracking-wide">Establishing telemetry connection...</span>
                        </div>
                    ) : progress.status === 'error' ? (
                        <div className="flex flex-col items-center justify-center py-16 text-red-400 gap-4 text-center">
                            <div className="text-xl font-bold">Connection Failed</div>
                            <span className="text-gray-400 font-medium max-w-md">{progress.error}</span>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-fade-in">
                            <div className="bg-gray-950/60 p-8 rounded-2xl border border-gray-800 shadow-inner">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">System Status</div>
                                        <div className="text-xl font-medium text-white flex items-center gap-2">
                                            {isComplete ? <FaCheckCircle className="text-green-400" /> : <FaNetworkWired className="text-purple-400" />}
                                            <span className="capitalize">{progress.status}</span>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                        {percent}%
                                    </div>
                                </div>

                                <div className="w-full bg-gray-900 rounded-full h-3 mb-8 overflow-hidden border border-gray-800">
                                    <div 
                                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-1000 ease-out relative"
                                        style={{ width: `${percent}%` }}
                                    >
                                        <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/20 animate-pulse"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="glass-card p-4">
                                        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Pages Crawled</div>
                                        <div className="text-2xl font-semibold text-white">
                                            {progress.pagesCrawled || 0} <span className="text-gray-600 text-lg">/ {progress.maxPages || 15}</span>
                                        </div>
                                    </div>
                                    <div className="glass-card p-4">
                                        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Queue Depth</div>
                                        <div className="text-2xl font-semibold text-white">
                                            {progress.queueLength || 0}
                                        </div>
                                    </div>
                                </div>

                                {progress.currentUrl && !isComplete && (
                                    <div className="mt-6 pt-4 border-t border-gray-800/50">
                                        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Currently Processing</div>
                                        <div className="text-sm text-purple-400 truncate font-mono bg-purple-900/10 py-2 px-3 rounded-lg border border-purple-900/30">
                                            {progress.currentUrl}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {isComplete && (
                                <div className="flex justify-end animate-fade-in">
                                    <button 
                                        onClick={() => navigate('/admin/kb')}
                                        className="premium-button-primary px-8"
                                    >
                                        Verify Knowledge Base <FaArrowRight className="ml-2" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
