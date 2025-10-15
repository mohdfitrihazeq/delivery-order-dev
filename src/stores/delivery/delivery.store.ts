import { deliveryOrderService } from '@/services/deliveryOrder.service';
import type { DeliveryOrder } from '@/types/delivery.type';
import { showError, showSuccess } from '@/utils/showNotification.utils';
import { defineStore } from 'pinia';

interface State {
    loading: boolean;
    incompletedList: DeliveryOrder[];
    completedList: DeliveryOrder[];
    search: string;
}

export const useDeliveryStore = defineStore('deliveryStore', {
    state: (): State => ({
        loading: false,
        incompletedList: [],
        completedList: [],
        search: ''
    }),

    actions: {
        async fetchDeliveryOrders() {
            this.loading = true;
            try {
                const [incompletedRes, completedRes] = await Promise.all([deliveryOrderService.getDeliveryOrders({ status: 'Pending', search: this.search }), deliveryOrderService.getDeliveryOrders({ status: 'Completed', search: this.search })]);

                this.incompletedList = incompletedRes.data || [];
                this.completedList = completedRes.data || [];
            } catch (error) {
                showError(error, 'Failed to fetch delivery orders.');
            } finally {
                this.loading = false;
            }
        },

        async handleSearch(value: string) {
            this.search = value;
            await this.fetchDeliveryOrders();
        },

        async createDeliveryOrder(formData: FormData) {
            this.loading = true;
            try {
                const response = await deliveryOrderService.createDeliveryOrder(formData);
                console.log('checking the response', response);
                const checkTrue = response.success;
                if (checkTrue) {
                    showSuccess(response.message || 'Delivery order created successfully.');
                    await this.fetchDeliveryOrders();
                    return true;
                } else {
                    showError(response.message || 'Failed to create delivery order.');
                    return false;
                }
            } catch (error: any) {
                showError(error, 'Failed to create delivery order.');
                return false;
            } finally {
                this.loading = false;
            }
        }
    }
});
