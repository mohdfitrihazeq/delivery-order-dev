import ReusableTable from '@/components/table/ReusableTable.vue';
import { Motion } from '@motionone/vue';
import Tag from 'primevue/tag';
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'ViewDelivery',
    components: { Tag, ReusableTable, Motion },
    setup() {
        const route = useRoute();
        const doNumber = ref(route.params.doNumber || '');

        const deliveryDetailsData = ref([
            {
                doNumber: 'DO2024091501',
                poNumber: 'PO2024090102',
                projectName: 'Project A',
                driverPlate: 'ABC-1234',
                deliveryDate: '20/09/2024',
                status: 'pending',
                items: [
                    { code: 'ITM-001', description: 'Item 1', ordered: 100, received: 50, remaining: 50, unitPrice: 10, status: 'Partial' },
                    { code: 'ITM-002', description: 'Item 2', ordered: 200, received: 200, remaining: 0, unitPrice: 20, status: 'Completed' }
                ]
            },
            {
                doNumber: 'DO2024091502',
                poNumber: 'PO2024090101',
                projectName: 'Project B',
                driverPlate: 'XYZ-5678',
                deliveryDate: '15/09/2024',
                status: 'completed',
                items: [
                    { code: 'ITM-003', description: 'Item 3', ordered: 50, received: 50, remaining: 0, unitPrice: 30, status: 'Completed' },
                    { code: 'ITM-004', description: 'Item 4', ordered: 75, received: 60, remaining: 15, unitPrice: 25, status: 'Partial' }
                ]
            }
        ]);

        const deliveryDetail = computed(() => {
            return (
                deliveryDetailsData.value.find((d) => d.doNumber === doNumber.value) || {
                    poNumber: '',
                    projectName: '',
                    driverPlate: '',
                    deliveryDate: '',
                    status: '',
                    items: []
                }
            );
        });

        const items = computed(() => {
            return deliveryDetail.value.items.map((item, i) => ({ ...item, no: i + 1 }));
        });

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
        const search = ref('');
        const status = computed(() => deliveryDetail.value.status || '');
        function handleSearch(value: string) {
            search.value = value;
        }

        return {
            doNumber,
            deliveryDetail,
            items,
            itemsColumns,
            status,
            search,
            onSearchWrapper: handleSearch
        };
    }
});
