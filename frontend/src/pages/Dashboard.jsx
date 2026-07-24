import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompanyData, saveCompanyData } from '../services/api';
import { FaBuilding, FaAlignLeft, FaArrowRight, FaSpinner, FaCheckCircle, FaIdBadge } from 'react-icons/fa';

export default function Dashboard() {
    const [companyId, setCompanyId] = useState(localStorage.getItem('activeCompanyId') || '');
    const [data, setData] = useState({ companyName: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (companyId) {
            setLoading(true);
            getCompanyData(companyId).then(res => {
                if (res) setData({ companyName: res.companyName || '', description: res.description || '' });
                setLoading(false);
            }).catch(() => setLoading(false));
        }
    }, [companyId]);

    const handleSave = async () => {
        if (!companyId) return alert("Please specify a Company ID");
        localStorage.setItem('activeCompanyId', companyId);
        
        setSaving(true);
        try {
            await saveCompanyData(companyId, data);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            navigate('/admin/scraper');
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    Company Profile Setup
                </h2>
                <p className="text-gray-400 text-lg">
                    Configure a company's identity before building their AI Knowledge Base.
                </p>
            </div>

            <div className="glass-panel p-8 md:p-10 relative overflow-hidden">
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
                        <FaBuilding className="text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-white">Company Information</h3>
                        <p className="text-gray-400 text-sm">Define the company context for the AI</p>
                    </div>
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <FaIdBadge className="text-gray-500" /> Company ID (Unique Slug)
                        </label>
                        <input 
                            type="text" 
                            className="premium-input text-lg"
                            placeholder="e.g., gloomdev-hq"
                            value={companyId}
                            onChange={(e) => {
                                setCompanyId(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
                            }}
                        />
                        <p className="text-xs text-gray-500">This will be used in the widget embed script.</p>
                    </div>
                    
                    {loading ? (
                        <div className="flex justify-center py-4"><FaSpinner className="animate-spin text-2xl text-purple-500" /></div>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    Company Name
                                </label>
                                <input 
                                    type="text" 
                                    className="premium-input text-lg"
                                    placeholder="e.g., GloomDev Private Limited"
                                    value={data.companyName}
                                    onChange={(e) => setData({ ...data, companyName: e.target.value })}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <FaAlignLeft className="text-gray-500" /> Executive Summary
                                </label>
                                <textarea 
                                    className="premium-input min-h-[160px] resize-y"
                                    placeholder="Provide a high-level overview of the company, its mission, and core services..."
                                    value={data.description}
                                    onChange={(e) => setData({ ...data, description: e.target.value })}
                                />
                            </div>
                        </>
                    )}
                    
                    <div className="pt-6 flex justify-end">
                        <button 
                            onClick={handleSave} 
                            disabled={saving || !companyId}
                            className="premium-button-primary px-8 disabled:opacity-50"
                        >
                            {saving ? (
                                <><FaSpinner className="animate-spin" /> Saving Configuration...</>
                            ) : saved ? (
                                <><FaCheckCircle /> Profile Saved!</>
                            ) : (
                                <>Continue to Scraper <FaArrowRight className="ml-2" /></>
                            )}
                        </button>
                    </div>

                    {companyId && !loading && (
                        <div className="mt-8 pt-6 border-t border-gray-800">
                            <h4 className="text-lg font-semibold text-white mb-2">Installation Code</h4>
                            <p className="text-sm text-gray-400 mb-3">Copy and paste this script before the closing <code>&lt;/body&gt;</code> tag on the target website to install the AI Chat widget.</p>
                            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm text-gray-300 relative group overflow-x-auto">
                                <code>
                                    &lt;script src="{import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5173'}/widget/widget.iife.js" data-company-id="{companyId}" {import.meta.env.VITE_API_URL ? `data-api-url="${import.meta.env.VITE_API_URL}"` : ''}&gt;&lt;/script&gt;
                                </code>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
