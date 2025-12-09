export interface AuthUser {
    id: number;
    username: string;
    role: string;
    email?: string;
}

export interface ClientDetail {
    id: number;
}

export interface ClientData {
    client: ClientDetail;
}

export interface LoginResponse {
    token: string;
    user?: AuthUser;
    has_access_client: ClientData[];
    [key: string]: any;
}

export interface User {
    id: number;
    username: string;
    role: string;
    email?: string;
}

export interface AuthState {
    token: string | null;
    user: User | null;
    clientId: string | null;
    isLoading: boolean;
}
