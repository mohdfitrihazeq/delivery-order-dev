import BaseTab from '@/components/tab/BaseTab.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import type { TableColumn } from '@/types/table.type';
import { Motion } from '@motionone/vue';
import Badge from 'primevue/badge';
import { computed, defineComponent, ref } from 'vue';
import type { Order } from '../../types/request-order.type';
import EditRo from './components/modal/EditRo.vue';
import ViewRo from './components/modal/ViewRo.vue';
import RoSummary from './components/summary/RoSummary.vue';

export default defineComponent({
    name: 'RequestOrders',
    components: {
        BaseTab,
        Motion,
        ReusableTable,
        RoSummary,
        ViewRo,
        EditRo,
        Badge
    },
    setup() {
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

        const activeTab = ref(isPurchasingRole ? 'pending' : 'all');

        const orders = ref<Order[]>([
            {
                id: 1,
                roNumber: 'RO-001',
                requestedBy: 'John Doe',
                roDate: '2025-09-01',
                deliveryDate: '2025-09-05',
                totalAmount: '1200',
                budgetType: 'Budgeted',
                status: 'Approved',
                requestedAt: '2025-08-30',
                items: [
                    {
                        code: 'STL-001',
                        description: 'Steel reinforcement bars',
                        uom: 'kg',
                        qty: 100,
                        deliveryDate: '2025-09-05',
                        note: 'Grade 60 steel'
                    }
                ]
            },
            {
                id: 2,
                roNumber: 'RO-002',
                requestedBy: 'Jane Smith',
                roDate: '2025-09-02',
                deliveryDate: '2025-09-06',
                totalAmount: '500',
                budgetType: 'Unbudgeted',
                status: 'Pending',
                requestedAt: '2025-08-31',
                items: [
                    {
                        code: 'CEM-002',
                        description: 'Cement Portland Type I',
                        uom: 'Bag',
                        qty: 50,
                        deliveryDate: '2025-09-06',
                        note: 'High quality cement'
                    }
                ]
            },
            {
                id: 3,
                roNumber: 'RO-003',
                requestedBy: 'Michael Tan',
                roDate: '2025-09-03',
                deliveryDate: '2025-09-07',
                totalAmount: '750',
                budgetType: 'Budgeted',
                status: 'Rejected',
                requestedAt: '2025-09-01',
                items: [
                    {
                        code: 'LAB-001',
                        description: 'Excavation work',
                        uom: 'm³',
                        qty: 25,
                        deliveryDate: '2025-09-07',
                        note: 'Manual excavation'
                    }
                ]
            }
        ]);

        const tableColumns = computed<TableColumn[]>(() => {
            const baseColumns: TableColumn[] = [
                {
                    field: 'roNumber',
                    header: 'RO Number',
                    sortable: true
                },
                {
                    field: 'requestedBy',
                    header: 'Requested By',
                    sortable: true
                },
                {
                    field: 'roDate',
                    header: 'RO Date',
                    sortable: true
                },
                {
                    field: 'deliveryDate',
                    header: 'Delivery Date',
                    sortable: true
                },
                {
                    field: 'totalAmount',
                    header: 'Total Amount',
                    sortable: true,
                    bodySlot: 'totalAmount'
                },
                {
                    field: 'budgetType',
                    header: 'Budget Type',
                    sortable: true,
                    bodySlot: 'budgetType'
                },
                {
                    field: 'status',
                    header: 'Status',
                    sortable: true,
                    bodySlot: 'status'
                }
            ];

            const actionColumn: TableColumn = {
                field: 'actions',
                header: 'Actions',
                action: true,
                actions: ['view', 'edit']
            };

            return [...baseColumns, actionColumn];
        });

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
                ]
            },
            {
                type: 'select' as const,
                field: 'budgetType',
                placeholder: 'Filter by Budget Type',
                options: [
                    { label: 'All Budget Types', value: '' },
                    { label: 'Budgeted', value: 'Budgeted' },
                    { label: 'Unbudgeted', value: 'Unbudgeted' }
                ]
            }
        ]);

        const tabItems = computed(() => {
            if (isPurchasingRole) {
                return [
                    {
                        label: 'Pending',
                        value: 'pending',
                        badge: pendingCount.value
                    },
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

        const filteredOrders = computed(() => {
            switch (activeTab.value) {
                case 'pending':
                    return orders.value.filter((o) => o.status === 'Pending');
                case 'approved':
                    return orders.value.filter((o) => o.status === 'Approved');
                case 'rejected':
                    return orders.value.filter((o) => o.status === 'Rejected');
                case 'all':
                default:
                    return orders.value;
            }
        });

        const pendingCount = computed(() => orders.value.filter((o) => o.status === 'Pending').length);
        const approvedCount = computed(() => orders.value.filter((o) => o.status === 'Approved').length);
        const totalValue = computed(() => orders.value.reduce((sum, o) => sum + Number(o.totalAmount || 0), 0));

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

        const showDetailsModal = ref(false);
        const showEditModal = ref(false);
        const selectedOrder = ref<Order | null>(null);

        function openOrderDetails(order: Order): void {
            selectedOrder.value = order;
            showDetailsModal.value = true;
        }

        function approveOrder(order?: Order): void {
            const target = order || selectedOrder.value;
            if (target) {
                target.status = 'Approved';
            }
            showDetailsModal.value = false;
        }

        function rejectOrder(order?: Order): void {
            const target = order || selectedOrder.value;
            if (target) {
                target.status = 'Rejected';
            }
            showDetailsModal.value = false;
        }

        function editOrder(order: Order): void {
            selectedOrder.value = order;
            showEditModal.value = true;
        }

        function handleSaveOrder(formData: any): void {
            if (selectedOrder.value) {
                selectedOrder.value.requestedBy = formData.requestedBy;
                selectedOrder.value.roDate = formData.roDate;
                selectedOrder.value.deliveryDate = formData.deliveryDate;
                selectedOrder.value.totalAmount = formData.totalAmount.toString();
                selectedOrder.value.budgetType = formData.budgetType;
                selectedOrder.value.items = [...formData.items];

                console.log('Order saved:', selectedOrder.value);
            }
        }

        function handleApproveFromModal(order: Order): void {
            if (order) {
                order.status = 'Approved';
                console.log('Order approved:', order.roNumber);
            }
        }

        function handleRejectFromModal(order: Order): void {
            if (order) {
                order.status = 'Rejected';
                console.log('Order rejected:', order.roNumber);
            }
        }

        function handleActionClick(type: 'edit' | 'view' | 'delete', rowData: Order): void {
            console.log('Action clicked:', type, 'Row data:', rowData);
            switch (type) {
                case 'view':
                    openOrderDetails(rowData);
                    break;
                case 'edit':
                    editOrder(rowData);
                    break;
                default:
                    console.log('Unknown action type:', type);
                    break;
            }
        }

        function handleFilterChange(filters: Record<string, any>): void {
            console.log('Filters applied:', filters);
        }

        return {
            activeTab,
            tabItems,
            orders,
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
            approveOrder,
            rejectOrder,
            editOrder,
            handleSaveOrder,
            handleApproveFromModal,
            handleRejectFromModal,
            tableColumns,
            tableFilters,
            handleActionClick,
            handleFilterChange,
            open,
            close
        };
    }
});
