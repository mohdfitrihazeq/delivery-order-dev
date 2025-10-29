import { useBudgetChangeRequestStore } from '@/stores/budget/budgetChangeRequest.store';
import type { BudgetChangeItem, BudgetChangeRequest } from '@/types/budgetChangeRequest.type';
import ActivitiesLog from '@/views/budget/components/card/ActivitiesLog.vue';
import DiscussionThread from '@/views/budget/components/card/DiscussionThread.vue';
import { Motion } from '@motionone/vue';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    name: 'ViewBCR',
    components: { Motion, ActivitiesLog, DiscussionThread },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useBudgetChangeRequestStore();
        const projectName = ref<string>('');
        const singleBudgetChangeRequest = ref<BudgetChangeRequest | null>(null);
        onMounted(async () => {
            if (route.params.requestNo) {
                const data = await store.getSingleBudgetChange(Number(route.params.requestNo));

                singleBudgetChangeRequest.value = data;
            }

            const projectStr = localStorage.getItem('selectedProject');
            if (projectStr) {
                try {
                    const project = JSON.parse(projectStr);
                    projectName.value = project.name || '';
                } catch (e) {
                    console.error('Failed to parse selectedProject from localStorage', e);
                }
            }
        });

        const roNumber = computed(() => singleBudgetChangeRequest.value?.DocNo || '');
        const requestBy = computed(() => singleBudgetChangeRequest.value?.RequestedBy || '');
        const requestDate = computed(() => {
            const date = singleBudgetChangeRequest.value?.RequestDate;
            if (!date) return '';
            return typeof date === 'string' ? new Date(date).toLocaleDateString() : new Date(date).toLocaleDateString();
        });

        const items = computed<BudgetChangeItem[]>(() => {
            return singleBudgetChangeRequest.value?.budgetchangeitem || [];
        });

        const itemsWithCalc = computed(() => {
            return (items.value || []).map((item) => {
                const orderedQty = Number(item.OrderedQty || 0);
                const newOrder = Number(item.NewOrder || 0);
                const unitPrice = Number(item.UnitPrice || 0);

                const exceededQty = newOrder - orderedQty;
                const exceededPercent = orderedQty ? (exceededQty / orderedQty) * 100 : 0;
                const estimatedExceed = exceededQty * unitPrice;
                const varianceQty = exceededQty;
                const varianceAmount = estimatedExceed;

                return {
                    ...item,
                    ExceededQty: exceededQty,
                    ExceededPercent: exceededPercent,
                    EstimatedExceed: estimatedExceed,
                    VarianceQty: varianceQty,
                    VarianceAmount: varianceAmount
                };
            });
        });

        const totalVarianceAmount = computed(() => {
            return itemsWithCalc.value.reduce((sum, item) => sum + Number(item.VarianceAmount || 0), 0);
        });

        const activeTab = ref('detail');
        const tabItems = [
            { label: 'Detail', value: 'detail' },
            { label: 'Activities Log', value: 'activities' }
        ];

        const discussionData = ref([
            {
                role: 'Site',
                name: 'John Smith',
                datetime: '08/09/2024, 23:30:00',
                message: 'Current tiles are adequate. Upgrade not essential from operational perspective.',
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

        const goBack = () => router.push({ name: 'bcr' });

        const formatPrice = (value: number | string) => {
            const num = Number(value);
            return isNaN(num) ? '-' : num.toLocaleString(undefined, { minimumFractionDigits: 2 });
        };

        const formatNumber = (value: number | string) => {
            const num = Number(value);
            return isNaN(num) ? '-' : num.toLocaleString();
        };

        const formatPercent = (value: number | string) => {
            const num = Number(value);
            return isNaN(num) ? '-' : num.toFixed(2) + '%';
        };

        return {
            roNumber,
            requestBy,
            projectName,
            requestDate,
            itemsWithCalc,
            totalVarianceAmount,
            discussionData,
            goBack,
            activeTab,
            tabItems,
            formatPrice,
            formatNumber,
            formatPercent,
            singleBudgetChangeRequest
        };
    }
});
