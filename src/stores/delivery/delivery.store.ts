import { deliveryOrderService } from '@/services/deliveryOrder.service';
import type { DeliveryOrder } from '@/types/delivery.type';
import { showError, showSuccess } from '@/utils/showNotification.utils';
import { defineStore } from 'pinia';

interface State {
    loading: boolean;
    incompletedList: DeliveryOrder[];
    completedList: DeliveryOrder[];
    search: string;
    singleDelivery: DeliveryOrder | null;
}

export const useDeliveryStore = defineStore('deliveryStore', {
    state: (): State => ({
        loading: false,
        incompletedList: [],
        completedList: [],
        search: '',
        singleDelivery: null
    }),

    actions: {
        async fetchDeliveryOrders() {
            this.loading = true;
            try {
                const [incompletedRes, completedRes] = await Promise.all([
                    deliveryOrderService.getDeliveryOrders({
                        status: 'Pending',
                        search: this.search
                    }),
                    deliveryOrderService.getDeliveryOrders({
                        status: 'Completed',
                        search: this.search
                    })
                ]);

                if (!incompletedRes.success || !completedRes.success) {
                    showError('Failed to fetch delivery orders.');
                    return;
                }

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

                if (!response.success) {
                    showError(response.message || 'Failed to create delivery order.');
                    return false;
                }

                showSuccess(response.message || 'Delivery order created successfully.');
                await this.fetchDeliveryOrders();
                return true;
            } catch (error: any) {
                showError(error, 'Failed to create delivery order.');
                return false;
            } finally {
                this.loading = false;
            }
        },

        async getSingleDeliveryOrder(deliveryId: number) {
            this.loading = true;
            try {
                const response = await deliveryOrderService.getSingleDeliveryOrder(deliveryId);

                if (!response.success || !response.data) {
                    showError('Delivery order not found.');
                    this.singleDelivery = null;
                    return;
                }

                this.singleDelivery = response.data;
            } catch (error) {
                showError(error, 'Failed to fetch delivery order.');
                this.singleDelivery = null;
            } finally {
                this.loading = false;
            }
        }
    }
});
