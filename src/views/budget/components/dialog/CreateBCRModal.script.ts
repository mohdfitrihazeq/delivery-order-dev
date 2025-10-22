import type { BudgetChangeItem } from '@/types/bcr.type';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import { computed, defineComponent, ref, watch } from 'vue';

type FilterOption = { label: string; value: string | null };

export default defineComponent({
    name: 'BudgetItemModal',
    components: {
        Dialog,
        DataTable,
        Column,
        Button,
        InputText,
        Dropdown,
        Tag
    },
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    emits: ['update:visible', 'material-selected'],
    setup(props, { emit }) {
        const localVisible = ref(props.visible);
        watch(
            () => props.visible,
            (val) => (localVisible.value = val)
        );
        watch(localVisible, (val) => emit('update:visible', val));

        const modalTitle = ref('Add Items from Budget');
        const loading = ref(false);

        const searchTerm = ref('');
        const selectedLocation = ref<string | null>(null);
        const selectedElement = ref<string | null>(null);

        const selectedItems = ref<BudgetChangeItem[]>([]);

        const budgetItems = ref<BudgetChangeItem[]>([
            {
                Id: 1,
                BudgetChangeId: 1,
                BudgetItemId: 2,
                ItemCode: 'STL-001',
                Name: 'Steel reinforcement bars Grade 60',
                Description: '',
                Uom: 'kg',
                UnitPrice: '5.50',
                OrderedQty: '2500',
                NewOrder: '',
                ExceededQty: '',
                Remark: '',
                CreatedAt: '',
                CreatedBy: null,
                UpdatedAt: '',
                UpdatedBy: null,
                location: '',
                element: ''
            },
            {
                Id: 2,
                BudgetChangeId: 1,
                BudgetItemId: 2,
                ItemCode: 'CON-002',
                Name: 'Ready mix concrete C25/30',
                Description: '',
                Uom: 'm³',
                UnitPrice: '250',
                OrderedQty: '180',
                NewOrder: '',
                ExceededQty: '',
                Remark: '',
                CreatedAt: '',
                CreatedBy: null,
                UpdatedAt: '',
                UpdatedBy: null,
                location: '',
                element: ''
            },
            {
                Id: 3,
                BudgetChangeId: 1,
                BudgetItemId: 2,
                ItemCode: 'BRK-003',
                Name: 'Clay bricks standard size',
                Description: '',
                Uom: 'pcs',
                UnitPrice: '0.45',
                OrderedQty: '10000',
                NewOrder: '',
                ExceededQty: '',
                Remark: '',
                CreatedAt: '',
                CreatedBy: null,
                UpdatedAt: '',
                UpdatedBy: null,
                location: '',
                element: ''
            },
            {
                Id: 4,
                BudgetChangeId: 1,
                BudgetItemId: 2,
                ItemCode: 'PLS-004',
                Name: 'PVC water pipes Ø50mm',
                Description: '',
                Uom: 'm',
                UnitPrice: '1.80',
                OrderedQty: '500',
                NewOrder: '',
                ExceededQty: '',
                Remark: '',
                CreatedAt: '',
                CreatedBy: null,
                UpdatedAt: '',
                UpdatedBy: null,
                location: '',
                element: ''
            },
            {
                Id: 5,
                BudgetChangeId: 1,
                BudgetItemId: 2,
                ItemCode: 'ELC-005',
                Name: 'Electrical copper cables 4mm²',
                Description: '',
                Uom: 'm',
                UnitPrice: '2.20',
                OrderedQty: '300',
                NewOrder: '',
                ExceededQty: '',
                Remark: '',
                CreatedAt: '',
                CreatedBy: null,
                UpdatedAt: '',
                UpdatedBy: null,
                location: '',
                element: ''
            },
            {
                Id: 6,
                BudgetChangeId: 1,
                BudgetItemId: 2,
                ItemCode: 'WOD-006',
                Name: 'Plywood sheets 18mm',
                Description: '',
                Uom: 'sheet',
                UnitPrice: '22',
                OrderedQty: '150',
                NewOrder: '',
                ExceededQty: '',
                Remark: '',
                CreatedAt: '',
                CreatedBy: null,
                UpdatedAt: '',
                UpdatedBy: null,
                location: '',
                element: ''
            },
            {
                Id: 7,
                BudgetChangeId: 1,
                BudgetItemId: 2,
                ItemCode: 'GLS-007',
                Name: 'Tempered glass panels 10mm',
                Description: '',
                Uom: 'm²',
                UnitPrice: '45',
                OrderedQty: '80',
                NewOrder: '',
                ExceededQty: '',
                Remark: '',
                CreatedAt: '',
                CreatedBy: null,
                UpdatedAt: '',
                UpdatedBy: null,
                location: '',
                element: ''
            },
            {
                Id: 8,
                BudgetChangeId: 1,
                BudgetItemId: 2,
                ItemCode: 'PNT-008',
                Name: 'Exterior wall paint',
                Description: '',
                Uom: 'litre',
                UnitPrice: '12',
                OrderedQty: '200',
                NewOrder: '',
                ExceededQty: '',
                Remark: '',
                CreatedAt: '',
                CreatedBy: null,
                UpdatedAt: '',
                UpdatedBy: null,
                location: '',
                element: ''
            }
        ]);

        const grandTotal = computed(() => selectedItems.value.reduce((sum, item) => sum + (parseFloat(item.UnitPrice) || 0) * (parseFloat(item.OrderedQty) || 0), 0));

        const locationOptions = computed<FilterOption[]>(() =>
            [...new Set(budgetItems.value.map((i) => i.location))].map((l) => ({
                label: l || 'N/A',
                value: l
            }))
        );
        const elementOptions = computed<FilterOption[]>(() =>
            [...new Set(budgetItems.value.map((i) => i.element))].map((l) => ({
                label: l || 'N/A',
                value: l
            }))
        );

        const filteredItems = computed(() => {
            let items = [...budgetItems.value];
            if (searchTerm.value) {
                const s = searchTerm.value.toLowerCase();
                items = items.filter((item) => item.ItemCode.toLowerCase().includes(s) || item.Name.toLowerCase().includes(s));
            }
            if (selectedLocation.value) items = items.filter((i) => i.location === selectedLocation.value);
            if (selectedElement.value) items = items.filter((i) => i.element === selectedElement.value);
            return items;
        });

        const hasActiveFilters = computed(() => !!(searchTerm.value || selectedLocation.value || selectedElement.value));

        const clearFilters = () => {
            searchTerm.value = '';
            selectedLocation.value = null;
            selectedElement.value = null;
        };

        const closeModal = () => {
            emit('update:visible', false);
            selectedItems.value = [];
            clearFilters();
        };

        const addSelectedItems = () => {
            if (selectedItems.value.length > 0) {
                console.log('✅ Selected Items:', selectedItems.value);
                emit('material-selected', [...selectedItems.value]);
                closeModal();
            }
        };

        return {
            localVisible,
            modalTitle,
            loading,
            searchTerm,
            selectedLocation,
            selectedElement,
            selectedItems,
            budgetItems,
            grandTotal,
            locationOptions,
            elementOptions,
            filteredItems,
            hasActiveFilters,
            clearFilters,
            closeModal,
            addSelectedItems
        };
    }
});
