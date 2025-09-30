import { showError, showSuccess } from '@/utils/NotificationToast.utils';
import { qtimeAxios } from './BackendAxiosInstance.service';

const login = async (username: string, password: string) => {
    try {
        const url = `/qtime/web/auth/login`;
        const response = await qtimeAxios.post(url, { username, password });

        showSuccess(response, 'Success to access login from the server.', 'Login');

        return response.data;
    } catch (error: any) {
        showError(error, 'Filed to access login from the server.', 'Login');
    }
};

export const authService = {
    login
};
