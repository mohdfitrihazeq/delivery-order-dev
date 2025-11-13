import { useDeliveryStore } from '@/stores/delivery/delivery.store';
import type { TableColumn } from '@/types/table.type';
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import Tag from 'primevue/tag';

export default defineComponent({
    name: 'Deliveries',
    components: { Tag },
    setup() {
        const deliveryStore = useDeliveryStore();
        const router = useRouter();
        const toast = useToast();
        const confirm = useConfirm();

        // Tabs
        const tabItems = [
            { value: '0', label: 'Pending' },
            { value: '1', label: 'Completed' }
        ];
        const activeTab = ref('0');

        // Pagination
        const startingIndex = computed(() => {
            return (deliveryStore.pagination.page - 1) * deliveryStore.pagination.pageSize;
        });

        // Filtered & numbered deliveries
        const filteredDeliveries = computed(() => {
            const list = activeTab.value === '0' ? deliveryStore.incompletedList : deliveryStore.completedList;

            return list.map((item, index) => ({
                ...item,
                rowIndex: startingIndex.value + index + 1
            }));
        });

        // Columns
        const deliveryListColumn: TableColumn[] = [
            { field: 'rowIndex', header: '#', sortable: false },
            { field: 'DocNo', header: 'DO Number', sortable: true },
            { field: 'PlateNo', header: 'Plate No', sortable: true },
            { field: 'Remark', header: 'Remark', sortable: false },
            { field: 'Status', header: 'Status', sortable: true, bodySlot: 'status' },
            { header: 'Action', action: true, actions: ['view'] }
        ];

        // Pagination & filter handlers
        function handlePageChange(page: number): void {
            deliveryStore.pagination.page = page;
            deliveryStore.fetchDeliveryOrders();
        }

        function handlePageSizeChange(pageSize: number): void {
            deliveryStore.pagination.pageSize = pageSize;
            deliveryStore.pagination.page = 1;
            deliveryStore.fetchDeliveryOrders();
        }

        function handleFilterChange(filters: Record<string, any>): void {
            deliveryStore.filters.search = filters.search ?? '';
            deliveryStore.pagination.page = 1;
            deliveryStore.fetchDeliveryOrders();
        }

        // Action handler
        function handleAction(type: 'view', row: any) {
            if (type === 'view') {
                router.push(`/deliveries/viewDelivery/${row.Id}`);
            }
        }

        async function handleSearch(value: string) {
            await deliveryStore.handleSearch(value);
        }

        onMounted(() => {
            deliveryStore.fetchDeliveryOrders();
        });

        watch(activeTab, () => {
            deliveryStore.fetchDeliveryOrders();
        });

        return {
            activeTab,
            tabItems,
            filteredDeliveries,
            deliveryListColumn,
            handleAction,
            handleSearch,
            deliveryStore,
            handlePageChange,
            handlePageSizeChange,
            handleFilterChange
        };
    }
});
