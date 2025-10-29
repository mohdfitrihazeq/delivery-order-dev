import BaseTab from '@/components/tab/BaseTab.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import { Motion } from '@motionone/vue';
import Tag from 'primevue/tag';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePurchaseOrderStore } from '@/stores/purchase-order/purchaseOrder.store';

export default defineComponent({
    name: 'ViewDetailsPO',
    components: { Tag, BaseTab, ReusableTable, Motion },
    setup() {
        const route = useRoute();
        const store = usePurchaseOrderStore();

        const poId = ref(route.query.id as string);
        const poNumber = ref(route.params.poNumber || '');
        const isLoading = ref(false);

        const purchaseOrder = computed(() => store.selectedPurchaseOrder);
        const project = ref<{ company: string; name: string } | null>(JSON.parse(localStorage.getItem('selectedProject') || 'null'));

        const supplier = computed(() => purchaseOrder.value?.supplierName || '');
        const totalAmount = computed(() => purchaseOrder.value?.totalAmount || '');
        const date = computed(() => purchaseOrder.value?.poDate || '');
        const status = computed(() => purchaseOrder.value?.status || '');
        const createdBy = computed(() => purchaseOrder.value?.createdBy || '');
        const roNumber = computed(() => purchaseOrder.value?.items?.[0]?.roNumber || 'N/A');

        const items = computed(() =>
            (purchaseOrder.value?.items || []).map((item) => ({
                code: item.code,
                description: item.description,
                ordered: item.qty,
                unitPrice: item.price,
                amount: item.amount,
                roNumber: item.roNumber,
                deliveryDate: item.deliveryDate,
                note: item.note,
                received: Math.floor(item.qty * 0.7),
                remaining: Math.ceil(item.qty * 0.3),
                status: Math.floor(item.qty * 0.7) === item.qty ? 'Completed' : 'Partial'
            }))
        );

        const itemsWithNo = computed(() => items.value.map((item, i) => ({ ...item, no: i + 1 })));

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

        const activeTab = ref('items');
        const tabItems = [
            { value: 'items', label: 'Items' },
            { value: 'delivery', label: 'Delivery Orders' }
        ];

        onMounted(async () => {
            isLoading.value = true;
            try {
                await store.fetchPurchaseOrderById(poId.value);
            } catch (error) {
                console.error('Failed to load purchase order details:', error);
            } finally {
                isLoading.value = false;
            }
        });

        return {
            poNumber,
            supplier,
            totalAmount,
            date,
            status,
            createdBy,
            project,
            items,
            itemsWithNo,
            itemsColumns,
            activeTab,
            tabItems,
            isLoading,
            purchaseOrder,
            roNumber
        };
    }
});
