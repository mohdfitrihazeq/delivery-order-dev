import { useBudgetStore } from '@/stores/budget/budget.store';
import type { FilterVersion } from '@/types/budget.type';
import type { TableColumn } from '@/types/table.type';
import { defineComponent, onMounted, ref, watch } from 'vue';

import BaseTab from '@/components/tab/BaseTab.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import Overview from '@/views/budget/budgetOverview/Overview.vue';
import BudgetImportModal from '@/views/budget/components/dialog/BudgetImport.vue';

import { Motion } from '@motionone/vue';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import SelectButton from 'primevue/selectbutton';
import Tag from 'primevue/tag';

interface PaginationConfig {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

export default defineComponent({
    name: 'BudgetManagement',
    components: {
        BaseTab,
        Motion,
        Badge,
        Button,
        Dropdown,
        SelectButton,
        Tag,
        ReusableTable,
        Overview,
        BudgetImportModal
    },
    setup() {
        const budgetStore = useBudgetStore();

        // ---------------------------
        // 1. Static
        // ---------------------------
        const viewOptions = [
            { label: 'Overview', value: 'overview' },
            { label: 'Detail', value: 'detail' }
        ];

        const columns: TableColumn[] = [
            { field: 'ItemCode', header: 'Item Code', sortable: true },
            { field: 'Description', header: 'Description', sortable: true },
            { field: 'Location1', header: 'Location', sortable: true },
            { field: 'Element', header: 'Element', sortable: true },
            { field: 'SubElement', header: '1st Sub Element', sortable: true },
            { field: 'SubSubElement', header: '2nd Sub Element', sortable: true },
            { field: 'Unit', header: 'UOM', sortable: true },
            { field: 'Quantity', header: 'Qty', sortable: true },
            { field: 'Rate', header: 'Rate', sortable: true, bodySlot: 'rate' },
            { field: 'Amount', header: 'Amount', sortable: true, bodySlot: 'amount' },
            { header: 'Action', action: true, actions: ['edit', 'delete'] }
        ];

        // ---------------------------
        // 2. State
        // ---------------------------
        const versions = ref<FilterVersion[]>([]);
        const selectedVersion = ref<string>('');
        const budgetItems = ref<any[]>([]);

        const pagination = ref<PaginationConfig>({
            total: 0,
            totalPages: 1,
            page: 1,
            pageSize: 10
        });

        const viewMode = ref<'overview' | 'detail'>('overview');
        const search = ref('');
        const showImportModal = ref(false);
        const filters = ref<Record<string, any>>({});

        // ---------------------------
        // 3. Methods
        // ---------------------------
        const fetchBudgetList = async () => {
            const projectId = JSON.parse(localStorage.getItem('selectedProject') || '{}')?.ProjectId;
            if (!projectId) {
                console.error('No valid projectId found in selectedProject');
                return;
            }

            const version = selectedVersion.value || undefined;
            const { page, pageSize } = pagination.value;

            const response = await budgetStore.fetchBudgetList(projectId, version, page, pageSize);

            if (!response) return;

            const currentBudget = budgetStore.currentBudget;
            budgetItems.value = currentBudget?.budgetitems || [];
            pagination.value.total = response.pagination?.totalBudgetItems ?? 0;
            pagination.value.totalPages = response.pagination?.totalPages ?? 1;

            if (versions.value.length === 0 && response.data?.length) {
                versions.value = response.data.map((b) => ({
                    label: `Version ${b.VersionCode}`,
                    value: String(b.VersionCode),
                    latest: b.Status === 'Approved'
                }));

                const latest = versions.value.find((v) => v.latest) || versions.value[0];
                if (latest) selectedVersion.value = latest.value;
            }
        };

        const handlePageChange = async (page: number) => {
            pagination.value.page = page;
            await fetchBudgetList();
        };

        const handlePageSizeChange = async (size: number) => {
            pagination.value.pageSize = size;
            pagination.value.page = 1;
            await fetchBudgetList();
        };

        function handleSearch(value: string) {
            search.value = value;
            filters.value.global = { value };
        }

        function handleImportClick() {
            showImportModal.value = true;
        }

        function handleAction(type: 'delete' | 'edit', row: any) {
            if (type === 'delete') {
                console.log('Deleting:', row);
            } else if (type === 'edit') {
                console.log('Editing:', row);
            }
        }

        // ---------------------------
        // 4. Lifecycle
        // ---------------------------
        onMounted(() => {
            fetchBudgetList();
        });

        watch(selectedVersion, async () => {
            pagination.value.page = 1;
            await fetchBudgetList();
        });

        // ---------------------------
        // 5. Expose
        // ---------------------------
        return {
            versions,
            viewOptions,
            budgetItems,
            columns,
            selectedVersion,
            viewMode,
            search,
            showImportModal,
            pagination,
            filters,
            handleImportClick,
            handleAction,
            onSearchWrapper: handleSearch,
            handlePageChange,
            handlePageSizeChange
        };
    }
});
