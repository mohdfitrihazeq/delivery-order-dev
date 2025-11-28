import BaseTab from '@/components/tab/BaseTab.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import { usePurchaseOrderStore } from '@/stores/purchase-order/purchaseOrder.store';
import { Motion } from '@motionone/vue';
import Tag from 'primevue/tag';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'ViewDetailsPO',
    components: { Tag, BaseTab, ReusableTable, Motion },
    setup() {
        const route = useRoute();
        const store = usePurchaseOrderStore();

        const poId = ref(route.query.id as string);
        const isLoading = ref(false);

        const purchaseOrder = computed(() => store.selectedPurchaseOrder);

        const project = ref<{ company: string; name: string } | null>(JSON.parse(localStorage.getItem('selectedProject') || 'null'));

        // --- Top section info ---
        const poNumber = computed(() => purchaseOrder.value?.poNumber || '');
        const supplier = computed(() => purchaseOrder.value?.SupplierId || '');
        const totalAmount = computed(() => purchaseOrder.value?.TotalAmount ?? 0);
        const date = computed(() => purchaseOrder.value?.poDate || '');
        const status = computed(() => purchaseOrder.value?.Status || '');
        const createdBy = computed(() => purchaseOrder.value?.CreatedBy || '');
        const roNumber = computed(() => purchaseOrder.value?.items?.[0]?.RoDocNo || 'N/A');

        const deliveryDate = computed(() => purchaseOrder.value?.items?.[0]?.DeliveryDate ?? 'N/A');

        const itemsRemaining = computed(() => {
            if (!purchaseOrder.value?.items) return 0;
            return purchaseOrder.value.items.reduce((acc, item) => {
                const qty = Number(item.Quantity || 0);
                const received = Math.floor(qty * 0.7);
                const remaining = qty - received;
                return acc + remaining;
            }, 0);
        });

        // --- Table data ---
        const items = computed(() =>
            (purchaseOrder.value?.items || []).map((item) => {
                const qty = Number(item.Quantity || 0);
                const received = Math.floor(qty * 0.7);
                const remaining = qty - received;
                return {
                    no: 0,
                    code: item.code,
                    description: item.description,
                    ordered: item.qty,
                    received,
                    remaining,
                    unitPrice: item.Price,
                    roNumber: item.RoDocNo,
                    deliveryDate: item.DeliveryDate || 'N/A',
                    status: received === item.qty ? 'Completed' : 'Partial'
                };
            })
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
            { field: 'amount', header: 'Amount' },
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
            itemsWithNo,
            itemsColumns,
            activeTab,
            tabItems,
            isLoading,
            purchaseOrder,
            roNumber,
            deliveryDate,
            itemsRemaining
        };
    }
});
