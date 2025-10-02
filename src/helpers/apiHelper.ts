const BASE_URL = process.env.VUE_APP_BACKEND_URL;

export const getApi = () => {
    return {
        client: `${BASE_URL}/do-system`
    };
};
