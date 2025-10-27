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
        // 1. Static Data
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
        const viewMode = ref<'overview' | 'detail'>('overview');
        const search = ref('');
        const showImportModal = ref(false);
        const filters = ref<Record<string, any>>({});

        // ---------------------------
        // 3. Lifecycle - Load API Data
        // ---------------------------
        onMounted(async () => {
            await budgetStore.fetchBudgetList();
            budgetItems.value = budgetStore.budgetList[0]?.BudgetItems || [];
            const list = budgetStore.budgetList || [];

            versions.value = list.map((item) => ({
                label: `Version ${item.VersionCode}`,
                value: String(item.VersionCode),
                latest: false
            }));

            const latestVersion = Math.max(...list.map((i) => Number(i.VersionCode)));
            versions.value = versions.value.map((v) => (v.value === String(latestVersion) ? { ...v, latest: true } : v));

            selectedVersion.value = String(latestVersion);

            const latestBudget = list.find((i) => Number(i.VersionCode) === latestVersion);
            budgetItems.value = latestBudget?.BudgetItems || [];
        });

        watch(selectedVersion, (newValue) => {
            const target = budgetStore.budgetList.find((i) => String(i.VersionCode) === newValue);
            budgetItems.value = target?.BudgetItems || [];
        });

        // ---------------------------
        // 4. Methods
        // ---------------------------
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
            handleImportClick,
            handleAction,
            onSearchWrapper: handleSearch
        };
    }
});
