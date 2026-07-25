import { useState, useEffect } from 'react';
import { getProviderStatus } from '../services/api';
import { FaServer, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaClock, FaSpinner } from 'react-icons/fa';

export default function ProviderDashboard() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getProviderStatus();
                setStats(data);
                setError('');
            } catch (err) {
                console.error(err);
                setError("Failed to fetch provider status");
            }
        };

        fetchStats();
        const interval = setInterval(fetchStats, 2000);
        return () => clearInterval(interval);
    }, []);

    if (!stats && !error) {
        return (
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-4xl text-purple-500" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="mb-10 flex justify-between items-end border-b border-gray-800 pb-6">
                <div>
                    <h2 className="text-3xl font-bold mb-2 text-white flex items-center gap-3">
                        <FaServer className="text-purple-500" /> AI Provider Dashboard
                    </h2>
                    <p className="text-gray-400">
                        Real-time load balancing and health monitoring for Gemini and Groq models.
                    </p>
                </div>
                {error && <div className="text-red-400 bg-red-500/10 px-4 py-2 rounded-lg font-medium">{error}</div>}
            </div>

            {stats && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="glass-panel p-6 border-t-4 border-t-blue-500">
                            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Active Requests</p>
                            <p className="text-3xl font-bold text-white">{stats.activeRequests}</p>
                        </div>
                        <div className="glass-panel p-6 border-t-4 border-t-purple-500">
                            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Cache Size</p>
                            <p className="text-3xl font-bold text-white">{stats.cacheSize} items</p>
                        </div>
                        <div className="glass-panel p-6 border-t-4 border-t-indigo-500">
                            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Gemini Model</p>
                            <p className="text-lg font-semibold text-white truncate" title={stats.geminiModel}>{stats.geminiModel}</p>
                        </div>
                        <div className="glass-panel p-6 border-t-4 border-t-teal-500">
                            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Groq Model</p>
                            <p className="text-lg font-semibold text-white truncate" title={stats.groqModel}>{stats.groqModel}</p>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">Configured Providers ({stats.providers.length})</h3>
                    <div className="glass-panel overflow-x-auto border border-gray-800 rounded-lg">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-gray-800/50 text-xs uppercase text-gray-300">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">ID</th>
                                    <th className="px-6 py-4 font-semibold">Type</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Requests</th>
                                    <th className="px-6 py-4 font-semibold text-right">Failures</th>
                                    <th className="px-6 py-4 font-semibold text-right">Avg Latency</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {stats.providers.map(provider => {
                                    const isHealthy = provider.status === 'Healthy';
                                    const isCooldown = provider.status === 'Cooldown';
                                    const isInvalid = provider.status === 'Invalid';

                                    return (
                                        <tr key={provider.id} className={`hover:bg-white/5 transition-colors ${isCooldown ? 'opacity-70' : ''}`}>
                                            <td className="px-6 py-4 font-bold text-white uppercase whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center justify-center w-5">
                                                        {isHealthy && <FaCheckCircle className="text-green-500 text-lg" title="Healthy" />}
                                                        {isCooldown && <FaClock className="text-yellow-500 text-lg" title="Cooldown" />}
                                                        {isInvalid && <FaTimesCircle className="text-red-500 text-lg" title="Invalid" />}
                                                        {!isHealthy && !isCooldown && !isInvalid && <FaExclamationTriangle className="text-orange-500 text-lg" />}
                                                    </span>
                                                    {provider.id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-xs font-bold px-3 py-1 rounded bg-gray-800 text-gray-300 uppercase">
                                                    {provider.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`font-semibold ${isHealthy ? 'text-green-400' : isCooldown ? 'text-yellow-400' : 'text-red-400'}`}>
                                                    {provider.status}
                                                    {isCooldown && <span className="ml-2 text-xs">({provider.cooldownRemaining}s)</span>}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-white font-mono">{provider.requests}</td>
                                            <td className="px-6 py-4 text-right text-white font-mono">{provider.failures}</td>
                                            <td className="px-6 py-4 text-right text-white font-mono">{provider.avgLatency} ms</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
