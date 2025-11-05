import type { CreateRequestOrderPayload, CreateRequestOrderResponse, GetRequestOrdersResponse, GetRequestOrdersParams, AttachmentItem } from '@/types/request-order.type';
import { showError } from '@/utils/showNotification.utils';
import axiosInstance from './backendAxiosInstance';
import { isRef, unref } from 'vue';

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

const approveRejectRequestOrder = async (id: number | string, status: 'Approved' | 'Rejected') => {
    try {
        const response = await axiosInstance.put(`/requestOrder/${id}/approve/${status}`);
        return { success: true, data: response.data };
    } catch (error: any) {
        showError(error, `Failed to ${status.toLowerCase()} request order.`);
        return { success: false, message: error.response?.data?.message || `Failed to ${status.toLowerCase()} request order` };
    }
};

const getRequestOrders = async (params?: GetRequestOrdersParams): Promise<GetRequestOrdersResponse> => {
    try {
        const cleanParams = Object.entries(params || {}).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {} as any);

        const response = await axiosInstance.get('/requestOrder', { params: cleanParams });

        const orders = response.data.data || [];
        const counts = {
            pending: orders.filter((o: any) => o.Status === 'Pending').length,
            approved: orders.filter((o: any) => o.Status === 'Approved').length,
            rejected: orders.filter((o: any) => o.Status === 'Rejected').length,
            totalValue: orders.reduce((sum: number, o: any) => sum + Number(o.TotalAmount || 0), 0)
        };

        return {
            success: response.data.success,
            data: orders,
            pagination: response.data.pagination || {
                total: 0,
                totalPages: 0,
                page: 1,
                pageSize: 10
            },
            counts
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
            },
            counts: { pending: 0, approved: 0, rejected: 0, totalValue: 0 }
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

const getAttachmentUrl = (file: AttachmentItem) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    return `${baseUrl}/${file.path.replace(/\\/g, '/')}`;
};

const previewAttachment = (file: AttachmentItem | any) => {
    const rawFile = isRef(file) ? unref(file) : file;
    const url = getAttachmentUrl(rawFile);
    console.log('Preview URL:', url);
    window.open(url, '_blank');
};

const downloadAttachment = async (file: AttachmentItem | any) => {
    const rawFile = isRef(file) ? unref(file) : file;
    try {
        const url = getAttachmentUrl(rawFile);
        const response = await axiosInstance.get(url, { responseType: 'blob' });

        const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', rawFile.filename);
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(blobUrl);
    } catch (error: any) {
        showError(error, `Failed to download attachment ${rawFile.filename}`);
    }
};

const getAttachmentsByROId = async (requestOrderId: number | string): Promise<AttachmentItem[]> => {
    try {
        const response = await axiosInstance.get(`/requestOrder/${requestOrderId}/attachments`);
        return response.data.data || [];
    } catch (error: any) {
        showError(error, `Failed to fetch attachments for RO ${requestOrderId}`);
        return [];
    }
};

export const requestOrderService = {
    createRequestOrder,
    updateRequestOrder,
    createRequestOrderDraft,
    deleteRequestOrder,
    getRequestOrders,
    getRequestOrderById,
    submitDraftRequestOrder,
    approveRejectRequestOrder,
    getAttachmentUrl,
    downloadAttachment,
    previewAttachment,
    getAttachmentsByROId
};
