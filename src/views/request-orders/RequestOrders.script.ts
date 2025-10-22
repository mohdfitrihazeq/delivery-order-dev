import BaseTab from '@/components/tab/BaseTab.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import { useRequestOrderStore } from '@/stores/request-order/requestOrder.store';
import type { TableColumn } from '@/types/table.type';
import { Motion } from '@motionone/vue';
import Badge from 'primevue/badge';
import { computed, defineComponent, ref, watch } from 'vue';
import type { Order } from '../../types/request-order.type';
import EditRo from './components/modal/EditRo.vue';
import ViewDraftRo from './components/modal/ViewDraftRo.vue';
import ViewRo from './components/modal/ViewRo.vue';
import RoSummary from './components/summary/RoSummary.vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { requestOrderService } from '@/services/requestOrder.service';
import { showError } from '@/utils/showError.utils';
export default defineComponent({
    name: 'RequestOrders',
    components: {
        BaseTab,
        Motion,
        ReusableTable,
        RoSummary,
        ViewRo,
        EditRo,
        Badge,
        ViewDraftRo
    },
    setup() {
        const confirm = useConfirm();
        const toast = useToast();
        const store = useRequestOrderStore();

        const draftCount = ref(0);
        const showDraftModal = ref(false);
        const showDetailsModal = ref(false);
        const showEditModal = ref(false);
        const selectedOrder = ref<Order | null>(null);

        // User role
        const user = localStorage.getItem('user');
        let userRole = '';
        if (user) {
            try {
                const parsed = JSON.parse(user);
                userRole = parsed.role || '';
            } catch {
                userRole = '';
            }
        }
        const isPurchasingRole = userRole.toLowerCase() === 'purchasing';

        // Tabs
        const activeTab = ref(isPurchasingRole ? 'pending' : 'all');

        const pendingCount = computed(() => store.orders.filter((o) => o.status === 'Pending').length);
        const approvedCount = computed(() => store.orders.filter((o) => o.status === 'Approved').length);
        const totalValue = computed(() => store.orders.reduce((sum, o) => sum + Number(o.totalAmount || 0), 0));

        const tabItems = computed(() => {
            if (isPurchasingRole) {
                return [
                    { label: 'Pending', value: 'pending', badge: pendingCount.value },
                    { label: 'All Orders', value: 'all' },
                    { label: 'Approved', value: 'approved' },
                    { label: 'Rejected', value: 'rejected' }
                ];
            } else {
                return [
                    { label: 'All Orders', value: 'all' },
                    { label: 'Approved', value: 'approved' },
                    { label: 'Rejected', value: 'rejected' }
                ];
            }
        });

        // Fetch orders on mount and whenever filters change
        store.fetchOrders();
        watch(activeTab, (tab) => {
            store.filters.status = tab === 'all' ? '' : tab.charAt(0).toUpperCase() + tab.slice(1);
            store.pagination.page = 1;
            store.fetchOrders();
        });

        const startingIndex = computed(() => {
            return (store.pagination.page - 1) * store.pagination.pageSize;
        });

        const filteredOrders = computed(() =>
            store.orders.map((order, i) => ({
                ...order,
                rowIndex: i + 1
            }))
        );

        // Table config
        const tableColumns = computed<TableColumn[]>(() => [
            { field: 'rowIndex', header: '#', sortable: true },
            { field: 'roNumber', header: 'RO Number', sortable: true },
            { field: 'requestedBy', header: 'Requested By', sortable: true },
            { field: 'roDate', header: 'RO Date', sortable: true },
            { field: 'deliveryDate', header: 'Delivery Date', sortable: true },
            { field: 'totalAmount', header: 'Total Amount', sortable: true, bodySlot: 'totalAmount' },
            { field: 'budgetType', header: 'Budget Type', sortable: true, bodySlot: 'budgetType' },
            { field: 'status', header: 'Status', sortable: true, bodySlot: 'status' },
            { field: 'actions', header: 'Actions', action: true, actions: ['view', 'edit', 'delete'] }
        ]);

        const tableFilters = computed(() => [
            {
                type: 'select' as const,
                field: 'status',
                placeholder: 'Filter by Status',
                options: [
                    { label: 'All Statuses', value: '' },
                    { label: 'Pending', value: 'Pending' },
                    { label: 'Approved', value: 'Approved' },
                    { label: 'Rejected', value: 'Rejected' }
                ],
                model: store.filters.status
            },
            {
                type: 'select' as const,
                field: 'budgetType',
                placeholder: 'Filter by Budget Type',
                options: [
                    { label: 'All Budget Types', value: '' },
                    { label: 'Budgeted', value: 'Budgeted' },
                    { label: 'Unbudgeted', value: 'Unbudgeted' }
                ],
                model: store.filters.budgetType
            }
        ]);

        function getStatusSeverity(status: string): string {
            switch (status) {
                case 'Approved':
                    return 'success';
                case 'Rejected':
                    return 'danger';
                case 'Pending':
                    return 'warning';
                default:
                    return 'info';
            }
        }

        async function openOrderDetails(order: Order): Promise<void> {
            const fullOrder = await store.fetchOrderById(String(order.id));
            if (fullOrder) {
                selectedOrder.value = fullOrder;
                showDetailsModal.value = true;
            }
        }

        function editOrder(order: Order): void {
            showEditModal.value = true;
            selectedOrder.value = null;

            store
                .fetchOrderById(String(order.id))
                .then((fullOrder) => {
                    if (fullOrder) {
                        selectedOrder.value = fullOrder;
                    }
                })
                .catch((err) => {
                    console.error('Failed to fetch full order', err);
                });
        }

        async function deleteOrder(order: Order): Promise<void> {
            confirm.require({
                message: `Are you sure you want to delete order ${order.roNumber}?`,
                header: 'Confirm Delete',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger',
                rejectClass: 'p-button-secondary',
                acceptLabel: 'Yes, Delete',
                rejectLabel: 'Cancel',

                accept: async () => {
                    try {
                        await requestOrderService.deleteRequestOrder(order.id);

                        toast.add({
                            severity: 'success',
                            summary: 'Order Deleted',
                            detail: `Order ${order.id} deleted successfully.`,
                            life: 3000
                        });

                        await store.fetchOrders(); // refresh list
                    } catch (error) {
                        showError(error, `Failed to delete order ${order.id}.`);
                    } finally {
                        confirm.close();
                    }
                },

                reject: () => {
                    toast.add({
                        severity: 'info',
                        summary: 'Cancelled',
                        detail: 'Order deletion cancelled.',
                        life: 2500
                    });
                    confirm.close();
                }
            });
        }

        function handleSaveOrder(formData: any): void {
            if (selectedOrder.value) {
                Object.assign(selectedOrder.value, formData);
                store.fetchOrders();
                showEditModal.value = false;
            }
        }

        function handleApproveFromModal(order: Order): void {
            if (order) {
                order.status = 'Approved';
                store.fetchOrders();
                showDetailsModal.value = false;
            }
        }

        function handleRejectFromModal(order: Order): void {
            if (order) {
                order.status = 'Rejected';
                store.fetchOrders();
                showDetailsModal.value = false;
            }
        }

        function handleActionClick(type: 'edit' | 'view' | 'delete', rowData: Order): void {
            switch (type) {
                case 'view':
                    openOrderDetails(rowData);
                    break;
                case 'edit':
                    editOrder(rowData);
                    break;
                case 'delete':
                    deleteOrder(rowData);
                    break;
            }
        }

        function handleFilterChange(filters: Record<string, any>): void {
            store.filters.status = filters.status ?? '';
            store.filters.budgetType = filters.budgetType ?? '';
            store.filters.search = filters.search ?? '';
            store.filters.startDate = filters.startDate ?? '';
            store.filters.endDate = filters.endDate ?? '';
            store.pagination.page = 1;
            store.fetchOrders();
        }

        function handlePageChange(page: number): void {
            store.setPage(page);
        }

        function handlePageSizeChange(pageSize: number): void {
            store.setPageSize(pageSize);
        }

        return {
            activeTab,
            tabItems,
            store,
            filteredOrders,
            getStatusSeverity,
            pendingCount,
            approvedCount,
            totalValue,
            isPurchasingRole,
            showDetailsModal,
            showEditModal,
            selectedOrder,
            openOrderDetails,
            editOrder,
            handleSaveOrder,
            handleApproveFromModal,
            handleRejectFromModal,
            tableColumns,
            tableFilters,
            handleActionClick,
            handleFilterChange,
            showDraftModal,
            draftCount,
            confirm: useConfirm(),
            toast: useToast(),
            handlePageChange,
            handlePageSizeChange
        };
    }
});
