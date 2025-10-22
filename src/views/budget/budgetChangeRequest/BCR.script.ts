import ReusableTable from '@/components/table/ReusableTable.vue';
import { useBudgetStore } from '@/stores/budget/budgetChangeRequest.store';
import type { BudgetChangeRequest } from '@/types/bcr.type';
import type { CardItem } from '@/types/card.type';
import type { TableColumn } from '@/types/table.type';
import CommentBCR from '@/views/budget/components/dialog/CreateBCRModal.vue';
import Badge from 'primevue/badge';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'BudgetChangeRequest',
    components: { ReusableTable, CommentBCR, Badge },
    setup() {
        const BudgetChangeRequestSummaryData = computed<CardItem[]>(() => {
            const draftCount = budgetChangeRequestData.value.filter((item) => item.Status === 'Draft').length;
            const reviewCount = budgetChangeRequestData.value.filter((item) => item.Status === 'Under Review').length;
            const approvedItems = budgetChangeRequestData.value.filter((item) => item.Status === 'Approved');
            const approvedCount = approvedItems.length;

            const totalApprovedValue = approvedItems.reduce((sum, item) => sum + (item.TotalAmount || 0), 0);
            const formattedTotal = totalApprovedValue.toLocaleString(undefined, { minimumFractionDigits: 2 });

            return [
                { title: 'Draft', value: draftCount.toString(), description: 'Draft for request', icon: 'pi pi-exclamation-triangle', color: 'orange' },
                { title: 'Under Review', value: reviewCount.toString(), description: 'Ready for review', icon: 'pi pi-comment', color: 'red' },
                { title: 'Approved', value: approvedCount.toString(), description: 'Ready for implement', icon: 'pi pi-check-circle', color: 'green' },
                { title: 'Total Value', value: `$ ${formattedTotal}`, description: 'Estimated budget impact', icon: 'pi pi-chart-line', color: 'blue' }
            ];
        });

        const budgetStore = useBudgetStore();
        onMounted(async () => {
            await budgetStore.fetchBudgetChangesRequestList();
        });

        const budgetChangeRequestData = computed(() => {
            return budgetStore.budgetChangeRequestList.map((item) => ({
                ...item,
                actions: item.Status === 'Approved' ? ['view'] : ['view', 'edit']
            }));
        });

        const searchTerm = ref<string>('');
        const activeFilters = ref<Record<string, string | number | boolean> | null>(null);

        const extraFilters = [
            {
                type: 'select',
                field: 'status',
                placeholder: 'All Status',
                options: [
                    { label: 'All Status', value: '' },
                    { label: 'Draft', value: 'Draft' },
                    { label: 'Under Review', value: 'Under Review' },
                    { label: 'Approved', value: 'Approved' },
                    { label: 'Rejected', value: 'Rejected' }
                ]
            }
        ];

        const showCommentModal = ref(false);
        const selectedRequestNo = ref<string | null>(null);

        const filteredRequests = computed(() =>
            budgetChangeRequestData.value.filter((r) => {
                const matchSearch = !searchTerm.value || r.DocNo.toLowerCase().includes(searchTerm.value.toLowerCase());
                const statusFilter = activeFilters.value?.status;
                const matchStatus = !statusFilter ? true : r.Status === statusFilter;

                return matchSearch && matchStatus;
            })
        );

        const tableColumns = computed<TableColumn[]>(() => [
            { field: 'DocNo', header: 'Request No' },
            { field: 'ProjectId', header: 'Project Code' },
            { field: 'RequestedBy', header: 'Requested By' },
            { field: 'RequestDate', header: 'Date Requested' },
            { field: 'Status', header: 'Status', bodySlot: 'status' },
            { field: 'BudgetChangeItem', header: '# Materials', bodySlot: 'materials' },
            { field: 'TotalAmount', header: 'Variance Amount', bodySlot: 'TotalAmount' },
            { field: 'actions', header: 'Actions', action: true }
        ]);
        function getStatusSeverity(Status: string) {
            switch (Status) {
                case 'Approved':
                    return 'success';
                case 'Rejected':
                    return 'danger';
                case 'Under Review':
                    return 'warn';
                default:
                    return 'info';
            }
        }

        function handleSearch(val: string) {
            searchTerm.value = val;
        }

        function handleFilterChange(filters: Record<string, string | number | boolean>) {
            activeFilters.value = filters;
        }

        const router = useRouter();

        function handleActionClick(type: 'edit' | 'view', rowData: BudgetChangeRequest) {
            if (type === 'edit') {
                router.push(`/bcr/edit/${rowData.Id}`);
            } else if (type === 'view') {
                router.push(`/bcr/view/${rowData.Id}`);
            }
        }

        return {
            budgetChangeRequestData,
            filteredRequests,
            searchTerm,
            activeFilters,
            extraFilters,
            tableColumns,
            getStatusSeverity,
            handleSearch,
            handleFilterChange,
            handleActionClick,
            showCommentModal,
            selectedRequestNo,
            BudgetChangeRequestSummaryData
        };
    }
});
