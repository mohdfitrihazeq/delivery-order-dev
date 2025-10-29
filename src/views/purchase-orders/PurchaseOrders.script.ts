import type { TableColumn } from '@/types/table.type';
import Tag from 'primevue/tag';
import { computed, defineComponent, onMounted, ref } from 'vue';

import POSummaryData from '@/components/summaryCard/SummaryCard.vue';
import BaseTabUnderLine from '@/components/tab/BaseTabUnderLine.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import router from '@/router';
import type { CardItem } from '@/types/card.type';
import { Motion } from '@motionone/vue';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { usePurchaseOrderStore } from '@/stores/purchase-order/purchaseOrder.store';

export default defineComponent({
    name: 'PurchaseOrders',
    components: {
        Tag,
        POSummaryData,
        ReusableTable,
        Button,
        Motion,
        BaseTabUnderLine,
        ProgressSpinner
    },
    setup() {
        const isLoading = ref(true);
        const store = usePurchaseOrderStore();

        const pendingList = ref([]);
        const partiallyList = ref([]);
        const completedList = ref([]);

        const poSummaryData = ref<CardItem[]>([]);

        const filters = ref({
            global: { value: null as string | null, matchMode: 'contains' }
        });
        const search = ref('');

        const handleSearch = (value: string) => {
            search.value = value;
            filters.value.global.value = value;
        };

        const loadData = async () => {
            isLoading.value = true;
            try {
                await store.fetchPurchaseOrders();

                // Assign a temporary status since DB has no status
                const purchaseOrdersWithStatus = store.purchaseOrders.map((po) => ({
                    ...po,
                    status: 'pending' // default all as pending
                }));

                pendingList.value = purchaseOrdersWithStatus.filter((po) => po.status.toLowerCase() === 'pending');
                partiallyList.value = purchaseOrdersWithStatus.filter((po) => po.status.toLowerCase() === 'partially delivered');
                completedList.value = purchaseOrdersWithStatus.filter((po) => po.status.toLowerCase() === 'completed');

                poSummaryData.value = [
                    {
                        title: 'Pending POs',
                        value: pendingList.value.length.toString(),
                        description: 'No items delivered yet',
                        icon: 'pi pi-clock',
                        color: 'blue'
                    },
                    {
                        title: 'Partially Delivered',
                        value: partiallyList.value.length.toString(),
                        description: 'Some items delivered',
                        icon: 'pi pi-exclamation-triangle',
                        color: 'orange'
                    },
                    {
                        title: 'Completed',
                        value: completedList.value.length.toString(),
                        description: 'All items delivered',
                        icon: 'pi pi-check-circle',
                        color: 'green'
                    },
                    {
                        title: 'Total POs',
                        value: store.purchaseOrders.length.toString(),
                        description: 'Delivery orders created',
                        icon: 'pi pi-book',
                        color: 'gray'
                    }
                ];
            } catch (error) {
                console.error('Error loading purchase orders:', error);
            } finally {
                isLoading.value = false;
            }
        };

        const pendingListWithNo = computed(() => pendingList.value.map((item, i) => ({ ...item, no: i + 1 })));
        const partiallyListWithNo = computed(() => partiallyList.value.map((item, i) => ({ ...item, no: i + 1 })));
        const completedListWithNo = computed(() => completedList.value.map((item, i) => ({ ...item, no: i + 1 })));

        const pendingListColumn: TableColumn[] = [
            { field: 'no', header: '#', sortable: false, bodySlot: 'no' },
            { field: 'poNumber', header: 'PO Number', sortable: true },
            { field: 'supplier', header: 'Supplier', sortable: false },
            { field: 'poDate', header: 'Date', sortable: true },
            { field: 'totalAmount', header: 'Total Amount', sortable: true, bodySlot: 'totalAmount' },
            { field: 'status', header: 'Status', sortable: false, bodySlot: 'status' },
            { field: 'action', header: 'Action', bodySlot: 'action', sortable: false }
        ];

        const partiallyListColumn: TableColumn[] = [
            { field: 'no', header: '#', sortable: false, bodySlot: 'no' },
            { field: 'poNumber', header: 'PO Number', sortable: true },
            { field: 'supplier', header: 'Supplier', sortable: true },
            { field: 'poDate', header: 'Date', sortable: true },
            { field: 'status', header: 'Status', sortable: true, bodySlot: 'status' }
        ];

        const completedListColumn: TableColumn[] = [
            { field: 'no', header: '#', sortable: false, bodySlot: 'no' },
            { field: 'doNumber', header: 'DO Number', sortable: true },
            { field: 'poNumber', header: 'PO Number', sortable: true },
            { field: 'poDate', header: 'Date', sortable: true },
            { field: 'receivedBy', header: 'Received By', sortable: true },
            { field: 'discrepancyType', header: 'Discrepancy Type', sortable: true, bodySlot: 'discrepancyType' },
            { field: 'status', header: 'Status', sortable: true, bodySlot: 'status' }
        ];

        const tabItems = [
            { value: '0', label: 'Pending' },
            { value: '1', label: 'Partial Delivery', badge: partiallyList.value.length },
            { value: '2', label: 'Completed' }
        ];

        const activeTab = ref('0');

        const viewPO = (po: any) => {
            router.push({
                name: 'ViewDetailsPO',
                params: { poNumber: po.poNumber },
                query: {
                    id: po.id,
                    supplier: po.supplier,
                    totalAmount: po.totalAmount,
                    date: po.poDate,
                    status: po.status
                }
            });
        };

        onMounted(() => {
            void loadData();
        });

        return {
            isLoading,
            pendingList: pendingListWithNo,
            partiallyList: partiallyListWithNo,
            completedList: completedListWithNo,
            poSummaryData,
            filters,
            search,
            onSearchWrapper: handleSearch,
            pendingListColumn,
            partiallyListColumn,
            completedListColumn,
            activeTab,
            tabItems,
            viewPO,
            loadData
        };
    }
});
