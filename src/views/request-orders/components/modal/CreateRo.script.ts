import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import Paginator from 'primevue/paginator';
import { computed, defineComponent, ref, watch } from 'vue';
import { useBudgetStore } from '@/stores/budget/newBudget.store';
import type { BudgetItem, FilterOption } from '../../../../types/request-order.type';

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
        Tag,
        Paginator
    },
    props: {
        visible: { type: Boolean, default: false },
        projectId: { type: Number, required: true },
        version: { type: Number, required: true }
    },
    emits: ['update:visible', 'items-selected'],
    setup(props, { emit }) {
        const localVisible = ref(props.visible);
        watch(
            () => props.visible,
            (val) => (localVisible.value = val)
        );
        watch(localVisible, (val) => emit('update:visible', val));

        const modalTitle = ref('Add Bulk Items from Budget');
        const loading = ref(false);

        const searchTerm = ref('');
        const selectedLocation = ref<string | null>(null);
        const selectedElement = ref<string | null>(null);
        const selectedItemType = ref<string | null>(null);

        const selectedItems = ref<BudgetItem[]>([]);
        const selectAll = ref(false);

        // Budget store
        const budgetStore = useBudgetStore();

        const tablePagination = ref({
            page: 1,
            pageSize: 10,
            total: 0,
            totalPages: 0
        });

        const loadBudgetItems = async (page = 1, pageSize = 10) => {
            loading.value = true;
            try {
                await budgetStore.fetchBudgets(props.projectId, props.version);
                tablePagination.value.page = page;
                tablePagination.value.pageSize = pageSize;
                tablePagination.value.total = budgetStore.pagination.total;
                tablePagination.value.totalPages = budgetStore.pagination.totalPages;
            } catch (error) {
                console.error('Error loading budget items:', error);
            } finally {
                loading.value = false;
            }
        };

        const budgetItems = computed(() => {
            return budgetStore.budgets.flatMap((b) =>
                b.items.map((item: any) => ({
                    itemCode: item.ItemCode,
                    description: item.Description,
                    location: `${item.Location1}${item.Location2 ? ' > ' + item.Location2 : ''}`,
                    element: `${item.Category} > ${item.Element} > ${item.SubElement}`,
                    itemType: item.ItemType,
                    uom: item.Unit,
                    quantity: Number(item.Quantity),
                    price: Number(item.Rate)
                }))
            );
        });

        const grandTotal = computed(() => selectedItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0));

        const locationOptions = computed<FilterOption[]>(() => {
            const locations = [...new Set(budgetItems.value.map((item) => item.location))];
            return locations.map((loc) => ({ label: loc, value: loc }));
        });

        const elementOptions = computed<FilterOption[]>(() => {
            const elements = [...new Set(budgetItems.value.map((item) => item.element))];
            return elements.map((el) => ({ label: el, value: el }));
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
            if (selectedLocation.value) items = items.filter((item) => item.location === selectedLocation.value);
            if (selectedElement.value) items = items.filter((item) => item.element === selectedElement.value);
            if (selectedItemType.value) items = items.filter((item) => item.itemType === selectedItemType.value);

            return items;
        });

        const hasActiveFilters = computed(() => !!(searchTerm.value || selectedLocation.value || selectedElement.value || selectedItemType.value));

        watch(
            selectedItems,
            (newSelection) => {
                selectAll.value = newSelection.length === filteredItems.value.length && filteredItems.value.length > 0;
            },
            { deep: true }
        );

        watch(filteredItems, (newFiltered) => {
            selectAll.value = selectedItems.value.length === newFiltered.length && newFiltered.length > 0;
        });

        // Modal controls
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

        // Load budgets when modal opens
        watch(localVisible, (visible) => {
            if (visible) loadBudgetItems(tablePagination.value.page, tablePagination.value.pageSize);
        });

        const onPageChange = async (event: { page: number; rows: number }) => {
            const newPage = event.page + 1;
            await loadBudgetItems(newPage, event.rows);
        };

        return {
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
            grandTotal,
            locationOptions,
            elementOptions,
            itemTypeOptions,
            filteredItems,
            hasActiveFilters,
            tablePagination,
            closeModal,
            clearFilters,
            toggleSelectAll,
            addSelectedItems,
            getItemTypeSeverity,
            onPageChange
        };
    }
});
