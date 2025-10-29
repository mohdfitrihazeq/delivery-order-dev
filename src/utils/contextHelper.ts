export const getCurrentUser = (): { username: string; role: string } | null => {
    try {
        const stored = localStorage.getItem('user');
        if (stored) return JSON.parse(stored);
    } catch (error) {
        console.error('Error loading user from localStorage:', error);
    }
    return null;
};

export const getCurrentUsername = (): string | null => {
    const user = getCurrentUser();
    return user?.username || null;
};

export const getCurrentUserRole = (): string | null => {
    const user = getCurrentUser();
    return user?.role || null;
};

export const getCurrentProject = (): { company: string; name: string; ProjectId: number } | null => {
    try {
        const stored = localStorage.getItem('selectedProject');
        if (stored) return JSON.parse(stored);
    } catch (error) {
        console.error('Error loading project from localStorage:', error);
    }
    return null;
};

export const getCurrentProjectName = (): string => {
    return getCurrentProject()?.name || '';
};

export const getCurrentProjectId = (): number => {
    return getCurrentProject()?.ProjectId || 0;
};
