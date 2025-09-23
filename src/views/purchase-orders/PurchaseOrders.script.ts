import type { TableColumn } from '@/types/table.type';
import Tag from 'primevue/tag';
import { computed, defineComponent, onMounted, ref } from 'vue';

import POSummaryData from '@/components/summaryCard/Card.vue';
import BaseTabUnderLine from '@/components/tab/BaseTabUnderLine.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import router from '@/router';
import type { CardItem } from '@/types/card.type';
import { Motion } from '@motionone/vue';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';

export default defineComponent({
    name: 'Deliveries',
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
        // ---------------------------
        // 1. LOADING STATE
        // ---------------------------
        const isLoading = ref(true);

        // ---------------------------
        // 2. DATA (constants, refs)
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

        const poSummaryData: CardItem[] = [
            { title: 'Pending POs', value: '1', description: 'No items delivered yet', icon: 'pi pi-clock', color: 'blue' },
            { title: 'Partially Delivered', value: '1', description: 'Some items delivered', icon: 'pi pi-exclamation-triangle', color: 'orange' },
            { title: 'Completed', value: '1', description: 'All items delivered', icon: 'pi pi-check-circle', color: 'green' },
            { title: 'Total POs', value: '1', description: 'Delivery orders created', icon: 'pi pi-book', color: 'gray' }
        ];

        // ---------------------------
        // 3. STATE (filters, search)
        // ---------------------------
        const filters = ref({
            global: { value: null as string | null, matchMode: 'contains' }
        });

        const search = ref('');

        // ---------------------------
        // 4. FUNCTIONS (handlers)
        // ---------------------------
        function handleSearch(value: string) {
            search.value = value;
            filters.value.global.value = value;
        }

        const loadData = async () => {
            isLoading.value = true;
            try {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 9500));

                // use api later in here
                // const response = await fetchPurchaseOrders();
                // pendingList.value = response.pending;
                // partiallyList.value = response.partially;
                // completedList.value = response.completed;
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                isLoading.value = false;
            }
        };

        // ---------------------------
        // 5. COMPUTED PROPERTIES WITH NUMBERING
        // ---------------------------
        const pendingListWithNo = computed(() => pendingList.value.map((item, i) => ({ ...item, no: i + 1 })));

        const partiallyListWithNo = computed(() => partiallyList.value.map((item, i) => ({ ...item, no: i + 1 })));

        const completedListWithNo = computed(() => completedList.value.map((item, i) => ({ ...item, no: i + 1 })));

        // ---------------------------
        // 6. TABLE CONFIG
        // ---------------------------
        const pendingListColumn: TableColumn[] = [
            { field: 'no', header: '#', sortable: false, bodySlot: 'no' },
            { field: 'poNumber', header: 'PO Number', sortable: true },
            { field: 'supplier', header: 'Supplier', sortable: false },
            { field: 'date', header: 'Date', sortable: true },
            { field: 'totalAmount', header: 'Total Amount', sortable: true, bodySlot: 'totalAmount' },
            { field: 'status', header: 'Status', sortable: false, bodySlot: 'status' },
            {
                field: 'action',
                header: 'Action',
                bodySlot: 'action',
                sortable: false
            }
        ];

        const partiallyListColumn: TableColumn[] = [
            { field: 'no', header: '#', sortable: false, bodySlot: 'no' },
            { field: 'poNumber', header: 'PO Number', sortable: true },
            { field: 'supplier', header: 'Supplier', sortable: true },
            { field: 'date', header: 'Date', sortable: true },
            { field: 'status', header: 'Status', sortable: true, bodySlot: 'status' }
        ];

        const completedListColumn: TableColumn[] = [
            { field: 'no', header: '#', sortable: false, bodySlot: 'no' },
            { field: 'doNumber', header: 'DO Number', sortable: true },
            { field: 'poNumber', header: 'PO Number', sortable: true },
            { field: 'date', header: 'Date', sortable: true },
            { field: 'receivedBy', header: 'Received By', sortable: true },
            { field: 'discrepancyType', header: 'Discrepancy Type', sortable: true, bodySlot: 'discrepancyType' },
            { field: 'status', header: 'Status', sortable: true, bodySlot: 'status' }
        ];

        // ---------------------------
        // 7. TAB
        // ---------------------------
        const tabItems = [
            { value: '0', label: 'Pending' },
            { value: '1', label: 'Partial Delivery', badge: 1 },
            { value: '2', label: 'Completed' }
        ];

        const activeTab = ref('0');

        function viewPO(po: any) {
            router.push({
                name: 'ViewDetailsPO',
                params: { poNumber: po.poNumber },
                query: {
                    supplier: po.supplier,
                    totalAmount: po.totalAmount,
                    date: po.date,
                    status: po.status
                }
            });
        }

        // ---------------------------
        // 8. LIFECYCLE
        // ---------------------------
        onMounted(() => {
            loadData();
        });

        // ---------------------------
        // 9. RETURN
        // ---------------------------
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
