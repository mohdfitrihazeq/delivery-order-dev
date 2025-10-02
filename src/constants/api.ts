export const BASE_PATH = '';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout'
    },
    REQUEST_ORDERS: {
        LIST: '/request-orders',
        CREATE: '/request-orders',
        UPDATE: (id: string) => `/request-orders/${id}`,
        DELETE: (id: string) => `/request-orders/${id}`
    }
};
