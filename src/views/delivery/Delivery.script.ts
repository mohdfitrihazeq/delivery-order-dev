import type { TableColumn } from '@/types/table.type';
import Tag from 'primevue/tag';
import { defineComponent, ref } from 'vue';

import DeliveriesSummaryData from '@/components/summaryCard/Card.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import type { CardItem } from '@/types/card.type';
import Button from 'primevue/button';

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
        const pendingList = ref([
            {
                poNumber: 'PO2024090102',
                supplier: 'DiggRight Contractors',
                date: '20/09/2024',
                totalAmount: 15750,
                status: 'active'
            }
        ]);

        const partiallyList = ref([]);

        const completedList = ref([
            {
                doNumber: 'DO2024091501',
                poNumber: 'PO2024090101',
                receivedBy: 'Site Manager',
                date: '15/09/2024',
                discrepancyType: 'Partial Delivery',
                status: 'completed'
            }
        ]);

        const deliverySummaryData: CardItem[] = [
            { title: 'Pending POs', value: '1', description: 'No items delivered yet', icon: 'pi pi-clock', color: 'blue' },
            { title: 'Partially Delivered', value: '1', description: 'Some items delivered', icon: 'pi pi-exclamation-triangle', color: 'orange' },
            { title: 'Completed', value: '1', description: 'All items delivered', icon: 'pi pi-check-circle', color: 'green' },
            { title: 'Total DOs', value: '1', description: 'Delivery orders created', icon: 'pi pi-book', color: 'gray' }
        ];

        // ---------------------------
        // 2. STATE (filters, search)
        // ---------------------------
        const filters = ref({
            global: { value: null as string | null, matchMode: 'contains' }
        });

        const search = ref('');

        // ---------------------------
        // 3. FUNCTIONS (handlers)
        // ---------------------------
        function handleSearch(value: string) {
            search.value = value;
            filters.value.global.value = value;
        }

        // ---------------------------
        // 4. TABLE CONFIG
        // ---------------------------
        const pendingListColumn: TableColumn[] = [
            { field: 'poNumber', header: 'PO Number', sortable: true },
            { field: 'supplier', header: 'Supplier', sortable: false },
            { field: 'date', header: 'Date', sortable: true },
            { field: 'totalAmount', header: 'Total Amount', sortable: true, bodySlot: 'totalAmount' },
            { field: 'status', header: 'Status', sortable: false, bodySlot: 'status' }
        ];

        const partiallyListColumn: TableColumn[] = [
            { field: 'poNumber', header: 'PO Number', sortable: true },
            { field: 'supplier', header: 'Supplier', sortable: true },
            { field: 'date', header: 'Date', sortable: true },
            { field: 'status', header: 'Status', sortable: true, bodySlot: 'status' }
        ];

        const completedListColumn: TableColumn[] = [
            { field: 'doNumber', header: 'DO Number', sortable: true },
            { field: 'poNumber', header: 'PO Number', sortable: true },
            { field: 'date', header: 'Date', sortable: true },
            { field: 'receivedBy', header: 'Received By', sortable: true },
            { field: 'discrepancyType', header: 'Discrepancy Type', sortable: true, bodySlot: 'discrepancyType' },
            { field: 'status', header: 'Status', sortable: true, bodySlot: 'status' }
        ];

        // ---------------------------
        // 5. TAB
        // ---------------------------
        const tabItems = [
            { value: '0', label: 'Pending', icon: 'pi pi-clock' },
            { value: '1', label: 'Partial Delivery', icon: 'pi pi-exclamation-triangle', badge: 1 },
            { value: '2', label: 'Completed', icon: 'pi pi-check-circle' }
        ];

        const activeTab = ref('0');

        // ---------------------------
        // 6. RETURN
        // ---------------------------
        return {
            pendingList,
            partiallyList,
            completedList,
            deliverySummaryData,
            filters,
            search,
            onSearchWrapper: handleSearch,
            pendingListColumn,
            partiallyListColumn,
            completedListColumn,
            activeTab,
            tabItems
        };
    }
});
