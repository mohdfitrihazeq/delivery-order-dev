// src/services/purchaseOrder.service.ts
import axiosInstance from '@/services/backendAxiosInstance';
import type { CreatePurchaseOrderPayload, CreatePurchaseOrderResponse, GetPurchaseOrderParams, PurchaseOrder, PurchaseOrderResponse } from '@/types/purchase.type';
import { showError } from '@/utils/showNotification.utils';

/**
 * Append file attachments to FormData
 */
function appendAttachmentsToFormData(formData: FormData, attachments?: File[]) {
    if (!attachments?.length) return;
    attachments.forEach((file) => formData.append('attachment', file, file.name));
}

/**
 * Helper to safely extract Axios error message
 */
function getAxiosErrorMessage(error: unknown, fallback = 'An error occurred'): string {
    // check if error is an object with response.data.message
    if (typeof error === 'object' && error !== null) {
        const err = error as { response?: { data?: { message?: string } } };
        if (err.response?.data?.message && typeof err.response.data.message === 'string') {
            return err.response.data.message;
        }
    }
    return fallback;
}

/**
 * Create a new purchase order
 */
const createPurchaseOrder = async (payload: CreatePurchaseOrderPayload, attachments?: File[]): Promise<CreatePurchaseOrderResponse> => {
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(payload));
        appendAttachmentsToFormData(formData, attachments);

        const response = await axiosInstance.post<PurchaseOrder>('/purchaseOrder', formData);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        const message = getAxiosErrorMessage(error, 'Failed to create purchase order');
        showError(error, message);
        return { success: false, message };
    }
};

/**
 * Update an existing purchase order
 */
const updatePurchaseOrder = async (id: string, payload: CreatePurchaseOrderPayload, attachments?: File[]): Promise<CreatePurchaseOrderResponse> => {
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(payload));
        appendAttachmentsToFormData(formData, attachments);

        const response = await axiosInstance.put<PurchaseOrder>(`/purchaseOrder/${id}`, formData);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        const message = getAxiosErrorMessage(error, 'Failed to update purchase order');
        showError(error, message);
        return { success: false, message };
    }
};

/**
 * Delete a purchase order
 */
const deletePurchaseOrder = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/purchaseOrder/${id}`);
    } catch (error: unknown) {
        const message = getAxiosErrorMessage(error, 'Failed to delete purchase order');
        showError(error, message);
        throw error;
    }
};

/**
 * Approve or reject a purchase order
 */
const approveRejectPurchaseOrder = async (id: number | string, status: 'Approved' | 'Rejected'): Promise<CreatePurchaseOrderResponse> => {
    try {
        const response = await axiosInstance.put<PurchaseOrder>(`/purchaseOrder/${id}/approve/${status}`);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        const message = getAxiosErrorMessage(error, `Failed to ${status.toLowerCase()} purchase order`);
        showError(error, message);
        return { success: false, message };
    }
};

/**
 * Fetch purchase orders with optional params
 */
const getPurchaseOrders = async (params?: GetPurchaseOrderParams): Promise<PurchaseOrderResponse> => {
    try {
        const cleanParams = Object.entries(params || {}).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                acc[key as keyof GetPurchaseOrderParams] = value;
            }
            return acc;
        }, {} as GetPurchaseOrderParams);

        const response = await axiosInstance.get<PurchaseOrderResponse>('/purchaseOrder', { params: cleanParams });

        return {
            success: response.data.success,
            data: response.data.data || [],
            pagination: response.data.pagination || { total: 0, totalPages: 0, page: 1, pageSize: 10 }
        };
    } catch (error: unknown) {
        const message = getAxiosErrorMessage(error, 'Failed to fetch purchase orders.');
        showError(error, message);
        return {
            success: false,
            data: [],
            pagination: { total: 0, totalPages: 0, page: 1, pageSize: 10 }
        };
    }
};

/**
 * Fetch a purchase order by ID
 */
const getPurchaseOrderById = async (id: string): Promise<PurchaseOrder> => {
    try {
        const response = await axiosInstance.get<PurchaseOrder>(`/purchaseOrder/${id}`);
        return response.data;
    } catch (error: unknown) {
        const message = getAxiosErrorMessage(error, 'Failed to fetch purchase order details.');
        showError(error, message);
        throw error;
    }
};

/**
 * Export service
 */
export const purchaseService = {
    createPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrderById,
    approveRejectPurchaseOrder
};
