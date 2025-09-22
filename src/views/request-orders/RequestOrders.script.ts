import BaseTab from '@/components/tab/BaseTab.vue';
import { Motion } from '@motionone/vue';
import { computed, defineComponent, ref } from 'vue';
import type { Order } from '../../types/request-order.type';
import RoSummary from './components/summary/RoSummary.vue';
import RoTable from './components/table/RoTable.vue';

export default defineComponent({
    name: 'RequestOrders',
    components: { BaseTab, Motion, RoTable, RoSummary },
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
            selectedOrder,
            openOrderDetails,
            approveOrder,
            rejectOrder
        };
    }
});
