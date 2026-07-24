import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { importWebsite } from '../services/api';
import { FaGlobe, FaSpider, FaArrowRight, FaSpinner } from 'react-icons/fa';

export default function Scraper() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleScrape = async () => {
        if (!url) {
            setError('Please enter a valid website URL.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await importWebsite(url);
            navigate('/progress');
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to start scraping');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12">
            <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-blue-500/15 text-blue-400 rounded-2xl border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                        <FaSpider className="text-3xl" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white tracking-tight">Step 2: Data Ingestion</h3>
                        <p className="text-gray-400 mt-1">Deploy the autonomous crawler</p>
                    </div>
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-5 mb-6">
                        <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                            <FaGlobe /> Target Acquisition
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Enter the root URL of the target website. The system will purge the existing Knowledge Base, navigate through the target's internal links, and extract semantic content from up to 15 pages.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Website URL</label>
                        <input 
                            type="url" 
                            className="premium-input text-lg font-mono placeholder-gray-600"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
                        />
                        {error && <p className="text-red-400 text-sm mt-2 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>{error}</p>}
                    </div>
                    
                    <div className="pt-6">
                        <button 
                            onClick={handleScrape} 
                            disabled={loading || !url}
                            className="premium-button-primary w-full py-4 text-lg"
                        >
                            {loading ? (
                                <><FaSpinner className="animate-spin text-xl" /> Initializing Crawl Protocol...</>
                            ) : (
                                <>Deploy Crawler <FaArrowRight className="ml-2" /></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
