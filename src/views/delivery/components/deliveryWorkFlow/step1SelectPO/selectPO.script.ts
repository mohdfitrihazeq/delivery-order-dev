import { usePurchaseOrderStore } from '@/stores/purchase-order/purchaseOrder.store';
import Form, { FormSubmitEvent } from '@primevue/forms/form';
import AutoComplete from 'primevue/autocomplete';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { computed, defineComponent, onMounted, ref } from 'vue';

interface PurchaseOrderCard {
    id: string;
    title: string;
    content: string;
    badges: string[];
    icon: string;
}

export default defineComponent({
    name: 'SelectPO',
    components: { AutoComplete, Card, Button, Message, Toast, Form, Badge },
    emits: ['update', 'next-step', 'prev-step'],
    setup(_, { emit }) {
        const toast = useToast();
        const purchaseStore = usePurchaseOrderStore();

        const selectedCard = ref<PurchaseOrderCard | null>(null);
        const allCards = ref<PurchaseOrderCard[]>([]);
        const filteredCards = ref<PurchaseOrderCard[]>([]);
        const searchTerm = ref('');

        // computed wrapper for reactive pagination
        const pagination = computed(() => purchaseStore.pagination);

        // Fetch POs on mount
        const fetchPage = async () => {
            await purchaseStore.fetchPurchaseOrders();
            allCards.value = purchaseStore.purchaseOrders.map((po) => ({
                id: po.id?.toString() ?? '',
                title: po.poNumber ?? '',
                content: `${po.items?.length ?? 0} items`,
                badges: po.items?.map((i: any) => i.code ?? '').filter(Boolean) ?? [],
                icon: 'pi-box'
            }));
            filteredCards.value = [...allCards.value];
        };

        onMounted(fetchPage);

        const handlePOSearch = async (event: { query: string }) => {
            const query = (event.query || '').trim().toLowerCase();
            await new Promise((resolve) => setTimeout(resolve, 200));
            if (!query) filteredCards.value = [...allCards.value];
            else filteredCards.value = allCards.value.filter((c) => c.title.toLowerCase().includes(query) || c.badges.some((b) => b.toLowerCase().includes(query)));
        };

        const toggleSelect = (card: PurchaseOrderCard) => {
            selectedCard.value = selectedCard.value?.id === card.id ? null : card;
        };

        const removeCard = (card: PurchaseOrderCard) => {
            if (selectedCard.value?.id === card.id) selectedCard.value = null;
        };

        const isSelected = (card: PurchaseOrderCard) => selectedCard.value?.id === card.id;

        const onFormSubmit = (event: FormSubmitEvent<Record<string, any>>) => {
            if (!event.valid || !selectedCard.value) return;

            const fullPO = purchaseStore.purchaseOrders.find((po) => po.id?.toString() === selectedCard.value?.id);
            if (!fullPO) return;

            emit('update', {
                purchaseOrderId: fullPO.id,
                DocNo: fullPO.poNumber,
                PurchaseOrderItems: fullPO.items
            });

            emit('next-step');
            toast.add({
                severity: 'info',
                summary: 'Purchase Order Confirmed',
                detail: `Selected PO: ${fullPO.poNumber}`,
                life: 2000
            });
        };

        const displayStart = computed(() => {
            const page = purchaseStore.pagination?.page ?? 1;
            const pageSize = purchaseStore.pagination?.pageSize ?? 10;
            return (page - 1) * pageSize + 1;
        });

        const displayEnd = computed(() => {
            const page = purchaseStore.pagination?.page ?? 1;
            const pageSize = purchaseStore.pagination?.pageSize ?? 10;
            const total = purchaseStore.pagination?.total ?? 0;
            return Math.min(page * pageSize, total);
        });

        const setPage = (page: number) => {
            purchaseStore.setPage(page);
        };

        const setPageSize = (pageSize: number) => {
            purchaseStore.setPageSize(pageSize);
        };

        return {
            selectedCard,
            allCards,
            filteredCards,
            searchTerm,
            handlePOSearch,
            toggleSelect,
            removeCard,
            isSelected,
            onFormSubmit,
            pagination,
            setPage,
            setPageSize,
            displayStart,
            displayEnd,
            purchaseStore
        };
    }
});
