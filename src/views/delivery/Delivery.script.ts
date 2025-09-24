import DeliveriesSummaryData from '@/components/summaryCard/SummaryCard.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import type { CardItem } from '@/types/card.type';
import type { TableColumn } from '@/types/table.type';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { computed, defineComponent, ref } from 'vue'; // ✅ 要加 computed
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
        // ---------------------------
        // 1. DATA (constants, refs)
        // ---------------------------
        const deliveryList = ref([
            {
                doNumber: 'DO2024091501',
                poNumber: 'PO2024090102',
                supplier: 'DiggRight Contractors',
                receivedBy: '-',
                date: '20/09/2024',
                totalAmount: 15750,
                status: 'incompleted'
            },
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
        // 2. STATE (filters, search)
        // ---------------------------
        const filters = ref<Record<string, any>>({});

        const search = ref('');
        const router = useRouter();
        const activeFilters = ref<{ [key: string]: any }>({});

        const extraFilters = [
            {
                type: 'select',
                field: 'status',
                placeholder: 'Status',
                options: [
                    { label: 'All', value: null },
                    { label: 'Incompleted', value: 'incompleted' },
                    { label: 'Completed', value: 'completed' }
                ]
            }
        ];

        const filteredDeliveryList = computed(() => {
            let list = [...deliveryList.value];

            if (activeFilters.value.status) {
                list = list.filter((item) => item.status === activeFilters.value.status);
            }

            return list;
        });

        // ---------------------------
        // 3. FUNCTIONS (handlers)
        // ---------------------------
        function handleSearch(value: string) {
            search.value = value;
            filters.value.global.value = value;
        }

        function handleAction(type: 'view', row: any) {
            if (type === 'view') {
                router.push(`/budget`);
            }
        }

        function handleFilter(newFilters: Record<string, any>) {
            activeFilters.value = newFilters;
        }

        // ---------------------------
        // 4. TABLE CONFIG
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

        // ---------------------------
        // 6. RETURN
        // ---------------------------
        return {
            deliveryList,
            filteredDeliveryList,
            deliverySummaryData,
            search,
            extraFilters,
            onSearchWrapper: handleSearch,
            handleAction,
            handleFilter,
            deliveryListColumn
        };
    }
});
