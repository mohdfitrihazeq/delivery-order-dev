const config = {
    hosts: {
        qtimeBackendApi: import.meta.env.VITE_QTIME_BACKEND_URL,
        doBackendApi: import.meta.env.VITE_DO_BACKEND_URL
    },

    getFromLocalStorage: (key: string) => (typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null),

    getTokenFromLocalStorage: () => config.getFromLocalStorage('token'),
    getClientIdFromLocalStorage: () => config.getFromLocalStorage('clientId'),

    getQtimeHost: () => config.hosts.qtimeBackendApi,
    getDoHost: () => config.hosts.doBackendApi,

    getQtimeHeadersWithToken: (companyId?: string | null, projectId?: string | null) => {
        const token = config.getTokenFromLocalStorage();
        const clientId = config.getClientIdFromLocalStorage();

        return {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
            client_id: clientId || '',
            'Accept-Language': 'en',
            ...(companyId ? { system_company_id: companyId } : {}),
            ...(projectId ? { project_id: projectId } : {})
        };
    }
};

export default config;
