export interface AuthUser {
    username: string;
    role: string;
    email?: string;
}

export interface LoginResponse {
    token: string;
    user?: AuthUser;
    [key: string]: any;
}

export interface User {
    username: string;
    role: string;
    email?: string;
}

export interface AuthState {
    token: string | null;
    user: User | null;
    isLoading: boolean;
}
