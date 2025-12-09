import axiosInstance from '@/services/backendAxiosInstance';
import type { ProjectListResponse } from '@/types/project.type';
import { showError } from '@/utils/showNotification.utils';

function getAxiosErrorMessage(error: unknown, fallback = 'Failed to load project data'): string {
    if (typeof error === 'object' && error !== null) {
        const err = error as any;
        if (err.response?.data?.message) return err.response.data.message;
    }
    return fallback;
}

const getProjects = async (): Promise<ProjectListResponse> => {
    try {
        const response = await axiosInstance.get<ProjectListResponse>('/api/projects');
        return response.data;
    } catch (error) {
        const message = getAxiosErrorMessage(error);
        showError(error, message);
        return { success: false, data: [] };
    }
};

export const projectService = { getProjects };
