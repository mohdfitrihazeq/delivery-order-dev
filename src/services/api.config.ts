const config = {
    hosts: {
        backendApi: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
    },

    getFromLocalStorage: (key: string): string | null => {
        return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    },

    getTokenFromLocalStorage: (): string | null => config.getFromLocalStorage('token'),

    getClientIdFromLocalStorage: (): string | null => config.getFromLocalStorage('clientId'),

    getHost: (): string => config.hosts.backendApi,

    getHeadersWithToken: (companyId?: string | null, projectId?: string | null): Record<string, string> => {
        const token = config.getTokenFromLocalStorage();
        const clientId = config.getClientIdFromLocalStorage();

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept-Language': 'en'
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        if (clientId) {
            headers['client_id'] = clientId;
        }

        if (companyId) {
            headers['system_company_id'] = companyId;
        }

        if (projectId) {
            headers['project_id'] = projectId;
        }

        return headers;
    }
};

export default config;
