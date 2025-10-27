import { useBudgetStore } from '@/stores/budget/budget.store';
import type { FilterVersion } from '@/types/budget.type';
import type { TableColumn } from '@/types/table.type';
import { defineComponent, onMounted, ref } from 'vue';

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
        const versions = ref<FilterVersion[]>([
            { label: 'Version 1.0', value: '1.0' },
            { label: 'Version 1.1', value: '1.1' },
            { label: 'Version 2.0', value: '2.0', latest: true }
        ]);

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
        const budgetItems = ref<any[]>([]);
        const selectedVersion = ref(versions.value.find((v) => v.latest)?.value || '');
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
        });

        console.log('Budget Item:', budgetItems);

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
