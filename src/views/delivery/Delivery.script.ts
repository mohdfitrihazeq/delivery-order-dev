import type { TableColumn } from '@/types/table.type';
import { Motion } from '@motionone/vue';
import Tag from 'primevue/tag';
import { defineComponent, ref } from 'vue';

import DeliveriesSummaryData from '@/components/summaryCard/Card.vue';
import BaseTab from '@/components/tab/BaseTab.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';

export interface Version {
    label: string;
    value: string;
    latest?: boolean;
}

export interface CardItem {
    title: string;
    value: number;
    description: string;
    icon: string;
    color: string;
}

export default defineComponent({
    name: 'Deliveries',
    components: {
        BaseTab,
        Motion,
        Tag,
        DeliveriesSummaryData,
        ReusableTable
    },
    setup() {
        // ---------- DATA ----------
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
            { title: 'Pending POs', value: 1, description: 'No items delivered yet', icon: 'pi pi-clock', color: 'blue' },
            { title: 'Partially Delivered', value: 1, description: 'Some items delivered', icon: 'pi pi-exclamation-triangle', color: 'orange' },
            { title: 'Completed', value: 1, description: 'All items delivered', icon: 'pi pi-check-circle', color: 'green' },
            { title: 'Total DOs', value: 1, description: 'Delivery orders created', icon: 'pi pi-book', color: 'gray' }
        ];

        // ---------- FUNCTION ----------
        const filters = ref({
            global: { value: null as string | null, matchMode: 'contains' }
        });

        const search = ref('');
        function handleSearch(value: string) {
            search.value = value;
            filters.value.global.value = value;
        }

        // ---------- DATA TABLE LIST TITLE ----------
        const pendingListColumn: TableColumn[] = [
            { field: 'poNumber', header: 'PO Number', sortable: true },
            { field: 'supplier', header: 'Supplier', sortable: true },
            { field: 'date', header: 'Date', sortable: true },
            { field: 'totalAmount', header: 'Total Amount', sortable: true, bodySlot: 'totalAmount' },
            { field: 'status', header: 'Status', sortable: true, bodySlot: 'status' }
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

        // ---------- TAB ----------
        const tabItems = [
            { value: '0', label: 'Pending', icon: 'pi pi-clock' },
            { value: '1', label: 'Partial Delivery', icon: 'pi pi-exclamation-triangle' },
            { value: '2', label: 'Completed', icon: 'pi pi-check-circle' }
        ];

        const activeTab = ref('0');

        // ---------- RETURN ----------
        return {
            // DATA
            pendingList,
            partiallyList,
            completedList,
            deliverySummaryData,
            // DATA TABLE LIST TITLE
            pendingListColumn,
            partiallyListColumn,
            completedListColumn,
            // FUNCTION
            filters,
            search,
            onSearchWrapper: handleSearch,
            // TAB
            activeTab,
            tabItems
        };
    }
});
