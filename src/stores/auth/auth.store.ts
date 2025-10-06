import { authService } from '@/services/auth.service';
import type { AuthState, User } from '@/types/auth.type';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem('token') || null,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
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
                    const { token, user } = response.data || {};
                    if (!token) return false;

                    this.setToken(token);
                    this.setUser({
                        username: user.Username || username,
                        role: user.Role || 'User',
                        email: user.Email
                    });
                    return true;
                } else {
                    // Mock login
                    const mockUsers = [
                        { username: 'pm_user', password: 'pm123', role: 'PM' },
                        { username: 'site_user', password: 'site123', role: 'Site' },
                        { username: 'purchasing_user', password: 'purchase123', role: 'Purchasing' }
                    ];
                    const user = mockUsers.find((u) => u.username === username && u.password === password);
                    if (!user) return false;

                    // Set store manually
                    this.setToken('mock-token-' + user.username);
                    this.setUser({
                        username: user.username,
                        role: user.role
                    });
                    return true;
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
        }
    }
});
