import BaseTab from '@/components/tab/BaseTab.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import Tag from 'primevue/tag';
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'ViewDetailsPO',
    components: { Tag, BaseTab, ReusableTable },
    setup() {
        const route = useRoute();

        const poNumber = ref(route.params.poNumber || '');
        const supplier = ref(route.query.supplier || '');
        const totalAmount = ref(route.query.totalAmount || '');
        const date = ref(route.query.date || '');
        const status = ref(route.query.status || '');

        const project = ref<{ company: string; name: string } | null>(JSON.parse(localStorage.getItem('selectedProject') || 'null'));

        const deliveryDate = ref('2025-09-10');
        const roNumber = ref('RO-001');
        const itemsRemaining = ref(3);

        const items = ref([
            { code: 'ITM-001', description: 'Item 1', ordered: 100, received: 50, remaining: 50, unitPrice: 10, status: 'Partial' },
            { code: 'ITM-002', description: 'Item 2', ordered: 200, received: 200, remaining: 0, unitPrice: 20, status: 'Completed' }
        ]);

        const orderedItems = ref([
            { code: 'RCB-001', description: 'Item 1', ordered: 150, received: 100, remaining: 50, unitPrice: 15, status: 'Partial' },
            { code: 'RCB-002', description: 'Item 2', ordered: 200, received: 200, remaining: 0, unitPrice: 25, status: 'Completed' }
        ]);

        const itemsWithNo = computed(() => items.value.map((item, i) => ({ ...item, no: i + 1 })));

        const itemsColumns = ref([
            { field: 'no', header: 'No', bodySlot: 'no' },
            { field: 'code', header: 'Item Code' },
            { field: 'description', header: 'Description' },
            { field: 'ordered', header: 'Ordered' },
            { field: 'received', header: 'Received' },
            { field: 'remaining', header: 'Remaining' },
            { field: 'unitPrice', header: 'Unit Price' },
            { field: 'status', header: 'Status', bodySlot: 'status' }
        ]);

        const activeTab = ref('items');
        const tabItems = [
            { value: 'items', label: 'Items' },
            { value: 'delivery', label: 'Delivery Orders' }
        ];

        return {
            poNumber,
            supplier,
            totalAmount,
            date,
            status,
            project,
            deliveryDate,
            roNumber,
            itemsRemaining,
            items,
            itemsWithNo,
            itemsColumns,
            activeTab,
            tabItems,
            orderedItems
        };
    }
});
