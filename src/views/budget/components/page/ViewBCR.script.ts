import type { DiscussionItem, Item } from '@/types/bcr.type';
import ActivitiesLog from '@/views/budget/components/card/ActivitiesLog.vue';
import DiscussionThread from '@/views/budget/components/card/DiscussionThread.vue';
import { Motion } from '@motionone/vue';
import { computed, defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    name: 'ViewBCR',
    components: { Motion, ActivitiesLog, DiscussionThread },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const roNumber = ref<string>((route.params.requestNo as string) || '');
        const requestBy = ref('Jakson');
        const requestDate = ref('29/9/2025');

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

        const totalVarianceAmount = computed(() => {
            return items.value.reduce((sum, item) => sum + (item.varianceAmount || 0), 0);
        });

        const isAttachmentValid = ref(true);
        const activeTab = ref('detail');
        const tabItems = [
            { label: 'Detail', value: 'detail' },
            { label: 'Activities Log', value: 'activities' }
        ];
        return {
            roNumber,
            requestBy,
            requestDate,
            items,
            totalVarianceAmount,
            isAttachmentValid,
            goBack: () => router.push({ name: 'bcr' }),
            discussionData,
            active: ref('0'),
            activeTab,
            tabItems
        };
    }
});
