import type { CreateRequestOrderPayload, CreateRequestOrderResponse } from '@/types/request-order.type';
import { showError } from '@/utils/showNotification.utils';
import axiosInstance from './backendAxiosInstance';

interface AttachmentItem {
    filename: string;
    path: string;
    size?: number;
    type?: string;
}

// Helper to append attachments to FormData
function appendAttachmentsToFormData(formData: FormData, attachments?: Array<File | AttachmentItem>) {
    if (!attachments?.length) return;

    // Append only new File objects
    attachments.filter((att) => att instanceof File).forEach((file) => formData.append('attachment', file, file.name));

    // Append existing attachments as JSON if any
    const existing = attachments.filter((att) => !(att instanceof File));
    if (existing.length) {
        formData.append('existingAttachments', JSON.stringify(existing));
    }
}

const createRequestOrder = async (payload: CreateRequestOrderPayload, attachments?: Array<File | AttachmentItem>): Promise<CreateRequestOrderResponse> => {
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(payload));
        appendAttachmentsToFormData(formData, attachments);

        const response = await axiosInstance.post('/requestOrder', formData);
        return { success: true, data: response.data };
    } catch (error: any) {
        showError(error, 'Failed to create request order.');
        return { success: false, message: error.response?.data?.message || 'Failed to create request order' };
    }
};

const updateRequestOrder = async (id: string, payload: CreateRequestOrderPayload, attachments?: Array<File | AttachmentItem>): Promise<CreateRequestOrderResponse> => {
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(payload));
        appendAttachmentsToFormData(formData, attachments);

        const response = await axiosInstance.put(`/requestOrder/${id}`, formData);
        return { success: true, data: response.data };
    } catch (error: any) {
        showError(error, 'Failed to update request order.');
        return { success: false, message: error.response?.data?.message || 'Failed to update request order' };
    }
};

const createRequestOrderDraft = async (payload: CreateRequestOrderPayload, attachments?: Array<File | AttachmentItem>) => {
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(payload));
        appendAttachmentsToFormData(formData, attachments);

        const response = await axiosInstance.post('/requestOrder/Draft', formData);
        return { success: true, data: response.data };
    } catch (error: any) {
        showError(error, 'Failed to save request order as draft.');
        return { success: false, message: error.response?.data?.message || 'Failed to save request order as draft' };
    }
};

const submitDraftRequestOrder = async (draftId: string, payload: CreateRequestOrderPayload, attachments?: Array<File | AttachmentItem>): Promise<CreateRequestOrderResponse> => {
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(payload));
        appendAttachmentsToFormData(formData, attachments);

        const response = await axiosInstance.put(`/requestOrder/${draftId}/Draft`, formData);
        return { success: true, data: response.data };
    } catch (error: any) {
        showError(error, 'Failed to submit draft request order.');
        return { success: false, message: error.response?.data?.message || 'Failed to submit draft request order' };
    }
};

const deleteRequestOrder = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/requestOrder/${id}`);
        return response.data;
    } catch (error: any) {
        showError(error, 'Failed to delete request order.');
        throw error;
    }
};

interface GetRequestOrdersParams {
    projectId?: number;
    status?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    pageSize?: number;
}

interface GetRequestOrdersResponse {
    success: boolean;
    data: any[];
    pagination: {
        total: number;
        totalPages: number;
        page: number;
        pageSize: number;
    };
}

const getRequestOrders = async (params?: GetRequestOrdersParams): Promise<GetRequestOrdersResponse> => {
    try {
        const cleanParams = Object.entries(params || {}).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {} as any);

        const response = await axiosInstance.get('/requestOrder', { params: cleanParams });

        return {
            success: response.data.success,
            data: response.data.data || [],
            pagination: response.data.pagination || {
                total: 0,
                totalPages: 0,
                page: 1,
                pageSize: 10
            }
        };
    } catch (error: any) {
        showError(error, 'Failed to fetch request orders.');
        return {
            success: false,
            data: [],
            pagination: {
                total: 0,
                totalPages: 0,
                page: 1,
                pageSize: 10
            }
        };
    }
};

const getRequestOrderById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/requestOrder/${id}`);
        return response.data;
    } catch (error: any) {
        showError(error, 'Failed to fetch request order details.');
        throw error;
    }
};

export const requestOrderService = {
    createRequestOrder,
    updateRequestOrder,
    createRequestOrderDraft,
    deleteRequestOrder,
    getRequestOrders,
    getRequestOrderById,
    submitDraftRequestOrder
};
