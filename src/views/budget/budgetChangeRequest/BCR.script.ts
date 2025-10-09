import ReusableTable from '@/components/table/ReusableTable.vue';
import type { RequestData } from '@/types/bcr.type';
import type { CardItem } from '@/types/card.type';
import type { TableColumn } from '@/types/table.type';
import CommentBCR from '@/views/budget/components/modal/CreateBCRModal.vue';
import Badge from 'primevue/badge';
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'BudgetChangeRequest',
    components: { ReusableTable, CommentBCR, Badge },
    setup() {
        const BudgetChangeRequestSummaryData: CardItem[] = [
            { title: 'Pending Review', value: '1', description: 'Requires attention', icon: 'pi pi-exclamation-triangle', color: 'orange' },
            { title: 'Under Review', value: '1', description: 'Ready for review', icon: 'pi pi-comment', color: 'red' },
            { title: 'Approved', value: '1', description: 'Ready for implement', icon: 'pi pi-check-circle', color: 'green' },
            { title: 'Total Value', value: '$ 43,295', description: 'Estimated budget impact', icon: 'pi pi-chart-line', color: 'blue' }
        ];

        const requestList = ref<RequestData[]>([
            {
                requestNo: 'BCR2024090001',
                projectCode: 'PROJ001',
                requestedBy: 'Jane Doe',
                role: 'PM',
                dateRequested: '15/09/2024',
                status: 'Under Review',
                materials: 2,
                varianceAmount: '+$3,865',
                actions: ['view', 'edit']
            },
            {
                requestNo: 'BCR2024090002',
                projectCode: 'PROJ001',
                requestedBy: 'John Smith',
                role: 'Site',
                dateRequested: '10/09/2024',
                status: 'Approved',
                materials: 1,
                varianceAmount: '+$4,554',
                actions: ['view']
            }
        ]);

        const searchTerm = ref('');
        const activeFilters = ref<Record<string, any>>({});
        const showCommentModal = ref(false);
        const selectedRequestNo = ref<string | null>(null);

        const filteredRequests = computed(() =>
            requestList.value.filter(
                (r) =>
                    (!searchTerm.value ||
                        r.requestNo.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                        r.projectCode.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                        r.requestedBy.toLowerCase().includes(searchTerm.value.toLowerCase())) &&
                    (!activeFilters.value.status || r.status === activeFilters.value.status)
            )
        );

        const tableColumns = computed<TableColumn[]>(() => [
            { field: 'requestNo', header: 'Request No' },
            { field: 'projectCode', header: 'Project Code' },
            { field: 'requestedBy', header: 'Requested By' },
            { field: 'dateRequested', header: 'Date Requested' },
            { field: 'status', header: 'Status', bodySlot: 'status' },
            { field: 'materials', header: '# Materials' },
            { field: 'varianceAmount', header: 'Variance Amount', bodySlot: 'varianceAmount' },
            {
                field: 'actions',
                header: 'Actions',
                action: true
            }
        ]);

        function getStatusSeverity(status: string) {
            switch (status) {
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
        const router = useRouter();
        function handleActionClick(type: 'edit' | 'view', rowData: RequestData) {
            if (type === 'edit') {
                router.push(`/bcr/edit/${rowData.requestNo}`);
            } else {
                router.push(`/bcr/view/${rowData.requestNo}`);
            }
        }

        function handleCommentSubmit(requestNo: string, comment: string) {
            console.log('💬 Comment submitted:', requestNo, comment);
            showCommentModal.value = false;
        }

        return {
            requestList,
            filteredRequests,
            searchTerm,
            activeFilters,
            tableColumns,
            getStatusSeverity,
            handleActionClick,
            showCommentModal,
            selectedRequestNo,
            handleCommentSubmit,
            BudgetChangeRequestSummaryData
        };
    }
});
