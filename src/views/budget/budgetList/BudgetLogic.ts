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
import ConfirmPopup from 'primevue/confirmpopup';

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
        BudgetImportModal,
        ConfirmPopup
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
            { field: 'Amount', header: 'Amount', sortable: true, bodySlot: 'amount' }
        ];

        // ---------------------------
        // 2. State
        // ---------------------------
        const versions = ref<FilterVersion[]>([]);
        const selectedVersion = ref<string>('');
        const latestBudgetId = ref<number | null>(null);
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

        const fetchBudgetVersionList = async () => {
            const projectId = JSON.parse(localStorage.getItem('selectedProject') || '{}')?.ProjectId;
            if (!projectId) return;

            const response = await budgetStore.fetchBudgetVersionList(projectId);
            if (!response) return;

            const sorted = [...response].sort((a, b) => Number(a.VersionCode) - Number(b.VersionCode));
            const latestVersionCode = Math.max(...sorted.map((v) => Number(v.VersionCode)));

            versions.value = sorted.map((item) => ({
                label: `Version ${item.VersionCode}`,
                value: String(item.VersionCode),
                latest: Number(item.VersionCode) === latestVersionCode,
                id: item.Id
            }));

            const latest = versions.value.find((v) => v.latest);
            if (latest) {
                selectedVersion.value = latest.value;
                latestBudgetId.value = latest.id!;
                await fetchBudgetList(latest.id!);
            }
        };

        const fetchBudgetList = async (budgetId: number) => {
            const { page, pageSize } = pagination.value;
            const response = await budgetStore.fetchBudgetList(budgetId, page, pageSize);

            if (!response) return;
            budgetItems.value = response.data || [];

            pagination.value.total = response.pagination?.totalBudgetItems ?? 0;
            pagination.value.totalPages = response.pagination?.totalPages ?? 1;
        };

        watch(selectedVersion, async (newVersion) => {
            const selected = versions.value.find((v) => v.value === newVersion);
            if (selected) {
                latestBudgetId.value = selected.id!;
                await fetchBudgetList(selected.id!);
            }
        });

        function handleSearch(value: string) {
            search.value = value;
            filters.value.global = { value };
        }

        function handleImportClick() {
            showImportModal.value = true;
        }

        async function handlePageChange(page: number) {
            pagination.value.page = page;
            if (latestBudgetId.value) await fetchBudgetList(latestBudgetId.value);
        }

        async function handlePageSizeChange(size: number) {
            pagination.value.pageSize = size;
            pagination.value.page = 1;
            if (latestBudgetId.value) await fetchBudgetList(latestBudgetId.value);
        }

        // ---------------------------
        // 4. Lifecycle
        // ---------------------------
        onMounted(() => {
            fetchBudgetVersionList();
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
            handlePageChange,
            handlePageSizeChange,
            onSearchWrapper: handleSearch
        };
    }
});
