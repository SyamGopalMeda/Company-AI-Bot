import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompanyData, saveCompanyData } from '../services/api';
import { FaBuilding, FaAlignLeft, FaArrowRight, FaSpinner, FaCheckCircle } from 'react-icons/fa';

export default function Dashboard() {
    const [data, setData] = useState({ companyName: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getCompanyData().then(res => {
            if (res) setData({ companyName: res.companyName || '', description: res.description || '' });
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveCompanyData(data);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            navigate('/scraper');
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64 text-purple-500">
            <FaSpinner className="animate-spin text-4xl" />
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto py-8">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    Welcome to Enterprise Setup
                </h2>
                <p className="text-gray-400 text-lg">
                    Configure your organization's core identity before building the AI Knowledge Base.
                </p>
            </div>

            <div className="glass-panel p-8 md:p-10 relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
                        <FaBuilding className="text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-white">Step 1: Company Profile</h3>
                        <p className="text-gray-400 text-sm">Basic organizational details</p>
                    </div>
                </div>

                <div className="space-y-6 relative z-10">
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
                    
                    <div className="pt-6 flex justify-end">
                        <button 
                            onClick={handleSave} 
                            disabled={saving}
                            className="premium-button-primary px-8"
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
                </div>
            </div>
        </div>
    );
}
