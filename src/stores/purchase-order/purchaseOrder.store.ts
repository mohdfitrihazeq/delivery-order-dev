import { purchaseService } from '@/services/purchaseOrder.service';
import type { CreatePurchaseOrderPayload, PurchaseOrder, PurchaseOrderItem, PurchaseOrderResponse, PurchaseOrderView } from '@/types/purchase.type';
import { showError } from '@/utils/showNotification.utils';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const usePurchaseOrderStore = defineStore('purchaseOrder', () => {
    const purchaseOrders = ref<PurchaseOrder[]>([]);
    const selectedPurchaseOrder = ref<PurchaseOrder | null>(null);
    const loading = ref(false);

    const filters = reactive({
        status: '',
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

    const formatDate = (dateString: string | null): string => {
        if (!dateString || dateString === '1970-01-01T00:00:00.000Z') {
            return 'N/A';
        }
        try {
            return new Date(dateString).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        } catch {
            return 'N/A';
        }
    };

    async function fetchPurchaseOrders() {
        loading.value = true;
        try {
            const params = {
                status: filters.status || undefined,
                search: filters.search || undefined,
                startDate: filters.startDate || undefined,
                endDate: filters.endDate || undefined,
                page: pagination.page,
                pageSize: pagination.pageSize
            };

            const response: PurchaseOrderResponse = await purchaseService.getPurchaseOrders(params);

            if (!response.success) {
                showError(response.message || 'Failed to fetch purchase orders');
                return;
            }

            purchaseOrders.value = response.data.map((output: PurchaseOrder) => ({
                ...output,
                // Map backend fields to frontend-friendly names if needed
                poNumber: output.DocNo,
                totalAmount: output.TotalAmount || 0,
                supplierName: output.SupplierId?.toString() || '',
                status: output.Status,
                poDate: formatDate(output.PoDate),
                items: output.PurchaseOrderItems.map((item: PurchaseOrderItem) => ({
                    ...item,
                    qty: Number(item.Quantity),
                    code: item.ItemCode,
                    description: item.Name,
                    uom: item.Uom || '',
                    price: item.Price || 0,
                    amount: Number(item.Quantity) * (item.Price || 0),
                    deliveryDate: item.DeliveryDate || null,
                    note: item.RoDocNo || ''
                }))
            }));

            if (response.pagination) {
                pagination.total = response.pagination.total;
                pagination.totalPages = response.pagination.totalPages;
                pagination.page = response.pagination.page;
                pagination.pageSize = response.pagination.pageSize;
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                showError(error.message, 'Failed to fetch purchase orders');
            } else {
                showError('An unexpected error occurred', 'Failed to fetch purchase orders');
            }
        } finally {
            loading.value = false;
        }
    }

    async function fetchPurchaseOrderById(id: string): Promise<PurchaseOrderView | null> {
        loading.value = true;
        try {
            // NOTE: service returns PurchaseOrder directly
            const o = await purchaseService.getPurchaseOrderById(id);

            if (!o) return null;

            const order: PurchaseOrderView = {
                ...o,
                poNumber: o.DocNo, // alias for frontend
                poDate: formatDate(o.PoDate), // alias for frontend
                items: o.PurchaseOrderItems.map((item: PurchaseOrderItem) => ({
                    ...item,
                    code: item.ItemCode,
                    description: item.Name,
                    uom: item.Uom || '',
                    qty: Number(item.Quantity),
                    price: item.Price || 0,
                    amount: Number(item.Quantity) * (item.Price || 0),
                    deliveryDate: item.DeliveryDate || null,
                    note: item.RoDocNo || ''
                }))
            };

            selectedPurchaseOrder.value = order;
            return order;
        } catch (error: unknown) {
            if (error instanceof Error) {
                showError(error.message, 'Failed to fetch purchase order details');
            } else {
                showError('An unexpected error occurred', 'Failed to fetch purchase order details');
            }
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function updatePurchaseOrder(id: string, payload: CreatePurchaseOrderPayload, attachments?: File[]) {
        loading.value = true;
        try {
            const response = await purchaseService.updatePurchaseOrder(id, payload, attachments);
            return response;
        } catch (error: unknown) {
            if (error instanceof Error) {
                showError(error.message, 'Failed to update purchase order');
            } else {
                showError('An unexpected error occurred', 'Failed to update purchase order');
            }
            throw error;
        } finally {
            loading.value = false;
        }
    }

    function clearFilters() {
        filters.status = '';
        filters.search = '';
        filters.startDate = '';
        filters.endDate = '';
        pagination.page = 1;
        fetchPurchaseOrders();
    }

    function setPage(page: number) {
        pagination.page = page;
        fetchPurchaseOrders();
    }

    function setPageSize(pageSize: number) {
        pagination.pageSize = pageSize;
        pagination.page = 1;
        fetchPurchaseOrders();
    }

    return {
        purchaseOrders,
        selectedPurchaseOrder,
        loading,
        filters,
        pagination,
        fetchPurchaseOrders,
        fetchPurchaseOrderById,
        updatePurchaseOrder,
        clearFilters,
        setPage,
        setPageSize
    };
});
