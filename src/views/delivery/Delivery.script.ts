import DeliveriesSummaryData from '@/components/summaryCard/SummaryCard.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import type { CardItem } from '@/types/card.type';
import type { TableColumn } from '@/types/table.type';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Deliveries',
    components: {
        Tag,
        DeliveriesSummaryData,
        ReusableTable,
        Button
    },
    setup() {
        const incompletedList = ref([
            {
                doNumber: 'DO2024091501',
                poNumber: 'PO2024090102',
                supplier: 'DiggRight Contractors',
                receivedBy: '-',
                date: '20/09/2024',
                totalAmount: 15750,
                status: 'incompleted'
            }
        ]);

        const completedList = ref([
            {
                doNumber: 'DO2024091502',
                poNumber: 'PO2024090101',
                supplier: 'Doggie Contractors',
                receivedBy: 'Site Manager',
                date: '15/09/2024',
                totalAmount: 19270,
                status: 'completed'
            }
        ]);

        const deliverySummaryData: CardItem[] = [
            { title: 'Incompleted Delivery', value: '1', description: 'Pending items delivered yet', icon: 'pi pi-exclamation-triangle', color: 'blue' },
            { title: 'Completed Delivery', value: '1', description: 'All items delivered', icon: 'pi pi-check-circle', color: 'green' },
            { title: 'Total DOs', value: '1', description: 'Delivery orders created', icon: 'pi pi-book', color: 'gray' }
        ];

        // ---------------------------
        // Tabs
        // ---------------------------
        const tabItems = [
            { value: '0', label: 'Incompleted', badge: 1 },
            { value: '1', label: 'Completed' }
        ];

        const activeTab = ref('0');
        // ---------------------------
        // Search & Router
        // ---------------------------
        const search = ref('');
        const router = useRouter();

        function handleSearch(value: string) {
            search.value = value;
        }

        function handleAction(type: 'view', row: any) {
            if (type === 'view') {
                router.push(`/deliveries/viewDelivery/${row.doNumber}`);
            }
        }

        // ---------------------------
        // Computed: filter list by tab
        // ---------------------------

        const deliveryListColumn: TableColumn[] = [
            { field: 'doNumber', header: 'DO Number', sortable: true },
            { field: 'poNumber', header: 'PO Number', sortable: true },
            { field: 'supplier', header: 'Supplier', sortable: false },
            { field: 'date', header: 'Date', sortable: true },
            { field: 'receivedBy', header: 'Received By', sortable: true },
            { field: 'totalAmount', header: 'Total Amount', sortable: true, bodySlot: 'totalAmount' },
            { field: 'status', header: 'Status', sortable: true, bodySlot: 'status' },
            { header: 'Action', action: true, actions: ['view'] }
        ];

        return {
            incompletedList,
            completedList,
            deliverySummaryData,
            search,
            onSearchWrapper: handleSearch,
            handleAction,
            deliveryListColumn,
            activeTab,
            tabItems
        };
    }
});
