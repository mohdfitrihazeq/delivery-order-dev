import { requestOrderService } from '@/services/requestOrder.service';
import type { Order } from '@/types/request-order.type';
import { showError } from '@/utils/showNotification.utils';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { formatDate, formatDateTime } from '@/utils/dateHelper';

export const useRequestOrderStore = defineStore('requestOrder', () => {
    const orders = ref<Order[]>([]);
    const selectedOrder = ref<Order | null>(null);
    const loading = ref(false);

    const filters = reactive({
        status: '',
        budgetType: '',
        search: '',
        startDate: '',
        endDate: ''
    });

    const pagination = reactive({
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0
    });
    const totalCounts = ref({ pending: 0, approved: 0, rejected: 0, totalValue: 0 });

    async function fetchOrders() {
        loading.value = true;
        try {
            const params = {
                status: filters.status || undefined,
                budgetType: filters.budgetType || undefined,
                search: filters.search || undefined,
                startDate: filters.startDate || undefined,
                endDate: filters.endDate || undefined,
                page: pagination.page,
                pageSize: pagination.pageSize
            };

            const response = await requestOrderService.getRequestOrders(params);

            orders.value = response.data.map(
                (output: any): Order => ({
                    id: output.Id,
                    roNumber: output.DocNo,
                    requestedBy: output.CreatedBy,
                    roDate: formatDate(output.RequestOrderDate),
                    deliveryDate: formatDate(output.RequestOrderItems?.[0]?.DeliveryDate || ''),
                    totalAmount: output.TotalAmount,
                    budgetType: output.PrType,
                    status: output.Status,
                    requestedAt: formatDateTime(output.CreatedAt),
                    items: (output.RequestOrderItems || []).map((item: any) => ({
                        code: item.BudgetItemId || item.NonBudgetItemId || '',
                        description: item.Description,
                        uom: item.Uom,
                        qty: item.Quantity,
                        deliveryDate: formatDate(item.DeliveryDate),
                        note: item.Notes
                    }))
                })
            );

            if (response.pagination) {
                pagination.total = response.pagination.total;
                pagination.totalPages = response.pagination.totalPages;
                pagination.page = response.pagination.page;
                pagination.pageSize = response.pagination.pageSize;
            }
            totalCounts.value = response.counts || { pending: 0, approved: 0, rejected: 0, totalValue: 0 };
        } catch (error) {
            showError(error, 'Failed to fetch request orders');
        } finally {
            loading.value = false;
        }
    }

    async function fetchOrderById(id: string): Promise<Order | null> {
        loading.value = true;
        try {
            const response = await requestOrderService.getRequestOrderById(id);
            if (!response?.data) return null;
            const o = response.data;
            const parsedAttachments = o.Attachment ? JSON.parse(o.Attachment) : [];

            const order: Order = {
                id: o.Id,
                roNumber: o.DocNo,
                requestedBy: o.CreatedBy,
                roDate: formatDate(o.RequestOrderDate),
                deliveryDate: formatDate(o.requestorderitems?.[0]?.DeliveryDate),
                requestedAt: formatDateTime(o.CreatedAt),
                items: (o.requestorderitems || o.RequestOrderItems || []).map((item: any) => ({
                    code: item.ItemCode || '',
                    description: item.Description || '',
                    uom: item.Unit || '',
                    qty: Number(item.Quantity),
                    deliveryDate: formatDate(item.DeliveryDate),
                    note: item.Notes || '',
                    remark: item.Remark || '',
                    budgetItemId: item.BudgetItemId ?? null,
                    nonBudgetItemId: item.NonBudgetItemId ?? null
                })),
                debtorId: o.DebtorId ?? null,
                remark: o.Remark ?? '',
                terms: o.Terms ?? 'Net 30',
                refDoc: o.RefDoc ?? 'RQ-001',
                currency: o.Currency ?? 'MYR',
                attachments: parsedAttachments,
                budgetType: o.PrType === 'Budgeted' ? 'Budget' : 'NonBudget'
            };

            selectedOrder.value = order;
            return order;
        } catch (error) {
            showError(error, 'Failed to fetch request order details');
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function updateOrder(id: string, payload: any, attachments?: File[]) {
        loading.value = true;
        try {
            const response = await requestOrderService.updateRequestOrder(id, payload, attachments);
            return response;
        } catch (error) {
            showError(error, 'Failed to update request order');
            throw error;
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
        pagination.page = 1;
        fetchOrders();
    }

    function setPage(page: number) {
        pagination.page = page;
        fetchOrders();
    }

    function setPageSize(pageSize: number) {
        pagination.pageSize = pageSize;
        pagination.page = 1; // Reset to first page when changing page size
        fetchOrders();
    }

    return {
        orders,
        selectedOrder,
        loading,
        filters,
        pagination,
        fetchOrders,
        fetchOrderById,
        clearFilters,
        updateOrder,
        setPage,
        setPageSize,
        totalCounts
    };
});
