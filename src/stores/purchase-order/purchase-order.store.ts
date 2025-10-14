// src/stores/purchase.store.ts
import { purchaseService } from '@/services/purchaseService';
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
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const debugFetch = async (params?: { status?: string; search?: string }) => {
        await fetchPurchaseOrders(params);
    };

    return {
        purchaseOrders,
        loading,
        fetchPurchaseOrders,
        debugFetch
    };
});
