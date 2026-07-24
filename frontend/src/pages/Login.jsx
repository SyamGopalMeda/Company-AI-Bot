import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setAuthToken }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            const res = await fetch(`${apiUrl}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await res.json();
            if (res.ok && data.token) {
                localStorage.setItem('adminToken', data.token);
                setAuthToken(data.token);
                navigate('/');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('System error connecting to backend');
        }
    };

    return (
        <div className="flex items-center justify-center h-[80vh]">
            <div className="glass-panel p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
                {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm">{error}</div>}
                
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Admin Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                            placeholder="Enter password..."
                        />
                    </div>
                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition-colors">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
