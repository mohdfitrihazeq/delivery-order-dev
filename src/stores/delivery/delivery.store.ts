// src/stores/delivery.store.ts
import { deliveryOrderService } from '@/services/deliveryOrder.service';
import type { DeliveryOrder } from '@/types/delivery.type';
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
                console.error('❌ fetchDeliveryOrders error:', error);
            } finally {
                this.loading = false;
            }
        },

        async handleSearch(value: string) {
            this.search = value;
            await this.fetchDeliveryOrders();
        }
    }
});
