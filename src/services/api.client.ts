import { BASE_PATH } from '@/constants/api';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import axios, { AxiosError } from 'axios';
import config from './api.config';

const apiClient = axios.create({
    baseURL: `${config.getHost()}${BASE_PATH}`,
    timeout: 10000
});

// Request interceptor
apiClient.interceptors.request.use(
    (request) => {
        const headers = config.getHeadersWithToken();

        Object.keys(headers).forEach((key) => {
            request.headers.set(key, headers[key]);
        });

        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            switch (error.response.status) {
                case 401: {
                    console.error('Unauthorized: Redirect to login');

                    const authStore = useAuthStore();
                    authStore.logout();
                    router.push({ name: 'login' });
                    break;
                }
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error('An error occurred:', error.message);
            }
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Request setup error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
