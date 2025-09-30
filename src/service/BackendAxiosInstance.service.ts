import axios from 'axios';
import Config from './config/BackendConfigs';

// QTime axios 实例
const qtimeAxios = axios.create({
    baseURL: Config.getQtimeHost(),
    timeout: 30000
});

qtimeAxios.interceptors.request.use((request) => {
    const headers = Config.getQtimeHeadersWithToken();
    Object.entries(headers).forEach(([key, value]) => {
        if (value) request.headers.set(key, value as string);
    });
    return request;
});

// DO axios 实例
const doAxios = axios.create({
    baseURL: Config.getDoHost(),
    timeout: 30000
});

export { doAxios, qtimeAxios };
