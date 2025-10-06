// CreateBCR.script.ts
import type { Item, ItemOption, ReasonOption } from '@/types/bcr.type';
import MeterialModal from '@/views/budget/components/modal/CreateBCRModal.vue';
import { Motion } from '@motionone/vue';
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'CreateBCR',
    components: { Motion, MeterialModal },
    setup() {
        const router = useRouter();

        const roNumber = ref('RO2025208757');
        const requestBy = ref('Jakson');
        const requestDate = ref('29/9/2025');

        const reasonOptions = ref<ReasonOption[]>([
            { label: 'Exceed Budget', value: 'Exceed Budget' },
            { label: 'Mockup Remeasurement', value: 'Mockup Remeasurement' },
            { label: 'QS remeasurement', value: 'QS remeasurement' },
            { label: 'VO', value: 'VO' },
            { label: 'Others', value: 'Others' }
        ]);

        const items = ref<Item[]>([]);

        const itemOptions = ref<ItemOption[]>([
            { label: 'STL-01', value: 'STL-01', description: 'Steel reinforcement bar 60mm', uom: 'Ton' },
            { label: 'CEM-02', value: 'CEM-02', description: 'Cement Portland Type I', uom: 'Bag' }
        ]);

        const calcExceedQty = (item: Item) => {
            const newOrder = Number(item.newOrder) || 0;
            const ordered = Number(item.orderedQty) || 0;
            return newOrder - ordered;
        };

        const calcExceedPercent = (item: Item) => {
            const exceed = calcExceedQty(item);
            const budget = Number(item.budgetQty) || 0;
            if (budget === 0) return 0;
            return (exceed / budget) * 100;
        };

        const calcEstimatedExceed = (item: Item) => {
            const exceed = calcExceedQty(item);
            const price = Number(item.unitPrice) || 0;
            return exceed * price;
        };

        const fillItemDetails = (item: Item) => {
            const selected = itemOptions.value.find((opt) => opt.value === item.itemCode);
            if (selected) {
                item.description = selected.description;
                item.uom = selected.uom;
            }
        };

        const getItemLabel = (value: string): string => {
            const selected = itemOptions.value.find((opt) => opt.value === value);
            return selected ? selected.label : value;
        };
        const showBulkItemModal = ref(false);
        const openMeterial = () => {
            showBulkItemModal.value = true;
        };

        const totalVarianceAmount = computed(() => {
            return items.value.reduce((acc, item) => acc + calcEstimatedExceed(item), 0);
        });

        const isAttachmentValid = ref(true);

        return {
            roNumber,
            requestBy,
            requestDate,
            reasonOptions,
            items,
            itemOptions,
            fillItemDetails,
            getItemLabel,
            showBulkItemModal,
            calcExceedQty,
            calcExceedPercent,
            calcEstimatedExceed,
            openMeterial,
            totalVarianceAmount,
            isAttachmentValid,

            goBack: () => router.push({ name: 'budgetChangeRequest' })
        };
    }
});
