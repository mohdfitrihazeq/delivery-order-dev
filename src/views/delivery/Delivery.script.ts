import { useDeliveryStore } from '@/stores/delivery/delivery.store';
import type { TableColumn } from '@/types/table.type';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Deliveries',
    setup() {
        const deliveryStore = useDeliveryStore();
        const router = useRouter();

        const tabItems = [
            { value: '0', label: 'Pending' },
            { value: '1', label: 'Completed' }
        ];

        const activeTab = ref('0');
        const searchQuery = ref('');

        const filteredPendingList = computed(() => {
            if (!searchQuery.value) return deliveryStore.incompletedList;
            return deliveryStore.incompletedList.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(searchQuery.value.toLowerCase())));
        });

        const filteredCompletedList = computed(() => {
            if (!searchQuery.value) return deliveryStore.completedList;
            return deliveryStore.completedList.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(searchQuery.value.toLowerCase())));
        });

        const deliveryListColumn: TableColumn[] = [
            { field: 'DocNo', header: 'DO Number', sortable: true },
            { field: 'PlateNo', header: 'Plate No', sortable: true },
            { field: 'Remark', header: 'Remark', sortable: false },
            { field: 'Status', header: 'Status', sortable: true, bodySlot: 'status' },
            { header: 'Action', action: true, actions: ['view'] }
        ];

        function handleAction(type: 'view', row: any) {
            if (type === 'view') router.push(`/deliveries/viewDelivery/${row.Id}`);
        }

        function handleSearch(value: string) {
            searchQuery.value = value.trim();
        }

        onMounted(() => {
            deliveryStore.fetchDeliveryOrders();
        });

        return {
            deliveryStore,
            activeTab,
            tabItems,
            deliveryListColumn,
            handleAction,
            handleSearch,
            searchQuery,
            filteredPendingList,
            filteredCompletedList
        };
    }
});
