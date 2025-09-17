import type { TableColumn } from '@/types/table.type';
import { ref } from 'vue';

export interface Version {
    label: string;
    value: string;
    latest?: boolean;
}

export function usePurchase() {
    const purchaseList = ref([
        {
            poNumber: 'PO2024090101',
            supplier: 'MetalWorks Inc.',
            date: '15/09/2024',
            totalAmount: 27125,
            status: 'partially delivered'
        },
        {
            poNumber: 'PO2024090102',
            supplier: 'DiggRight Contractors',
            date: '20/09/2024',
            totalAmount: 15750,
            status: 'active'
        }
    ]);

    const deliveriesList = ref([
        {
            doNumber: 'DO2024091501',
            poNumber: 'PO2024090101',
            receivedBy: 'Site Manager',
            date: '15/09/2024',
            discrepancyType: 'Partial Delivery',
            status: 'completed'
        }
    ]);

    const filters = ref({
        global: { value: null as string | null, matchMode: 'contains' }
    });

    const purchaseColumn: TableColumn[] = [
        { field: 'poNumber', header: 'PO Number', sortable: true },
        { field: 'supplier', header: 'Supplier', sortable: true },
        { field: 'date', header: 'Date', sortable: true },
        { field: 'totalAmount', header: 'Total Amount', sortable: true, bodySlot: 'totalAmount' },
        { field: 'status', header: 'Status', sortable: true, bodySlot: 'status' }
    ];

    const deliveriesColumn: TableColumn[] = [
        { field: 'doNumber', header: 'DO Number', sortable: true },
        { field: 'poNumber', header: 'PO Number', sortable: true },
        { field: 'date', header: 'Date', sortable: true },
        { field: 'receivedBy', header: 'Received By', sortable: true },
        { field: 'discrepancyType', header: 'Discrepancy Type', sortable: true, bodySlot: 'discrepancyType' },
        { field: 'status', header: 'Status', sortable: true, bodySlot: 'status' }
    ];

    const search = ref('');

    function handleSearch(value: string) {
        search.value = value;
        filters.value.global.value = value;
    }

    return {
        purchaseList,
        purchaseColumn,
        deliveriesList,
        deliveriesColumn,
        filters,
        search,
        onSearchWrapper: handleSearch
    };
}
