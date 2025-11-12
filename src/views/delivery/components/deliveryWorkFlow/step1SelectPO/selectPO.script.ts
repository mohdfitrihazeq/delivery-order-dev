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
    components: {
        AutoComplete,
        Card,
        Button,
        Message,
        Toast,
        Form,
        Badge
    },
    emits: ['update', 'next-step', 'prev-step'],
    setup(_, { emit }) {
        const toast = useToast();
        const selectedCard = ref<PurchaseOrderCard | null>(null);
        const suggestions = ref<PurchaseOrderCard[]>([]);
        const searchTerm = ref('');
        const allCards = ref<PurchaseOrderCard[]>([]);
        const filteredCards = ref<PurchaseOrderCard[]>([]);
        const purchaseStore = usePurchaseOrderStore();

        // Fetch POs on mount
        onMounted(async () => {
            await purchaseStore.fetchPurchaseOrders();

            allCards.value = purchaseStore.purchaseOrders.map((po) => ({
                id: po.id?.toString() ?? '',
                title: po.poNumber ?? '',
                content: `${po.items?.length ?? 0} items`,
                badges: po.items?.map((i: any) => i.ItemCode ?? '').filter(Boolean) ?? [],
                icon: 'pi-box'
            }));

            // Initially, show all cards
            filteredCards.value = [...allCards.value];
        });

        // Map API data to card structure
        const mappedCards = computed<PurchaseOrderCard[]>(() =>
            purchaseStore.purchaseOrders.map((po) => ({
                id: po.Id?.toString() ?? '',
                title: po.DocNo ?? '',
                content: `${po.purchaseorderitems?.length ?? 0} items`,
                badges: po.purchaseorderitems?.map((i: any) => i.ItemCode ?? '').filter(Boolean) ?? [],
                icon: 'pi-box'
            }))
        );

        const handlePOSearch = async (event: { query: string }) => {
            const query = (event.query || '').trim().toLowerCase();

            // Optional network delay
            await new Promise((resolve) => setTimeout(resolve, 200));

            if (!query) {
                filteredCards.value = [...allCards.value];
            } else {
                filteredCards.value = allCards.value.filter((c) => c.title.toLowerCase().includes(query) || c.badges.some((b) => b.toLowerCase().includes(query)));
            }

            console.log('Search query:', query, 'Filtered Cards:', filteredCards.value);
        };

        // Form submit
        const onFormSubmit = (event: FormSubmitEvent<Record<string, any>>) => {
            if (!event.valid || !selectedCard.value) return;

            const fullPO = purchaseStore.purchaseOrders.find((po) => po.Id?.toString() === selectedCard.value?.id);
            if (!fullPO) return;

            emit('update', {
                purchaseOrderId: fullPO.Id,
                DocNo: fullPO.DocNo,
                PurchaseOrderItems: fullPO.purchaseorderitems
            });

            emit('next-step');
            toast.add({
                severity: 'info',
                summary: 'Purchase Order Confirmed',
                detail: `Selected PO: ${fullPO.DocNo}`,
                life: 2000
            });
        };

        const toggleSelect = (card: PurchaseOrderCard) => {
            selectedCard.value = selectedCard.value?.id === card.id ? null : card;
        };

        const removeCard = (card: PurchaseOrderCard) => {
            if (selectedCard.value?.id === card.id) selectedCard.value = null;
            filtered;
        };

        const isSelected = (card: PurchaseOrderCard) => selectedCard.value?.id === card.id;

        const goBack = () => emit('prev-step');

        return {
            selectedCard,
            suggestions,
            filteredCards,
            onFormSubmit,
            toggleSelect,
            removeCard,
            isSelected,
            goBack,
            searchTerm,
            handlePOSearch,
            allCards,
            mappedCards
        };
    }
});
