import type { BudgetItem, FilterOption } from '@/types/bcr.type';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'CreateROModal',
    components: {
        Dialog,
        DataTable,
        Column,
        Button,
        InputText,
        Dropdown,
        Checkbox,
        Tag
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:visible', 'items-selected'],
    setup(props, { emit }) {
        const localVisible = ref(props.visible);
        watch(
            () => props.visible,
            (val) => {
                localVisible.value = val;
            }
        );

        // Emit changes to parent
        watch(localVisible, (val) => {
            emit('update:visible', val);
        });
        const modalTitle = ref('Add Bulk Items from Budget');
        const loading = ref(false);

        const searchTerm = ref('');
        const selectedLocation = ref<string | null>(null);
        const selectedElement = ref<string | null>(null);
        const selectedItemType = ref<string | null>(null);

        const selectedItems = ref<BudgetItem[]>([]);
        const selectAll = ref(false);

        const budgetItems = ref<BudgetItem[]>([
            {
                itemCode: 'STL-001',
                description: 'Steel reinforcement bars Grade 60',
                location: 'Building A > Level 1-5',
                element: 'Structure > Foundation > Reinforcement',
                itemType: 'Materials',
                uom: 'kg',
                quantity: 2500
            },
            {
                itemCode: 'CON-002',
                description: 'Ready mix concrete C25/30',
                location: 'Building A > Level 1-3',
                element: 'Structure > Foundation > Concrete',
                itemType: 'Materials',
                uom: 'm³',
                quantity: 180
            },
            {
                itemCode: 'LAB-001',
                description: 'Excavation work including disposal',
                location: 'Building A > Site Area',
                element: 'Earthworks > Excavation > Manual',
                itemType: 'Labour',
                uom: 'm³',
                quantity: 450
            },
            {
                itemCode: 'STL-002',
                description: 'Structural steel beams H-section',
                location: 'Building A > Level 6-10',
                element: 'Structure > Columns > Steel Beams',
                itemType: 'Materials',
                uom: 'kg',
                quantity: 1800
            },
            {
                itemCode: 'EQP-001',
                description: 'Tower crane rental monthly',
                location: 'Building A > All Levels',
                element: 'Equipment > Lifting > Tower Crane',
                itemType: 'Equipment',
                uom: 'month',
                quantity: 12
            },
            {
                itemCode: 'INS-001',
                description: 'Electrical panel installation',
                location: 'Building B > Level 1-8',
                element: 'Infrastructure > Electrical > Panel',
                itemType: 'Installation',
                uom: 'unit',
                quantity: 24
            }
        ]);

        const locationOptions = computed<FilterOption[]>(() => {
            const locations = [...new Set(budgetItems.value.map((item) => item.location))];
            return locations.map((location) => ({ label: location, value: location }));
        });

        const elementOptions = computed<FilterOption[]>(() => {
            const elements = [...new Set(budgetItems.value.map((item) => item.element))];
            return elements.map((element) => ({ label: element, value: element }));
        });

        const itemTypeOptions = computed<FilterOption[]>(() => {
            const types = [...new Set(budgetItems.value.map((item) => item.itemType))];
            return types.map((type) => ({ label: type, value: type }));
        });

        const filteredItems = computed<BudgetItem[]>(() => {
            let items = [...budgetItems.value];

            if (searchTerm.value) {
                const search = searchTerm.value.toLowerCase();
                items = items.filter((item) => item.itemCode.toLowerCase().includes(search) || item.description.toLowerCase().includes(search));
            }

            if (selectedLocation.value) {
                items = items.filter((item) => item.location === selectedLocation.value);
            }

            if (selectedElement.value) {
                items = items.filter((item) => item.element === selectedElement.value);
            }

            if (selectedItemType.value) {
                items = items.filter((item) => item.itemType === selectedItemType.value);
            }

            return items;
        });

        const hasActiveFilters = computed(() => {
            return !!(searchTerm.value || selectedLocation.value || selectedElement.value || selectedItemType.value);
        });

        watch(
            selectedItems,
            (newSelection) => {
                selectAll.value = newSelection.length === filteredItems.value.length && filteredItems.value.length > 0;
            },
            { deep: true }
        );

        watch(filteredItems, (newFiltered) => {
            if (newFiltered.length === 0) {
                selectAll.value = false;
            } else {
                selectAll.value = selectedItems.value.length === newFiltered.length;
            }
        });

        const closeModal = () => {
            emit('update:visible', false);
            resetModal();
        };

        const resetModal = () => {
            selectedItems.value = [];
            selectAll.value = false;
            clearFilters();
        };

        const clearFilters = () => {
            searchTerm.value = '';
            selectedLocation.value = null;
            selectedElement.value = null;
            selectedItemType.value = null;
        };

        const toggleSelectAll = () => {
            if (selectAll.value) {
                selectedItems.value = [...filteredItems.value];
            } else {
                selectedItems.value = [];
            }
        };

        const addSelectedItems = () => {
            if (selectedItems.value.length > 0) {
                emit('items-selected', [...selectedItems.value]);
                closeModal();
            }
        };

        const getItemTypeSeverity = (itemType: string): string => {
            const severityMap: Record<string, string> = {
                Materials: 'info',
                Labour: 'warning',
                Equipment: 'success',
                Installation: 'secondary'
            };
            return severityMap[itemType] || 'info';
        };

        const loadBudgetItems = async () => {
            loading.value = true;
            try {
                await new Promise((resolve) => setTimeout(resolve, 500));
            } catch (error) {
                console.error('Error loading budget items:', error);
            } finally {
                loading.value = false;
            }
        };

        loadBudgetItems();

        return {
            // Data
            modalTitle,
            loading,
            searchTerm,
            selectedLocation,
            selectedElement,
            selectedItemType,
            selectedItems,
            selectAll,
            budgetItems,
            localVisible,

            // Computed
            locationOptions,
            elementOptions,
            itemTypeOptions,
            filteredItems,
            hasActiveFilters,

            // Methods
            closeModal,
            clearFilters,
            toggleSelectAll,
            addSelectedItems,
            getItemTypeSeverity
        };
    }
});
