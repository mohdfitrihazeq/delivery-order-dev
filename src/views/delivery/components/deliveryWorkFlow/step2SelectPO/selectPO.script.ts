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
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'SelectPO',
    components: { Card, InputText, Button, Message, Toast, Form, Calendar, Textarea, FileUpload, ProgressBar, Badge },
    emits: ['update', 'next-step', 'prev-step'],
    setup(_, { emit }) {
        const toast = useToast();
        const toastRef = ref<InstanceType<typeof Toast> | null>(null);
        const searchTerm = ref('');

        const filteredCards = computed(() => {
            if (!searchTerm.value) return cards.value;
            const term = searchTerm.value.toLowerCase();
            return cards.value.filter((c) => c.id.toLowerCase().includes(term) || c.title.toLowerCase().includes(term) || c.content.toLowerCase().includes(term) || c.badges.some((b) => b.toLowerCase().includes(term)));
        });

        const selectedCard = ref<any | null>(null);

        const onFormSubmit = (event: FormSubmitEvent<Record<string, any>>) => {
            if (event.valid) {
                if (selectedCard.value) {
                    emit('update', selectedCard.value);
                    emit('next-step');
                    toast.add({
                        severity: 'success',
                        summary: 'Form submitted',
                        detail: `Selected PO: ${selectedCard.value.id}`,
                        life: 3000
                    });
                } else {
                    toast.add({
                        severity: 'warn',
                        summary: 'No PO selected',
                        detail: 'Please select a Purchase Order before continuing.',
                        life: 3000
                    });
                }
            }
        };

        const goBack = () => {
            emit('prev-step');
        };

        const cards = ref([
            {
                id: '1',
                title: 'P02024090101',
                content: '2 items • DiggRight Contractors',
                item: '1',
                badges: ['Excavation work'],
                icon: 'pi-box'
            },
            {
                id: '2',
                title: 'P02024090102',
                content: '2 items • MetalWorks Inc.',
                item: '2',
                badges: ['Steel reinforcement', 'Ready mix'],
                icon: 'pi-box'
            },
            {
                id: '3',
                title: 'P02024090103',
                content: '1 items • ClearView Glass',
                item: '1',
                badges: ['Double glazed'],
                icon: 'pi-box'
            }
        ]);
        const toggleSelect = (card: any) => {
            if (selectedCard.value && selectedCard.value.id === card.id) {
                selectedCard.value = null;
            } else {
                selectedCard.value = card;
            }
        };
        const removeCard = (card: any) => {
            if (selectedCard.value && selectedCard.value.id === card.id) {
                selectedCard.value = null;
            }
        };

        const isSelected = (card: any) => {
            return selectedCard.value?.id === card.id;
        };
        return {
            onFormSubmit,
            toastRef,
            cards,
            toggleSelect,
            removeCard,
            isSelected,
            goBack,
            filteredCards,
            searchTerm
        };
    }
});
