import { showError } from '@/utils/showError.utils';
import apiClient from './api.client';

export interface CreateRequestOrderPayload {
    roNumber: string;
    budgetType: string;
    roDate: string;
    items: any[];
    overallRemark?: string;
    attachments?: File[];
}

const createRequestOrder = async (payload: CreateRequestOrderPayload) => {
    try {
        const formData = new FormData();

        // Append basic fields
        formData.append('roNumber', payload.roNumber);
        formData.append('budgetType', payload.budgetType);
        formData.append('roDate', payload.roDate);
        formData.append('items', JSON.stringify(payload.items));

        if (payload.overallRemark) {
            formData.append('overallRemark', payload.overallRemark);
        }

        // Append files
        if (payload.attachments) {
            payload.attachments.forEach((file, index) => {
                formData.append(`attachments[${index}]`, file);
            });
        }

        const response = await apiClient.post('/request-orders', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        showError(error, 'Failed to create request order.');
        throw error;
    }
};

export const requestOrderService = {
    createRequestOrder
};
