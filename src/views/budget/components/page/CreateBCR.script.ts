// CreateBCR.script.ts
import { useBudgetStore } from '@/stores/budget/budgetChangeRequest.store';
import type { BudgetChangeItem, BudgetChangeRequestPayload } from '@/types/bcr.type';
import MeterialModal from '@/views/budget/components/dialog/CreateBCRModal.vue';
import { Motion } from '@motionone/vue';
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

interface TableItem {
    itemCode: string;
    description: string;
    uom: string;
    unitPrice: number;
    budgetQty: number;
    orderedQty: number;
    newOrder: number;
    remark: string;
}

export default defineComponent({
    name: 'CreateBCR',
    components: { Motion, MeterialModal },
    setup() {
        const router = useRouter();
        const budgetStore = useBudgetStore();

        // --- Header ---
        const roNumber = ref('RO2025208757');
        const localUser = JSON.parse(localStorage.getItem('user') || '{}');
        const requestBy = ref(localUser.username || '');
        const department = ref(localUser.role || '');
        const today = new Date();
        const requestDate = ref(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
        const selectedReason = ref<string | null>(null);
        const remarks = ref('');

        // --- Reason Options ---
        const reasonOptions = ref([
            { label: 'Exceed Budget', value: 'Exceed Budget' },
            { label: 'Mockup Remeasurement', value: 'Mockup Remeasurement' },
            { label: 'QS remeasurement', value: 'QS remeasurement' },
            { label: 'VO', value: 'VO' },
            { label: 'Others', value: 'Others' }
        ]);

        // --- Items Table ---
        const items = ref<TableItem[]>([]);
        const itemOptions = ref([
            { label: 'STL-01', value: 'STL-01', description: 'Steel reinforcement bar 60mm', uom: 'Ton' },
            { label: 'CEM-02', value: 'CEM-02', description: 'Cement Portland Type I', uom: 'Bag' }
        ]);

        const fillItemDetails = (item: TableItem) => {
            const selected = itemOptions.value.find((o) => o.value === item.itemCode);
            if (selected) {
                item.description = selected.description ?? item.description;
                item.uom = selected.uom ?? item.uom;
            }
        };

        const getItemLabel = (value: string) => {
            const selected = itemOptions.value.find((o) => o.value === value);
            return selected ? selected.label : value;
        };

        // --- Modal ---
        const showBulkItemModal = ref(false);
        const openMeterial = () => (showBulkItemModal.value = true);
        const handleBulkItems = (selectedMaterials: BudgetChangeItem[]) => {
            selectedMaterials.forEach((mat) => {
                if (!items.value.some((i) => i.itemCode === mat.ItemCode)) {
                    items.value.push({
                        itemCode: mat.ItemCode,
                        description: mat.Name?.trim() || mat.Description || '',
                        uom: mat.Uom || '',
                        unitPrice: Number(mat.UnitPrice) || 0,
                        budgetQty: 0,
                        orderedQty: Number(mat.OrderedQty) || 0,
                        newOrder: Number(mat.NewOrder) || 0,
                        remark: mat.Remark || ''
                    });
                }
            });
            showBulkItemModal.value = false;
        };

        // --- Calculations ---
        const calcExceedQty = (item: TableItem) => (item.newOrder || 0) - (item.orderedQty || 0);
        const calcExceedPercent = (item: TableItem) => {
            const budget = item.budgetQty || 0;
            if (!budget) return 0;
            return (calcExceedQty(item) / budget) * 100;
        };
        const calcEstimatedExceed = (item: TableItem) => calcExceedQty(item) * (item.unitPrice || 0);
        const totalVarianceAmount = computed(() => items.value.reduce((acc, it) => acc + calcEstimatedExceed(it), 0));

        const isAttachmentValid = ref(true);

        // --- Export CSV ---
        const handleExport = () => {
            const headers = ['Item Code', 'Description', 'UOM', 'Unit Price', 'Budget Qty', 'Ordered Qty', 'New Order', 'Remark'];
            const rows = items.value.map((it) => [it.itemCode, it.description, it.uom, it.unitPrice, it.budgetQty, it.orderedQty, it.newOrder, it.remark]);
            const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'bcr-items.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };

        // --- Submit Request ---
        const submitRequest = async () => {
            if (items.value.length === 0) return;

            const payload: BudgetChangeRequestPayload = {
                DocNo: roNumber.value,
                RequestDate: requestDate.value,
                RequestedBy: requestBy.value,
                Department: department.value,
                Remark: remarks.value,
                TotalAmount: totalVarianceAmount.value,
                Reason: selectedReason.value || '',
                Type: 'BudgetChangeRequest',
                Items: items.value.map((i) => ({
                    ItemCode: i.itemCode,
                    Name: i.description,
                    Uom: i.uom,
                    UnitPrice: i.unitPrice,
                    OrderedQty: i.orderedQty,
                    NewOrder: i.newOrder,
                    Description: i.description,
                    Remark: i.remark,
                    location: '',
                    element: ''
                }))
            };

            const result = await budgetStore.createBudgetChangeRequest(payload as any);
            if (result) router.push({ name: 'budgetChangeRequest' });
        };

        const goBack = () => router.push({ name: 'budgetChangeRequest' });

        return {
            roNumber,
            requestBy,
            department,
            requestDate,
            selectedReason,
            remarks,
            reasonOptions,
            items,
            itemOptions,
            fillItemDetails,
            getItemLabel,
            showBulkItemModal,
            openMeterial,
            handleBulkItems,
            calcExceedQty,
            calcExceedPercent,
            calcEstimatedExceed,
            totalVarianceAmount,
            isAttachmentValid,
            handleExport,
            submitRequest,
            goBack
        };
    }
});
