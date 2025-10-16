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
            this.incompletedList = [];
            this.completedList = [];

            try {
                const [pendingRes, completedRes] = await Promise.all([deliveryOrderService.getDeliveryOrders({ status: 'Pending' }), deliveryOrderService.getDeliveryOrders({ status: 'Completed' })]);

                if (!pendingRes.success && !completedRes.success) {
                    showError(pendingRes.message || completedRes.message || 'Failed to fetch delivery orders.');
                    return;
                }

                if (pendingRes.success) this.incompletedList = pendingRes.data || [];
                if (completedRes.success) this.completedList = completedRes.data || [];
            } catch (error: any) {
                showError(error?.message || 'Failed to fetch delivery orders.');
            } finally {
                this.loading = false;
            }
        },

        async createDeliveryOrder(formData: FormData) {
            this.loading = true;
            try {
                const res = await deliveryOrderService.createDeliveryOrder(formData);
                if (!res.success) return showError(res.message || 'Failed to create delivery order.');

                showSuccess(res.message || 'Delivery order created successfully.');
                await this.fetchDeliveryOrders();
            } catch (error: any) {
                showError(error?.message || 'Failed to create delivery order.');
            } finally {
                this.loading = false;
            }
        },

        async getSingleDeliveryOrder(deliveryId: number) {
            this.loading = true;
            try {
                const res = await deliveryOrderService.getSingleDeliveryOrder(deliveryId);
                if (res.success && res.data) {
                    this.singleDelivery = res.data;
                } else {
                    showError(res.message || 'Delivery order not found.');
                    this.singleDelivery = null;
                }
            } catch (error: any) {
                showError(error?.message || 'Failed to fetch delivery order.');
                this.singleDelivery = null;
            } finally {
                this.loading = false;
            }
        }
    }
});
