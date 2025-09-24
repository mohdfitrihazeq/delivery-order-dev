import type { FilterVersion } from '@/types/budget.type';
import type { TableColumn } from '@/types/table.type';

import BaseTab from '@/components/tab/BaseTab.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import { Motion } from '@motionone/vue';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import SelectButton from 'primevue/selectbutton';
import Tag from 'primevue/tag';
import { defineComponent, ref } from 'vue';
import Overview from './Overview.vue';
import BudgetImportModal from './components/modal/BudgetImport.vue';

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
        // ---------------------------
        // 1. DATA (constants, refs)
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

        const budgetItems = ref([
            { itemCode: 'STL-001', description: 'Steel reinforcement bars Grade 60', location: 'Building A', element: 'Structure', subElement: 'Foundation', subsubElement: 'Reinforcement', uom: 'kg', quantity: 2500, rate: 1.85, amount: 4625 },
            { itemCode: 'CON-002', description: 'Ready mix concrete C25/30', location: 'Building A', element: 'Structure', subElement: 'Foundation', subsubElement: 'Concrete', uom: 'm³', quantity: 180, rate: 125.0, amount: 22500 },
            { itemCode: 'LAB-001', description: 'Excavation work including disposal', location: 'Building A', element: 'Earthworks', subElement: 'Excavation', subsubElement: 'Manual', uom: 'm³', quantity: 450, rate: 35.0, amount: 15750 },
            { itemCode: 'STL-002', description: 'Structural steel beams H-section', location: 'Building A', element: 'Structure', subElement: 'Columns', subsubElement: 'Steel Beams', uom: 'kg', quantity: 1800, rate: 2.1, amount: 3780 },
            { itemCode: 'EQP-001', description: 'Tower crane rental (monthly)', location: 'Building A', element: 'Equipment', subElement: 'Lifting', subsubElement: 'Tower Crane', uom: 'month', quantity: 12, rate: 8500.0, amount: 102000 },
            { itemCode: 'BLK-001', description: 'Clay brick walls with mortar', location: 'Building B', element: 'Envelope', subElement: 'Walls', subsubElement: 'Brickwork', uom: 'm²', quantity: 650, rate: 85.0, amount: 55250 },
            { itemCode: 'ROF-001', description: 'Galvanized metal roofing sheets', location: 'Building B', element: 'Structure', subElement: 'Roofing', subsubElement: 'Metal Sheets', uom: 'm²', quantity: 420, rate: 65.0, amount: 27300 },
            { itemCode: 'ELE-001', description: 'Electrical wiring and conduits', location: 'Building B', element: 'MEP', subElement: 'Electrical', subsubElement: 'Wiring', uom: 'points', quantity: 280, rate: 125.0, amount: 35000 },
            {
                itemCode: 'LAB-002',
                description: 'Site landscaping and soil preparation',
                location: 'Site Area',
                element: 'Earthworks',
                subElement: 'Landscaping',
                subsubElement: 'Soil Preparation',
                uom: 'm²',
                quantity: 850,
                rate: 25.0,
                amount: 21250
            },
            { itemCode: 'PAV-001', description: 'Asphalt paving for parking areas', location: 'Site Area', element: 'Infrastructure', subElement: 'Paving', subsubElement: 'Asphalt', uom: 'm²', quantity: 1200, rate: 45.0, amount: 54000 },
            { itemCode: 'PLB-001', description: 'Water supply and drainage pipes', location: 'Building A', element: 'MEP', subElement: 'Plumbing', subsubElement: 'Pipes', uom: 'm', quantity: 650, rate: 35.0, amount: 22750 },
            { itemCode: 'HVC-001', description: 'Air conditioning ductwork installation', location: 'Building A', element: 'MEP', subElement: 'HVAC', subsubElement: 'Ductwork', uom: 'm²', quantity: 380, rate: 95.0, amount: 36100 },
            { itemCode: 'PAV-002', description: 'Reinforced concrete paving', location: 'Parking Area', element: 'Infrastructure', subElement: 'Paving', subsubElement: 'Concrete', uom: 'm²', quantity: 950, rate: 75.0, amount: 71250 },
            { itemCode: 'DRN-001', description: 'Storm water drainage system', location: 'Parking Area', element: 'Infrastructure', subElement: 'Drainage', subsubElement: 'Storm Drains', uom: 'm', quantity: 320, rate: 85.0, amount: 27200 }
        ]);

        const columns: TableColumn[] = [
            { field: 'itemCode', header: 'Item Code', sortable: true },
            { field: 'description', header: 'Description', sortable: true },
            { field: 'location', header: 'Location', sortable: true },
            { field: 'element', header: 'Element', sortable: true },
            { field: 'subElement', header: '1st Sub Element', sortable: true },
            { field: 'subsubElement', header: '2nd Sub Element', sortable: true },
            { field: 'uom', header: 'UOM', sortable: true },
            { field: 'quantity', header: 'Qty', sortable: true },
            { field: 'rate', header: 'Rate', sortable: true, bodySlot: 'rate' },
            { field: 'amount', header: 'Amount', sortable: true, bodySlot: 'amount' },
            { header: 'Action', action: true, actions: ['edit', 'delete'] }
        ];

        // ---------------------------
        // 2. STATE (reactive values)
        // ---------------------------
        const selectedVersion = ref(versions.value.find((v) => v.latest)?.value || '');
        const viewMode = ref<'overview' | 'detail'>('overview');
        const search = ref('');
        const showImportModal = ref(false);
        const filters = ref<Record<string, any>>({});
        // ---------------------------
        // 3. FUNCTIONS (handlers)
        // ---------------------------
        function handleSearch(value: string) {
            search.value = value;
            filters.value.global.value = value;
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
        // 4. RETURN (expose to template)
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
            handleAction,
            onSearchWrapper: handleSearch,
            handleImportClick
        };
    }
});
