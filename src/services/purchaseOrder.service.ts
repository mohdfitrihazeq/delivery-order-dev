import axiosInstance from '@/services/backendAxiosInstance';
import type { CreatePurchaseOrderPayload, CreatePurchaseOrderResponse, GetPurchaseOrderParams, PurchaseOrderResponse } from '@/types/purchase.type';
import { showError } from '@/utils/showNotification.utils';

function appendAttachmentsToFormData(formData: FormData, attachments?: Array<File>) {
    if (!attachments?.length) return;
    attachments.forEach((file) => formData.append('attachment', file, file.name));
}

const createPurchaseOrder = async (payload: CreatePurchaseOrderPayload, attachments?: Array<File>): Promise<CreatePurchaseOrderResponse> => {
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(payload));
        appendAttachmentsToFormData(formData, attachments);

        const response = await axiosInstance.post('/purchaseOrder', formData);
        return { success: true, data: response.data };
    } catch (error: any) {
        showError(error, 'Failed to create purchase order.');
        return { success: false, message: error.response?.data?.message || 'Failed to create purchase order' };
    }
};

const updatePurchaseOrder = async (id: string, payload: CreatePurchaseOrderPayload, attachments?: Array<File>): Promise<CreatePurchaseOrderResponse> => {
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(payload));
        appendAttachmentsToFormData(formData, attachments);

        const response = await axiosInstance.put(`/purchaseOrder/${id}`, formData);
        return { success: true, data: response.data };
    } catch (error: any) {
        showError(error, 'Failed to update purchase order.');
        return { success: false, message: error.response?.data?.message || 'Failed to update purchase order' };
    }
};

const deletePurchaseOrder = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/purchaseOrder/${id}`);
        return response.data;
    } catch (error: any) {
        showError(error, 'Failed to delete purchase order.');
        throw error;
    }
};

const approveRejectPurchaseOrder = async (id: number | string, status: 'Approved' | 'Rejected') => {
    try {
        const response = await axiosInstance.put(`/purchaseOrder/${id}/approve/${status}`);
        return { success: true, data: response.data };
    } catch (error: any) {
        showError(error, `Failed to ${status.toLowerCase()} purchase order.`);
        return { success: false, message: error.response?.data?.message || `Failed to ${status.toLowerCase()} purchase order` };
    }
};

const getPurchaseOrders = async (params?: GetPurchaseOrderParams): Promise<PurchaseOrderResponse> => {
    try {
        const cleanParams = Object.entries(params || {}).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {} as any);

        const response = await axiosInstance.get('/purchaseOrder', { params: cleanParams });

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
        showError(error, 'Failed to fetch purchase orders.');
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

const getPurchaseOrderById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/purchaseOrder/${id}`);
        return response.data;
    } catch (error: any) {
        showError(error, 'Failed to fetch purchase order details.');
        throw error;
    }
};

export const purchaseService = {
    createPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrderById,
    approveRejectPurchaseOrder
};
