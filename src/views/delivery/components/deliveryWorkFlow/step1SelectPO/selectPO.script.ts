import { usePurchaseOrderStore } from '@/stores/purchase-order/purchaseOrder.store';
import Form, { FormSubmitEvent } from '@primevue/forms/form';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import ProgressBar from 'primevue/progressbar';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';

interface PurchaseOrderCard {
    id: string;
    title: string;
    content: string;
    item: string;
    badges: string[];
    icon: string;
}

export default defineComponent({
    name: 'SelectPO',
    components: {
        Card,
        InputText,
        Button,
        Message,
        Toast,
        Form,
        Calendar,
        Textarea,
        FileUpload,
        ProgressBar,
        Badge
    },
    emits: ['update', 'next-step', 'prev-step'],
    setup(_, { emit }) {
        // ---------------------------
        // 1. STATE
        // ---------------------------
        const toast = useToast();
        const toastRef = ref<InstanceType<typeof Toast> | null>(null);
        const searchTerm = ref('');
        const selectedCard = ref<PurchaseOrderCard | null>(null);

        const purchaseStore = usePurchaseOrderStore();

        // ---------------------------
        // 2. FETCH DATA
        // ---------------------------
        onMounted(async () => {
            await purchaseStore.fetchPurchaseOrders();
        });

        // ---------------------------
        // 3. COMPUTED
        // ---------------------------
        const cards = computed<PurchaseOrderCard[]>(() =>
            purchaseStore.purchaseOrders.map((po) => ({
                id: po.Id.toString(),
                title: po.DocNo,
                content: `${po.PurchaseOrderItems?.length ?? 0} items`,
                item: po.PurchaseOrderItems?.length?.toString() ?? '0',
                badges: po.PurchaseOrderItems?.map((i) => i.ItemCode) ?? [],
                icon: 'pi-box'
            }))
        );

        const filteredCards = computed(() => {
            if (!searchTerm.value) return cards.value;
            const term = searchTerm.value.toLowerCase();
            return cards.value.filter((c) => c.id.toLowerCase().includes(term) || c.title.toLowerCase().includes(term) || c.content.toLowerCase().includes(term) || c.badges.some((b) => b.toLowerCase().includes(term)));
        });

        watch(searchTerm, async (val) => {
            await purchaseStore.fetchPurchaseOrders();
        });

        // ---------------------------
        // 4. METHODS
        // ---------------------------
        const onFormSubmit = (event: FormSubmitEvent<Record<string, any>>) => {
            if (!event.valid) return;

            if (!selectedCard.value) return;

            const fullPO = purchaseStore.purchaseOrders.find((po) => po.Id.toString() === selectedCard.value?.id);

            if (!fullPO) return;

            emit('update', {
                purchaseOrderId: fullPO.Id,
                DocNo: fullPO.DocNo,
                PurchaseOrderItems: fullPO.PurchaseOrderItems
            });

            emit('next-step');

            toast.add({
                severity: 'info',
                summary: 'Purchase Order Confirmed',
                detail: `Selected PO: ${fullPO.DocNo}`,
                life: 2000
            });
        };

        const goBack = () => emit('prev-step');

        const toggleSelect = (card: PurchaseOrderCard) => {
            if (selectedCard.value?.id === card.id) {
                selectedCard.value = null;
            } else {
                const fullPO = purchaseStore.purchaseOrders.find((po) => po.Id.toString() === card.id);
                if (!fullPO) return;

                selectedCard.value = card;
                emit('update', {
                    purchaseOrderId: fullPO.Id,
                    DocNo: fullPO.DocNo,
                    PurchaseOrderItems: fullPO.PurchaseOrderItems
                });

                emit('next-step');
                toast.add({
                    severity: 'info',
                    summary: 'PO Selected',
                    detail: `Selected PO: ${card.title}`,
                    life: 2000
                });
            }
        };

        const removeCard = (card: PurchaseOrderCard) => (selectedCard.value = selectedCard.value?.id === card.id ? null : selectedCard.value);
        const isSelected = (card: PurchaseOrderCard) => selectedCard.value?.id === card.id;

        // ---------------------------
        // 5. RETURN
        // ---------------------------
        return {
            toastRef,
            searchTerm,
            selectedCard,
            filteredCards,
            onFormSubmit,
            goBack,
            toggleSelect,
            removeCard,
            isSelected,
            loading: purchaseStore.loading
        };
    }
});
