import axiosInstance from '@/services/backendAxiosInstance';
import type { BudgetChangeRequestResponse } from '@/types/budget.type';
import { showError } from '@/utils/showNotification.utils';

export interface GetBudgetParams {
    status?: string;
    search?: string;
}

const getBudgetChangeRequests = async (params?: GetBudgetParams): Promise<BudgetChangeRequestResponse> => {
    try {
        const response = await axiosInstance.get<BudgetChangeRequestResponse>('/budgetChange', { params });
        return response.data;
    } catch (error) {
        showError(error, 'Failed to fetch budget change request.');
        throw error;
    }
};

export const budgetService = {
    getBudgetChangeRequests
};
