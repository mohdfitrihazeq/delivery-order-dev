import { purchaseService } from '@/services/purchaseOrder.service';
import type { PurchaseOrder } from '@/types/purchase.type';
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
        } catch (error) {
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

            const response = await purchaseService.getPurchaseOrders(params);

            purchaseOrders.value = response.data.map(
                (output: any): PurchaseOrder => ({
                    id: output.Id,
                    poNumber: output.DocNo,
                    supplierName: output.SupplierName,
                    createdBy: output.CreatedBy,
                    poDate: formatDate(output.PoDate),
                    totalAmount: output.TotalAmount,
                    status: output.Status,
                    createdAt: output.CreatedAt,
                    items: (output.PurchaseOrderItems || []).map((item: any) => ({
                        code: item.ItemCode || '',
                        description: item.Description || '',
                        uom: item.Unit || '',
                        qty: Number(item.Quantity),
                        price: item.UnitPrice || 0,
                        amount: item.Amount || 0,
                        deliveryDate: item.DeliveryDate || null,
                        note: item.Notes || ''
                    }))
                })
            );

            if (response.pagination) {
                pagination.total = response.pagination.total;
                pagination.totalPages = response.pagination.totalPages;
                pagination.page = response.pagination.page;
                pagination.pageSize = response.pagination.pageSize;
            }
        } catch (error) {
            showError(error, 'Failed to fetch purchase orders');
        } finally {
            loading.value = false;
        }
    }

    async function fetchPurchaseOrderById(id: string): Promise<PurchaseOrder | null> {
        loading.value = true;
        try {
            const response = await purchaseService.getPurchaseOrderById(id);
            if (!response?.data) return null;

            const o = response.data;
            const parsedAttachments = o.Attachment ? JSON.parse(o.Attachment) : [];

            const order: PurchaseOrder = {
                id: o.Id,
                poNumber: o.DocNo,
                supplierName: o.SupplierName || 'N/A',
                createdBy: o.CreatedBy,
                poDate: formatDate(o.PoDate),
                totalAmount: o.TotalAmount,
                status: o.Status || 'Pending',
                createdAt: o.CreatedAt,
                items: (o.purchaseorderitems || []).map((item: any) => ({
                    code: item.ItemCode || '',
                    description: item.Name || '',
                    uom: item.Uom || '',
                    qty: Number(item.Quantity),
                    price: item.Price || 0,
                    amount: Number(item.Quantity) * (item.Price || 0),
                    deliveryDate: item.DeliveryDate || null,
                    note: item.Notes || '',
                    roNumber: item.RoDocNo || ''
                })),
                attachments: parsedAttachments
            };

            selectedPurchaseOrder.value = order;
            return order;
        } catch (error) {
            showError(error, 'Failed to fetch purchase order details');
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function updatePurchaseOrder(id: string, payload: any, attachments?: File[]) {
        loading.value = true;
        try {
            const response = await purchaseService.updatePurchaseOrder(id, payload, attachments);
            return response;
        } catch (error) {
            showError(error, 'Failed to update purchase order');
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
