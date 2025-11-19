import { showError } from '@/utils/showNotification.utils';
import axiosInstance from './backendAxiosInstance';

export interface GetBudgetsParams {
    projectId?: number;
    version?: number;
    page?: number;
    pageSize?: number;
}

export interface GetBudgetsResponse {
    success: boolean;
    message?: string;
    data: any[];
    pagination: {
        total: number;
        totalPages: number;
        page: number;
        pageSize: number;
    };
}

const getBudgets = async (params?: GetBudgetsParams): Promise<GetBudgetsResponse> => {
    try {
        const cleanParams = Object.entries(params || {}).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== '') acc[key] = value;
            return acc;
        }, {} as any);

        const response = await axiosInstance.get('/budget', { params: cleanParams });

        return {
            success: response.data.success,
            data: response.data.data || [],
            pagination: response.data.pagination || {
                total: response.data.pagination?.totalBudgetItems || 0,
                totalPages: response.data.pagination?.totalPages || 0,
                page: response.data.pagination?.page || 1,
                pageSize: response.data.pagination?.pageSize || 10
            }
        };
    } catch (error: any) {
        showError(error, 'Failed to fetch budgets.');
        return {
            success: false,
            data: [],
            pagination: { total: 0, totalPages: 0, page: 1, pageSize: 10 }
        };
    }
};

const getBudgetItems = async (params?: GetBudgetsParams): Promise<GetBudgetsResponse> => {
    try {
        const cleanParams = Object.entries(params || {}).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== '') acc[key] = value;
            return acc;
        }, {} as any);

        const response = await axiosInstance.get('/budget/items', { params: cleanParams });

        return {
            success: response.data.success,
            data: response.data.data || [],
            pagination: response.data.pagination || {
                total: response.data.pagination?.totalBudgetItems || 0,
                totalPages: response.data.pagination?.totalPages || 0,
                page: response.data.pagination?.page || 1,
                pageSize: response.data.pagination?.pageSize || 10
            }
        };
    } catch (error: any) {
        showError(error, 'Failed to fetch budget items.');
        return {
            success: false,
            data: [],
            pagination: { total: 0, totalPages: 0, page: 1, pageSize: 10 }
        };
    }
};

const getBudgetVersion = async (params?: GetBudgetsParams): Promise<GetBudgetsResponse> => {
    try {
        const response = await axiosInstance.get<GetBudgetsResponse>('/budget', { params });
        return response.data;
    } catch (error) {
        showError(error, 'Failed to fetch budget version list.');
        throw error;
    }
};

export const budgetService = {
    getBudgets,
    getBudgetItems,
    getBudgetVersion
};
