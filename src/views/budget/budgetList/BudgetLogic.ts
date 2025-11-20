import { useBudgetStore } from '@/stores/budget/newBudget.store';
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
import { useToast } from 'primevue/usetoast';

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
        const toast = useToast();
        // ---------------------------
        // 1. Static
        // ---------------------------
        const viewOptions = [
            { label: 'Overview', value: 'overview' },
            { label: 'Detail', value: 'detail' }
        ];

        const columns: TableColumn[] = [
            { field: 'rowIndex', header: '#' },
            { field: 'itemCode', header: 'Item Code', sortable: true },
            { field: 'description', header: 'Description', sortable: true },
            { field: 'location1', header: 'Location', sortable: true },
            { field: 'elementCode', header: 'Element', sortable: true },
            { field: 'subElement', header: '1st Sub Element', sortable: true },
            { field: 'subSubElement', header: '2nd Sub Element', sortable: true },
            { field: 'unit', header: 'UOM', sortable: true },
            { field: 'quantity', header: 'Qty', sortable: true },
            { field: 'rate', header: 'Rate', sortable: true, bodySlot: 'rate' },
            { field: 'amount', header: 'Amount', sortable: true, bodySlot: 'amount' }
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
            const versionsData = await budgetStore.fetchBudgetVersion();
            if (!versionsData || versionsData.length === 0) return;

            const sorted = [...versionsData].sort((a, b) => Number(a.versionCode) - Number(b.versionCode));
            const latestVersionCode = Math.max(...sorted.map((v) => Number(v.versionCode)));

            versions.value = sorted.map((item) => ({
                label: `Version ${item.versionCode}`,
                value: String(item.versionCode),
                latest: Number(item.versionCode) === latestVersionCode,
                id: item.id
            }));

            const latest = versions.value.find((v) => v.latest);
            if (latest) {
                selectedVersion.value = latest.value;
                latestBudgetId.value = latest.id!;
                await fetchBudgetList();
            }
        };

        const fetchBudgetList = async () => {
            if (!latestBudgetId.value) return;
            await budgetStore.fetchBudgetItems(latestBudgetId.value, pagination.value.page, pagination.value.pageSize);
            // Add rowIndex based on pagination
            budgetItems.value = budgetStore.budgetItems.map((item, index) => ({
                ...item,
                rowIndex: (pagination.value.page - 1) * pagination.value.pageSize + index + 1
            }));
            pagination.value.total = budgetStore.pagination.total;
            pagination.value.totalPages = budgetStore.pagination.totalPages;
        };

        const previousVersion = ref<string | null>(null);

        watch(selectedVersion, async (newVersion) => {
            // Ignore first run (initial load)
            if (previousVersion.value !== null && previousVersion.value !== newVersion) {
                toast.add({
                    severity: 'info',
                    summary: 'Version Changed',
                    detail: `Switched to version: Version ${newVersion}`,
                    life: 2000
                });
            }

            previousVersion.value = newVersion;

            const selected = versions.value.find((v) => v.value === newVersion);
            if (selected) {
                latestBudgetId.value = selected.id!;
                await fetchBudgetList();
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
            await fetchBudgetList();
        }

        async function handlePageSizeChange(size: number) {
            pagination.value.pageSize = size;
            pagination.value.page = 1;
            await fetchBudgetList();
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
