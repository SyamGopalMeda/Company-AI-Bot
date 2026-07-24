import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3001');

const api = axios.create({
    baseURL: API_URL
});

export const getCompanyData = async () => {
    const res = await api.get('/company-data');
    return res.data;
};

export const saveCompanyData = async (data) => {
    const res = await api.post('/save-company-data', data);
    return res.data;
};

export const importWebsite = async (url) => {
    const res = await api.post('/import-website', { url });
    return res.data;
};

export const sendChatMessage = async (message, history) => {
    const res = await api.post('/chat', { message, history });
    return res.data;
};

export const getProgressEventSource = () => {
    return new EventSource(`${API_URL}/scraping-progress`);
};

export default api;
