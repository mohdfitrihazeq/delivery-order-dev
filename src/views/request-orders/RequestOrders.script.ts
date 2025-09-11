import BaseTab from '@/components/tab/BaseTab.vue';
import { Motion } from '@motionone/vue';
import { computed, defineComponent, ref } from 'vue';
import RoSummary from './components/summary/RoSummary.vue';
import RoTable from './components/table/RoTable.vue';

export default defineComponent({
    name: 'RequestOrders',
    components: {
        BaseTab,
        Motion,
        RoTable,
        RoSummary
    },
    setup() {
        const activeTab = ref('0');

        const tabItems = [
            { label: 'All Orders', value: '0' },
            { label: 'Approved', value: '1' },
            { label: 'Rejected', value: '2' }
        ];

        const orders = ref([
            {
                id: 1,
                roNumber: 'RO-001',
                requestedBy: 'John Doe',
                roDate: '2025-09-01',
                deliveryDate: '2025-09-05',
                totalAmount: '1200',
                budgetType: 'Capex',
                status: 'Approved',
                requestedAt: '2025-08-30'
            },
            {
                id: 2,
                roNumber: 'RO-002',
                requestedBy: 'Jane Smith',
                roDate: '2025-09-02',
                deliveryDate: '2025-09-06',
                totalAmount: '500',
                budgetType: 'Opex',
                status: 'Pending',
                requestedAt: '2025-08-31'
            }
        ]);

        const filteredOrders = computed(() => {
            if (activeTab.value === '0') return orders.value;
            if (activeTab.value === '1') return orders.value.filter((o) => o.status === 'Approved');
            if (activeTab.value === '2') return orders.value.filter((o) => o.status === 'Rejected');
            return [];
        });

        const pendingCount = computed(() => orders.value.filter((o) => o.status === 'Pending').length);
        const approvedCount = computed(() => orders.value.filter((o) => o.status === 'Approved').length);
        const totalValue = computed(() => orders.value.reduce((sum, o) => sum + Number(o.totalAmount || 0), 0));

        function getStatusSeverity(status: string) {
            if (status === 'Approved') return 'success';
            if (status === 'Rejected') return 'danger';
            if (status === 'Pending') return 'warning';
            return 'info';
        }

        return {
            activeTab,
            tabItems,
            orders,
            filteredOrders,
            getStatusSeverity,
            pendingCount,
            approvedCount,
            totalValue
        };
    }
});
