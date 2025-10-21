import { purchaseService } from '@/services/purchaseOrder.service';
import type { PurchaseOrder } from '@/types/purchase.type';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePurchaseOrderStore = defineStore('purchaseOrder', () => {
    const purchaseOrders = ref<PurchaseOrder[]>([]);
    const loading = ref(false);

    const fetchPurchaseOrders = async (params?: { status?: string; search?: string }) => {
        loading.value = true;
        try {
            const res = await purchaseService.getPurchaseOrders(params);
            purchaseOrders.value = res.data ?? [];
            return purchaseOrders.value;
        } catch (err) {
            console.error('Failed to fetch purchase orders:', err);
            purchaseOrders.value = [];
            return [];
        } finally {
            loading.value = false;
        }
    };

    return {
        purchaseOrders,
        loading,
        fetchPurchaseOrders
    };
});
