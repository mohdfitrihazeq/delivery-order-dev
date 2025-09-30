import type { DiscussionItem, Item, ItemOption, ReasonOption } from '@/types/bcr.type';
import DiscussionThread from '@/views/budget/components/card/DiscussionThread.vue';
import { computed, defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
    name: 'EditBCR',
    components: { DiscussionThread },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const roNumber = ref<string>((route.params.requestNo as string) || '');
        const requestBy = ref('Jakson');
        const requestDate = ref('29/9/2025');

        const reasonOptions = ref<ReasonOption[]>([
            { label: 'Exceed Budget', value: 'Exceed Budget' },
            { label: 'Mockup Remeasurement', value: 'Mockup Remeasurement' },
            { label: 'QS remeasurement', value: 'QS remeasurement' },
            { label: 'VO', value: 'VO' },
            { label: 'Others', value: 'Others' }
        ]);

        const itemOptions = ref<ItemOption[]>([
            { label: 'STL-01', value: 'STL-01', description: 'Steel reinforcement bar 60mm', uom: 'Ton' },
            { label: 'CEM-02', value: 'CEM-02', description: 'Cement Portland Type I', uom: 'Bag' },
            { label: 'TIL-03', value: 'TIL-03', description: 'Ceramic floor tiles 600x600mm', uom: 'm²' },
            { label: 'MAR-04', value: 'MAR-04', description: 'Premium marble slab', uom: 'm²' }
        ]);

        const discussionData = ref<DiscussionItem[]>([
            {
                role: 'Site',
                name: 'John Smith',
                datetime: '08/09/2024, 23:30:00',
                message: 'Current tiles are adequate for the purpose. Upgrade not essential from operational perspective.',
                documentUrl: 'https://example.com/doc1.pdf',
                isEditing: false
            },
            {
                role: 'PM',
                name: 'Jane Doe',
                datetime: '09/09/2024, 19:20:00',
                message: 'Cost increase is too significant without clear functional benefit. Budget constraints do not allow this upgrade.',
                isEditing: false
            }
        ]);

        const items = ref<Item[]>([
            {
                itemCode: 'TIL-03',
                description: 'Ceramic floor tiles 600x600mm',
                uom: 'm²',
                unitPrice: 165,
                budgetQty: 250,
                orderedQty: 0,
                newOrder: 250,
                exceededQty: 0,
                exceededPercent: 0,
                estimatedExceed: 41250,
                varianceQty: 0,
                varianceAmount: 34875,
                remark: 'Upgrade to premium marble for enhanced aesthetic appeal',
                notes: '',
                showNotes: false,
                showRemark: false
            },
            {
                itemCode: 'STL-01',
                description: 'Steel reinforcement bar 60mm',
                uom: 'Ton',
                unitPrice: 500,
                budgetQty: 10,
                orderedQty: 10,
                newOrder: 12,
                exceededQty: 2,
                exceededPercent: 20,
                estimatedExceed: 1000,
                varianceQty: 2,
                varianceAmount: 1000,
                remark: '',
                notes: 'Urgent requirement',
                showNotes: false,
                showRemark: false
            },
            {
                itemCode: 'CEM-02',
                description: 'Cement Portland Type I',
                uom: 'Bag',
                unitPrice: 12,
                budgetQty: 200,
                orderedQty: 200,
                newOrder: 250,
                exceededQty: 50,
                exceededPercent: 25,
                estimatedExceed: 600,
                varianceQty: 50,
                varianceAmount: 600,
                remark: 'For foundation work',
                notes: '',
                showNotes: false,
                showRemark: false
            }
        ]);

        const addItem = () => {
            items.value.push({
                itemCode: '',
                description: '',
                uom: '',
                unitPrice: 0,
                budgetQty: 0,
                orderedQty: 0,
                newOrder: 0,
                exceededQty: 0,
                exceededPercent: 0,
                estimatedExceed: 0,
                varianceQty: 0,
                varianceAmount: 0,
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
            return items.value.reduce((sum, item) => sum + (item.varianceAmount || 0), 0);
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
            goBack: () => router.push({ name: 'bcr' }),
            discussionData,
            active: ref('0')
        };
    }
});
