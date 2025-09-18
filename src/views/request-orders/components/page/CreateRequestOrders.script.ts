import { Motion } from '@motionone/vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import BudgetInfoCard from '../card/BudgetInfoCard.vue';

export default defineComponent({
    name: 'CreateRequestOrders',
    components: { Motion, BudgetInfoCard },
    setup() {
        const router = useRouter();
        const calendarValue = ref(null);

        const roNumber = ref('RO2025208757');
        const budgetType = ref('Budgeted Item');
        const roDate = ref('');
        const budgetOptions = ref([
            { label: 'Budgeted Item', value: 'Budgeted Item' },
            { label: 'Unbudgeted Item', value: 'Unbudgeted Item' }
        ]);
        const goBack = () => {
            router.push({ name: 'request-orders' });
        };

        return { roNumber, budgetType, roDate, goBack, budgetOptions, calendarValue };
    }
});
