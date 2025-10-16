import axiosInstance from '@/services/backendAxiosInstance';
import type { PurchaseOrderResponse } from '@/types/purchase.type';
import { showError } from '@/utils/showNotification.utils';

export interface GetPurchaseOrderParams {
    status?: string;
    search?: string;
}

export const purchaseService = {
    async getPurchaseOrders(params?: GetPurchaseOrderParams): Promise<PurchaseOrderResponse> {
        try {
            const response = await axiosInstance.get<PurchaseOrderResponse>('/purchaseOrder', { params });
            return response.data;
        } catch (error) {
            showError(error, 'Failed to fetch purchase orders.');
            return { success: false, data: [] };
        }
    }
};
