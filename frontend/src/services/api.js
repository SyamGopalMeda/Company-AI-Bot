import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3001');

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getCompanyData = async (companyId) => {
    if (!companyId) return null;
    const res = await api.get(`/api/admin/${companyId}/company-data`);
    return res.data;
};

export const saveCompanyData = async (companyId, data) => {
    const res = await api.post(`/api/admin/${companyId}/save-company-data`, data);
    return res.data;
};

export const importWebsite = async (companyId, url) => {
    const res = await api.post(`/api/admin/${companyId}/import-website`, { url });
    return res.data;
};

export const sendChatMessage = async (companyId, message, history) => {
    const res = await api.post('/api/chat', { message, history, companyId });
    return res.data;
};

export const getProgressEventSource = (companyId) => {
    const token = localStorage.getItem('adminToken');
    // Note: EventSource doesn't support headers easily without polyfills. 
    // We can pass token in URL if needed, but for now we'll just hit the endpoint.
    return new EventSource(`${API_URL}/api/admin/${companyId}/scraping-progress`);
};

export const getProviderStatus = async () => {
    const res = await api.get('/api/admin/providers/status');
    return res.data;
};

export default api;
