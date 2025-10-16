import axiosInstance from '@/services/backendAxiosInstance';
import type { DeliveryOrderResponse } from '@/types/delivery.type';
import { showError } from '@/utils/showNotification.utils';

export interface GetDeliveryOrderParams {
    status?: string;
    search?: string;
}

const getDeliveryOrders = async (params?: GetDeliveryOrderParams): Promise<DeliveryOrderResponse> => {
    try {
        const response = await axiosInstance.get<DeliveryOrderResponse>('/deliveryOrder', { params });
        return response.data;
    } catch (error) {
        showError(error, 'Failed to fetch delivery orders.');
        throw error;
    }
};

const createDeliveryOrder = async (formData: FormData): Promise<DeliveryOrderResponse> => {
    try {
        const response = await axiosInstance.post('/deliveryOrder', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error: any) {
        showError(error, 'Failed to create delivery order.');
        return {
            success: false,
            data: [],
            message: error.response?.data?.message || error.response?.data?.error || 'Failed to create delivery order'
        };
    }
};

export const deliveryOrderService = {
    getDeliveryOrders,
    createDeliveryOrder
};
