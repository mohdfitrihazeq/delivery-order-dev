import BaseTab from '@/components/tab/BaseTab.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import type { RequestData } from '@/types/bcr.type';
import type { CardItem } from '@/types/card.type';
import type { TableColumn } from '@/types/table.type';
import EditBCR from '@/views/budget/components/modal/EditBCR.vue';
import ViewBCR from '@/views/budget/components/modal/ViewBCR.vue';
import { Motion } from '@motionone/vue';
import Badge from 'primevue/badge';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'BudgetChangeRequest',
    components: {
        BaseTab,
        Motion,
        ReusableTable,
        Badge,
        EditBCR,
        ViewBCR
    },
    setup() {
        const user = localStorage.getItem('user');
        let userRole = '';
        if (user) {
            try {
                const parsed = JSON.parse(user);
                userRole = parsed.role || '';
            } catch {
                userRole = '';
            }
        }

        const isPurchasingRole = userRole.toLowerCase() === 'purchasing';

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
                actions: ['view', 'comment']
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
            },
            {
                requestNo: 'BCR2024090004',
                projectCode: 'PROJ001',
                requestedBy: 'Sarah Wilson',
                role: 'QS',
                dateRequested: '08/09/2024',
                status: 'Rejected',
                materials: 1,
                varianceAmount: '+$34,875',
                actions: ['view', 'edit']
            }
        ]);

        const extraFilters = [
            {
                type: 'select',
                field: 'status',
                placeholder: 'Filter by Status',
                options: [
                    { label: 'All Status', value: '' },
                    { label: 'Draft', value: 'Draft' },
                    { label: 'Submitted', value: 'Submitted' },
                    { label: 'Under Review', value: 'Under Review' },
                    { label: 'Approved', value: 'Approved' },
                    { label: 'Rejected', value: 'Rejected' }
                ]
            }
        ];

        const searchTerm = ref('');
        const activeFilters = ref<Record<string, any>>({});

        const filteredRequests = computed(() => {
            return requestList.value.filter((r) => {
                const matchesSearch =
                    !searchTerm.value ||
                    r.requestNo.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                    r.projectCode.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                    r.requestedBy.toLowerCase().includes(searchTerm.value.toLowerCase());

                const matchesStatus = !activeFilters.value.status || r.status === activeFilters.value.status;

                return matchesSearch && matchesStatus;
            });
        });

        const tableColumns = computed<TableColumn[]>(() => {
            const baseColumns: TableColumn[] = [
                { field: 'requestNo', header: 'Request No', sortable: false },
                { field: 'projectCode', header: 'Project Code', sortable: true },
                { field: 'requestedBy', header: 'Requested By', sortable: true },
                { field: 'dateRequested', header: 'Date Requested', sortable: true },
                { field: 'status', header: 'Status', sortable: true, bodySlot: 'status' },
                { field: 'materials', header: '# Materials', sortable: true },
                { field: 'varianceAmount', header: 'Variance Amount', sortable: true, bodySlot: 'varianceAmount' }
            ];

            const actionColumn: TableColumn = {
                field: 'actions',
                header: 'Actions',
                action: true,
                actions: ['view', 'edit', 'comment']
            };

            return [...baseColumns, actionColumn];
        });

        const BudgetChangeRequestSummaryData: CardItem[] = [
            { title: 'Pending Review', value: '1', description: 'Requires attention', icon: 'pi pi-exclamation-triangle', color: 'orange' },
            { title: 'Under Review', value: '1', description: 'Ready for review', icon: 'pi pi-comment', color: 'red' },
            { title: 'Approved', value: '1', description: 'Ready for implementation', icon: 'pi pi-check-circle', color: 'green' },
            { title: 'Total Value', value: '$ 43,295', description: 'Estimated budget impact', icon: 'pi pi-chart-line', color: 'blue' }
        ];

        function getStatusSeverity(status: string): string {
            switch (status) {
                case 'Approved':
                    return 'success';
                case 'Rejected':
                    return 'danger';
                case 'Under Review':
                    return 'warning';
                case 'Draft':
                    return 'info';
                case 'Submitted':
                    return 'secondary';
                default:
                    return 'info';
            }
        }

        function handleActionClick(type: 'edit' | 'view' | 'delete' | 'comment', rowData: RequestData) {
            console.log('Action:', type, rowData);
        }

        return {
            requestList,
            filteredRequests,
            searchTerm,
            activeFilters,
            extraFilters,
            tableColumns,
            getStatusSeverity,
            isPurchasingRole,
            handleActionClick,
            BudgetChangeRequestSummaryData
        };
    }
});
