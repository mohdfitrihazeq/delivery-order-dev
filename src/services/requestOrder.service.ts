import type { CreateRequestOrderPayload, CreateRequestOrderResponse } from '@/types/request-order.type';
import { showError } from '@/utils/showError.utils';
import axiosInstance from './backendAxiosInstance';

const createRequestOrder = async (payload: CreateRequestOrderPayload, attachments?: File[]): Promise<CreateRequestOrderResponse> => {
    try {
        const formData = new FormData();

        const cleanPayload = JSON.parse(JSON.stringify(payload, (_, value) => (value === undefined ? null : value)));

        formData.append('data', JSON.stringify(cleanPayload));

        if (attachments && attachments.length > 0) {
            attachments.forEach((file) => {
                formData.append('attachment', file);
            });
        }

        const response = await axiosInstance.post('/requestOrder', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return { success: true, data: response.data };
    } catch (error: any) {
        console.error('Request Order Service Error:', error.response?.data || error);
        showError(error, 'Failed to create request order.');
        return {
            success: false,
            message: error.response?.data?.message || error.response?.data?.error || 'Failed to create request order'
        };
    }
};

const getRequestOrders = async (params?: Record<string, any>): Promise<any[]> => {
    try {
        const response = await axiosInstance.get('/requestOrder', { params });
        return response.data.data;
    } catch (error) {
        showError(error, 'Failed to fetch request orders.');
        throw error;
    }
};

const getRequestOrderById = async (id: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/requestOrder/${id}`);
        return response.data;
    } catch (error) {
        showError(error, 'Failed to fetch request order details.');
        throw error;
    }
};

export const requestOrderService = {
    createRequestOrder,
    getRequestOrders,
    getRequestOrderById
};
