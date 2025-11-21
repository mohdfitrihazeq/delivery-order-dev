import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';

import ReusableTable from '@/components/table/ReusableTable.vue';
import { useBudgetStore } from '@/stores/budget/newBudget.store';
import type { TableColumn } from '@/types/table.type';
import type { BudgetItem, FilterOption } from '../../../../types/request-order.type';

export default defineComponent({
    name: 'CreateROModal',
    components: {
        Dialog,
        ReusableTable,
        Button,
        InputText,
        Dropdown,
        Tag
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

        // Selection
        const selectedItems = ref<BudgetItem[]>([]);

        // Budget store
        const budgetStore = useBudgetStore();

        const pagination = ref({
            page: 1,
            pageSize: 10,
            total: 0,
            totalPages: 0
        });

        onMounted(() => {
            budgetStore.fetchBudgets();
            budgetStore.fetchBudgetItems(currentVersion.value ?? 0, pagination.value.page, pagination.value.pageSize);
        });

        const loadLatestBudgetVersion = (): number | null => {
            const v = localStorage.getItem('latestBudgetVersion');
            return v ? Number(v) : null;
        };

        const currentVersion = ref<number | null>(props.version || loadLatestBudgetVersion());

        const fetchBudgetItems = async () => {
            if (!currentVersion.value) return;
            loading.value = true;
            try {
                await budgetStore.fetchBudgetItems(currentVersion.value, pagination.value.page, pagination.value.pageSize);
                pagination.value.total = budgetStore.pagination.total;
                pagination.value.totalPages = budgetStore.pagination.totalPages;
            } catch (error) {
                console.error('Error loading budget items:', error);
            } finally {
                loading.value = false;
            }
        };

        // All budget items from store
        const allBudgetItems = computed(() => budgetStore.budgetItems);

        const filteredItems = computed(() => {
            let items = [...allBudgetItems.value];

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

        // Apply pagination to filtered items
        const paginatedItems = computed(() => {
            return allBudgetItems.value.map((item, index) => ({
                ...item,
                rowIndex: index + 1 + (pagination.value.page - 1) * pagination.value.pageSize
            }));
        });

        // Update pagination when filters change
        watch([searchTerm, selectedLocation, selectedElement, selectedItemType], () => {
            // Optionally reset page to 1 for local filters
            pagination.value.page = 1;
        });

        const grandTotal = computed(() => selectedItems.value.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0), 0));

        const locationOptions = computed<FilterOption[]>(() => {
            const locations = [...new Set(allBudgetItems.value.map((item) => item.location))];
            return locations.map((loc) => ({ label: loc, value: loc }));
        });

        const elementOptions = computed<FilterOption[]>(() => {
            const elements = [...new Set(allBudgetItems.value.map((item) => item.element))];
            return elements.map((el) => ({ label: el, value: el }));
        });

        const itemTypeOptions = computed<FilterOption[]>(() => {
            const types = [...new Set(allBudgetItems.value.map((item) => item.itemType))];
            return types.map((type) => ({ label: type, value: type }));
        });

        const filterOptions = computed(() => [
            { type: 'select' as const, field: 'location', placeholder: 'Filter by Location', options: locationOptions.value },
            { type: 'select' as const, field: 'element', placeholder: 'Filter by Element', options: elementOptions.value },
            { type: 'select' as const, field: 'itemType', placeholder: 'Filter by Item Type', options: itemTypeOptions.value }
        ]);

        const hasActiveFilters = computed(() => !!(searchTerm.value || selectedLocation.value || selectedElement.value || selectedItemType.value));

        const closeModal = () => {
            emit('update:visible', false);
            resetModal();
        };

        const resetModal = () => {
            selectedItems.value = [];
            clearFilters();
        };

        const clearFilters = () => {
            searchTerm.value = '';
            selectedLocation.value = null;
            selectedElement.value = null;
            selectedItemType.value = null;
            pagination.value.page = 1;
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

        watch(localVisible, async (visible) => {
            if (visible) {
                if (!currentVersion.value) {
                    // fallback in case version not set
                    currentVersion.value = loadLatestBudgetVersion();
                }
                if (currentVersion.value) {
                    await fetchBudgetItems();
                }
            }
        });

        const handlePageChange = async (page: number) => {
            pagination.value.page = page;
            await budgetStore.fetchBudgetItems(page, pagination.value.pageSize);
        };

        const handlePageSizeChange = async (pageSize: number) => {
            pagination.value.pageSize = pageSize;
            pagination.value.page = 1;
            await budgetStore.fetchBudgetItems(1, pageSize);
        };

        const handleSearch = (value: string) => {
            searchTerm.value = value;
            pagination.value.page = 1;
        };

        const handleFilterChange = (filters: Record<string, any>) => {
            selectedLocation.value = filters.location || null;
            selectedElement.value = filters.element || null;
            selectedItemType.value = filters.itemType || null;
            pagination.value.page = 1;
        };

        // Define ReusableTable columns
        const columns: TableColumn[] = [
            { field: 'rowIndex', header: '#', sortable: false },
            { field: 'itemCode', header: 'Item Code', sortable: true },
            { field: 'description', header: 'Description', sortable: true },
            { field: 'location', header: 'Location', sortable: false },
            { field: 'element', header: 'Element', sortable: false },
            { field: 'itemType', header: 'Item Type', sortable: true, bodySlot: 'itemTypeSlot' },
            { field: 'uom', header: 'UOM', sortable: false },
            { field: 'quantity', header: 'Quantity', sortable: true },
            { field: 'price', header: 'Price', sortable: true, bodySlot: 'priceSlot', visible: false },
            { field: 'total', header: 'Total', bodySlot: 'totalSlot', visible: false }
        ];

        return {
            modalTitle,
            loading,
            localVisible,
            paginatedItems,
            filteredItems,
            selectedItems,
            allBudgetItems,
            locationOptions,
            elementOptions,
            itemTypeOptions,
            pagination,
            filterOptions,
            grandTotal,
            hasActiveFilters,
            closeModal,
            clearFilters,
            addSelectedItems,
            getItemTypeSeverity,
            handlePageChange,
            handlePageSizeChange,
            handleSearch,
            handleFilterChange,
            columns,
            searchTerm,
            selectedLocation,
            selectedElement,
            selectedItemType
        };
    }
});
