export const BASE_PATH = '';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout'
    },
    REQUEST_ORDERS: {
        LIST: '/requestOrder',
        CREATE: '/requestOrder',
        UPDATE: (id: string) => `/requestOrder/${id}`,
        DELETE: (id: string) => `/requestOrder/${id}`,
        GET_BY_ID: (id: string) => `/requestOrder/${id}`
    }
};
