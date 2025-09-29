import type { Item, ItemOption, ReasonOption } from '@/types/bcr.type';
import { Motion } from '@motionone/vue';
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'CreateBCR',
    components: { Motion },
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

        const addItem = () => {
            items.value.push({
                itemCode: '',
                description: '',
                uom: '',
                quantity: '1',
                deliveryDate: null,
                notes: '',
                remark: '',
                showNotes: false,
                showRemark: false
            });
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

        const totalVarianceAmount = computed(() => {
            return items.value.length * 100;
        });

        const isAttachmentValid = ref(true);

        return {
            roNumber,
            requestBy,
            requestDate,
            reasonOptions,
            items,
            addItem,
            itemOptions,
            fillItemDetails,
            getItemLabel,
            totalVarianceAmount,
            isAttachmentValid,
            goBack: () => router.push({ name: 'request-orders' })
        };
    }
});
