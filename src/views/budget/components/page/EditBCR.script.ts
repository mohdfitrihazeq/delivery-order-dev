import { useBudgetStore } from '@/stores/budget/budgetChangeRequest.store';
import type { BudgetChangeItem, BudgetChangeRequest } from '@/types/bcr.type';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    name: 'EditBCR',
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useBudgetStore();
        const { singleBudgetChangeRequest, loading } = storeToRefs(store);

        const roNumber = ref('');
        const requestBy = ref('');
        const requestDate = ref<Date | null>(null);
        const reason = ref('');

        const reasonOptions = ref([
            { label: 'Exceed Budget', value: 'Exceed Budget' },
            { label: 'Mockup Remeasurement', value: 'Mockup Remeasurement' },
            { label: 'QS remeasurement', value: 'QS remeasurement' },
            { label: 'VO', value: 'VO' },
            { label: 'Others', value: 'Others' }
        ]);

        const items = ref<BudgetChangeItem[]>([]);

        const itemOptions = computed(() => {
            const map = new Map<string, { label: string; value: string; description: string; uom: string; unitPrice: string }>();
            for (const it of items.value) {
                const code = it.ItemCode ?? '';
                if (!map.has(code)) {
                    map.set(code, {
                        label: code || it.Name || '',
                        value: code || '',
                        description: it.Description ?? it.Name ?? '',
                        uom: it.Uom ?? '',
                        unitPrice: it.UnitPrice ?? '0'
                    });
                }
            }
            return Array.from(map.values());
        });

        onMounted(async () => {
            const id = Number(route.params.id ?? route.params.requestNo ?? 0);
            if (!id) return;

            await store.getSingleBudgetChange(id);

            if (singleBudgetChangeRequest.value) {
                const s = singleBudgetChangeRequest.value as BudgetChangeRequest;
                roNumber.value = s.DocNo ?? '';
                requestBy.value = s.RequestedBy ?? '';
                requestDate.value = s.RequestDate ? new Date(s.RequestDate) : null;
                reason.value = s.Reason ?? '';

                items.value = (s.BudgetChangeItem ?? []).map((x) => ({
                    Id: x.Id ?? 0,
                    BudgetChangeId: x.BudgetChangeId ?? 0,
                    BudgetItemId: x.BudgetItemId ?? 0,
                    ItemCode: x.ItemCode ?? '',
                    Name: x.Name ?? '',
                    Uom: x.Uom ?? '',
                    UnitPrice: x.UnitPrice ?? '0',
                    OrderedQty: x.OrderedQty ?? '0',
                    NewOrder: x.NewOrder ?? '0',
                    ExceededQty: x.ExceededQty ?? '0',
                    Description: x.Description ?? '',
                    Remark: x.Remark ?? '',
                    CreatedAt: x.CreatedAt ?? '',
                    CreatedBy: x.CreatedBy ?? null,
                    UpdatedAt: x.UpdatedAt ?? '',
                    UpdatedBy: x.UpdatedBy ?? null,
                    location: x.location ?? '',
                    element: x.element ?? ''
                }));
            } else {
                items.value = [];
            }
        });

        const addItem = () => {
            items.value.push({
                Id: 0,
                BudgetChangeId: 0,
                BudgetItemId: 0,
                ItemCode: '',
                Name: '',
                Uom: '',
                UnitPrice: '0',
                OrderedQty: '0',
                NewOrder: '0',
                ExceededQty: '0',
                Description: '',
                Remark: '',
                CreatedAt: '',
                CreatedBy: null,
                UpdatedAt: '',
                UpdatedBy: null,
                location: '',
                element: ''
            });
        };

        const removeItem = (index: number) => items.value.splice(index, 1);

        const fillItemDetails = (item: BudgetChangeItem) => {
            const opt = itemOptions.value.find((o) => o.value === item.ItemCode);
            if (opt) {
                item.Description = opt.description;
                item.Uom = opt.uom;
                item.UnitPrice = opt.unitPrice;
                item.Name = opt.label;
            }
        };

        const computeExceededPct = (it: BudgetChangeItem) => {
            const ordered = Number(it.OrderedQty) || 0;
            const newOrder = Number(it.NewOrder) || 0;
            if (ordered === 0) return 0;
            return (((newOrder - ordered) / ordered) * 100).toFixed(2);
        };

        const computeEstimatedExceed = (it: BudgetChangeItem) => {
            const unit = Number(it.UnitPrice) || 0;
            const ordered = Number(it.OrderedQty) || 0;
            const newOrder = Number(it.NewOrder) || 0;
            return (Math.max(0, newOrder - ordered) * unit).toFixed(2);
        };

        const totalVarianceAmount = computed(() => items.value.reduce((sum, it) => sum + (Number(it.UnitPrice) || 0) * (Number(it.NewOrder) || 0), 0));

        const submitRequest = async () => {
            const payload: BudgetChangeRequest = {
                Id: singleBudgetChangeRequest.value?.Id ?? 0,
                ProjectId: singleBudgetChangeRequest.value?.ProjectId ?? 0,
                DocNo: roNumber.value,
                RequestDate: requestDate.value,
                RequestedBy: requestBy.value,
                Reason: reason.value,
                Department: singleBudgetChangeRequest.value?.Department ?? '',
                Remark: singleBudgetChangeRequest.value?.Remark ?? '',
                TotalAmount: totalVarianceAmount.value,
                Attachment: singleBudgetChangeRequest.value?.Attachment ?? '',
                Status: singleBudgetChangeRequest.value?.Status ?? '',
                CreatedBy: singleBudgetChangeRequest.value?.CreatedBy ?? null,
                CreatedAt: singleBudgetChangeRequest.value?.CreatedAt ?? '',
                UpdatedAt: singleBudgetChangeRequest.value?.UpdatedAt ?? '',
                UpdatedBy: singleBudgetChangeRequest.value?.UpdatedBy ?? null,
                BudgetChangeItem: items.value
            };
            const isSuccess = await store.editBudgetChangeRequest(payload as any, payload.Id);

            if (isSuccess) router.push('/bcr');
        };

        const calcExceedQty = (it: BudgetChangeItem): number => {
            return Number(it.NewOrder || 0) - Number(it.OrderedQty || 0);
        };

        const calcExceedPercent = (it: BudgetChangeItem): number => {
            const ordered = Number(it.OrderedQty) || 0;
            if (ordered === 0) return 0;
            return (calcExceedQty(it) / ordered) * 100;
        };

        const calcEstimatedExceed = (it: BudgetChangeItem): number => {
            const unit = Number(it.UnitPrice) || 0;
            return calcExceedQty(it) * unit;
        };

        const getColorClass = (val: number): string => {
            if (val > 0) return 'text-red-600 font-bold';
            if (val < 0) return 'text-green-600 font-bold';
            return 'text-gray-700';
        };

        return {
            loading,
            roNumber,
            requestBy,
            requestDate,
            reason,
            reasonOptions,
            items,
            itemOptions,
            addItem,
            removeItem,
            fillItemDetails,
            computeExceededPct,
            computeEstimatedExceed,
            totalVarianceAmount,
            submitRequest,
            calcExceedQty,
            calcExceedPercent,
            calcEstimatedExceed,
            getColorClass,
            goBack: () => router.push('/bcr')
        };
    }
});
