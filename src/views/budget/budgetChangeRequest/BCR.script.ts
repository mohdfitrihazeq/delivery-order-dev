import ReusableTable from '@/components/table/ReusableTable.vue';
import { useBudgetChangeRequestStore } from '@/stores/budget/budgetChangeRequest.store';
import type { BudgetChangeRequest } from '@/types/budgetChangeRequest.type';
import type { CardItem } from '@/types/card.type';
import type { TableColumn } from '@/types/table.type';
import { formatDate } from '@/utils/dateHelper';
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

        const budgetStore = useBudgetChangeRequestStore();
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

        const filteredRequests = computed(() => {
            return budgetChangeRequestData.value.filter((r) => {
                const matchSearch = !budgetStore.filters.search || r.DocNo.toLowerCase().includes(budgetStore.filters.search.toLowerCase());

                const statusFilter = budgetStore.filters.status;
                const matchStatus = !statusFilter ? true : r.Status === statusFilter;

                return matchSearch && matchStatus;
            });
        });

        const paginatedRequests = computed(() => {
            const start = (budgetStore.pagination.page - 1) * budgetStore.pagination.pageSize;
            const end = start + budgetStore.pagination.pageSize;
            return filteredRequests.value.slice(start, end);
        });

        const tableColumns = computed<TableColumn[]>(() => [
            { field: 'rowIndex', header: '#' },
            { field: 'DocNo', header: 'Request No' },
            { field: 'ProjectId', header: 'Project Code' },
            { field: 'RequestedBy', header: 'Requested By' },
            {
                field: 'RequestDate',
                header: 'Date Requested',
                body: (rowData: BudgetChangeRequest) => formatDate(rowData.RequestDate)
            },
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

        function handlePageChange(page: number) {
            budgetStore.setPage(page);
        }

        function handlePageSizeChange(size: number) {
            budgetStore.setPageSize(size);
        }

        function handleSearch(value: string) {
            budgetStore.handleSearch(value);
        }

        function handleFilterChange(filters: Record<string, any>) {
            budgetStore.handleFilterChange(filters);
        }

        const router = useRouter();

        function handleActionClick(type: 'edit' | 'view', rowData: BudgetChangeRequest) {
            if (type === 'edit') {
                router.push(`/bcr/edit/${rowData.Id}`);
            } else if (type === 'view') {
                router.push(`/bcr/view/${rowData.Id}`);
            }
        }

        const startingIndex = computed(() => {
            return (budgetStore.pagination.page - 1) * budgetStore.pagination.pageSize;
        });

        const numberedRequests = computed(() => {
            return paginatedRequests.value.map((item, index) => ({
                ...item,
                rowIndex: startingIndex.value + index + 1
            }));
        });

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
            BudgetChangeRequestSummaryData,
            paginatedRequests,
            handlePageChange,
            handlePageSizeChange,
            pagination: budgetStore.pagination,
            budgetStore,
            numberedRequests
        };
    }
});
