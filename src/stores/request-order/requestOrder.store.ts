import { requestOrderService } from '@/services/requestOrder.service';
import type { Order } from '@/types/request-order.type';
import { showError } from '@/utils/showError.utils';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const useRequestOrderStore = defineStore('requestOrder', () => {
    const orders = ref<Order[]>([]);
    const loading = ref(false);

    const filters = reactive({
        status: '',
        budgetType: '',
        search: '',
        startDate: '',
        endDate: ''
    });

    async function fetchOrders() {
        loading.value = true;
        try {
            const params: Record<string, any> = {};

            if (filters.status) params.status = filters.status;
            if (filters.budgetType) params.budgetType = filters.budgetType;
            if (filters.search) params.search = filters.search;
            if (filters.startDate) params.startDate = filters.startDate;
            if (filters.endDate) params.endDate = filters.endDate;

            const data = await requestOrderService.getRequestOrders(params);

            orders.value = data.map(
                (o: any): Order => ({
                    id: o.Id,
                    roNumber: o.DocNo,
                    requestedBy: o.CreatedBy,
                    roDate: o.RequestOrderDate,
                    deliveryDate: o.RequestOrderItems?.[0]?.DeliveryDate || '',
                    totalAmount: o.TotalAmount,
                    budgetType: o.PrType,
                    status: o.Status,
                    requestedAt: o.CreatedAt,
                    items: (o.RequestOrderItems || []).map((item: any) => ({
                        code: item.BudgetItemId || item.NonBudgetItemId || '',
                        description: item.Description,
                        uom: item.Uom,
                        qty: item.Quantity,
                        deliveryDate: item.DeliveryDate,
                        note: item.Notes
                    }))
                })
            );
        } catch (error) {
            showError(error, 'Failed to fetch request orders');
        } finally {
            loading.value = false;
        }
    }

    function clearFilters() {
        filters.status = '';
        filters.budgetType = '';
        filters.search = '';
        filters.startDate = '';
        filters.endDate = '';
    }

    return {
        orders,
        loading,
        filters,
        fetchOrders,
        clearFilters
    };
});
