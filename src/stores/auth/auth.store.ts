import { authService } from '@/services/auth.service';
import type { AuthState, User } from '@/types/auth.type';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem('token') || null,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
        clientId: localStorage.getItem('clientId') || null,
        isLoading: false
    }),

    getters: {
        isAuthenticated: (state): boolean => !!state.token,
        userRole: (state): string | null => state.user?.role || null
    },

    actions: {
        async login(username: string, password: string, useAPI = true): Promise<boolean> {
            this.isLoading = true;

            try {
                if (useAPI) {
                    // Call real API
                    const response = await authService.login(username, password);

                    const { token, user, has_access_client } = response.data || {};
                    if (!token) return false;

                    this.setToken(token);
                    this.setUser({
                        id: user.id,
                        username: user.Username || username,
                        role: user.Role || 'User',
                        email: user.Email
                    });
                    this.setClientId(has_access_client[0].client.id);

                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                console.error(err);
                return false;
            } finally {
                this.isLoading = false;
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },

        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token);
        },

        setUser(user: User) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        setClientId(clientId: string) {
            this.clientId = clientId;
            localStorage.setItem('clientId', clientId);
        }
    }
});
