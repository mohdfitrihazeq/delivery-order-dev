import axiosInstance from '@/services/backendAxiosInstance';
import type { DeliveryOrderResponse } from '@/types/delivery.type';
import { showError } from '@/utils/showError.utils';

export interface GetDeliveryOrderParams {
    status?: string;
    search?: string;
}

export const deliveryOrderService = {
    async getDeliveryOrders(params?: GetDeliveryOrderParams): Promise<DeliveryOrderResponse> {
        try {
            const response = await axiosInstance.get<DeliveryOrderResponse>('/deliveryOrder', { params });
            return response.data;
        } catch (error) {
            showError(error, 'Failed to fetch delivery orders.');
            throw error;
        }
    }
};
