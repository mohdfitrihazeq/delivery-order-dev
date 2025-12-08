import axiosInstance from '@/services/backendAxiosInstance';
import { BudgetResponse } from '@/types/budget.type';
import type { BudgetChangeRequestPayload, BudgetChangeRequestResponse, SingleBudgetChangeRequestResponse } from '@/types/budgetChangeRequest.type';
import { showError } from '@/utils/showNotification.utils';

export interface GetBudgetParams {
    status?: string;
    page?: number;
    pageSize?: number;
    version?: string | undefined;
    projectId?: number;
}

export interface GetBudgetListParams {
    page?: number;
    pageSize?: number;
    budgetId?: number;
}

// BUDGET CHANGE REQUEST
const getBudgetChangeRequests = async (params?: GetBudgetParams): Promise<BudgetChangeRequestResponse> => {
    try {
        const response = await axiosInstance.get<BudgetChangeRequestResponse>('/budgetChange', { params });
        return response.data;
    } catch (error) {
        showError(error, 'Failed to fetch budget change request.');
        throw error;
    }
};

const createBudgetChangeRequest = async (payload: BudgetChangeRequestPayload, attachments?: File[]): Promise<BudgetChangeRequestResponse> => {
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(payload));

        if (attachments && attachments.length > 0) {
            attachments.forEach((file) => formData.append('attachment', file, file.name));
        }

        const response = await axiosInstance.post('/budgetChange', formData);

        return { success: true, data: response.data };
    } catch (error: any) {
        console.error('Budget Change Request Service Error:', error.response?.data || error);
        showError(error, 'Failed to create budget change request.');
        return {
            success: false,
            message: error.response?.data?.message || error.response?.data?.error || 'Failed to create budget change request'
        };
    }
};

const getSingleBudgetChangeRequest = async (bcrId: number): Promise<SingleBudgetChangeRequestResponse> => {
    try {
        const response = await axiosInstance.get<SingleBudgetChangeRequestResponse>(`/budgetChange/${bcrId}`);
        return response.data;
    } catch (error) {
        showError(error, 'Failed to fetch single by budget change request.');
        throw error;
    }
};

const editBudgetChangeRequest = async (payload: BudgetChangeRequestPayload, bcrId: number, attachments?: File[]): Promise<BudgetChangeRequestResponse> => {
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(payload));

        if (attachments && attachments.length > 0) {
            attachments.forEach((file) => formData.append('attachment', file, file.name));
        }

        const response = await axiosInstance.put(`/budgetChange/${bcrId}`, formData);

        return { success: true, data: response.data };
    } catch (error: any) {
        console.error('Budget Change Request Service Error:', error.response?.data || error);
        showError(error, 'Failed to update budget change request.');
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to update budget change request'
        };
    }
};

const getBudget = async (params?: GetBudgetListParams): Promise<BudgetResponse> => {
    try {
        const response = await axiosInstance.get<BudgetResponse>('/budget/items', { params });
        return response.data;
    } catch (error) {
        showError(error, 'Failed to fetch budget list.');
        throw error;
    }
};

export const budgetService = {
    getBudgetChangeRequests,
    createBudgetChangeRequest,
    getSingleBudgetChangeRequest,
    editBudgetChangeRequest,
    getBudget
};
