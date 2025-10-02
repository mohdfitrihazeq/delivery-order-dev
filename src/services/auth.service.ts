import { showError } from '@/utils/showError.utils';
import apiClient from './api.client';

export interface LoginResponse {
    token: string;
    user?: {
        username: string;
        role: string;
        email?: string;
    };
    [key: string]: any;
}

const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post('/auth/login', {
            username,
            password
        });

        return response.data;
    } catch (error) {
        showError(error, 'Failed to login. Please check your credentials.');
        throw error;
    }
};

const logout = async (): Promise<void> => {
    try {
        await apiClient.post('/auth/logout');
    } catch (error) {
        showError(error, 'Failed to logout.');
        throw error;
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('clientId');
    }
};

const register = async (username: string, password: string, email?: string): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post('/auth/register', {
            username,
            password,
            email
        });

        return response.data;
    } catch (error) {
        showError(error, 'Failed to register user.');
        throw error;
    }
};

export const authService = {
    login,
    register,
    logout
};
