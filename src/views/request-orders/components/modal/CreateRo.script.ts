import { computed, defineComponent, ref, watch } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';

import { useBudgetStore } from '@/stores/budget/newBudget.store';
import ReusableTable from '@/components/table/ReusableTable.vue';
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

        const fetchBudgetItems = async () => {
            loading.value = true;
            try {
                await budgetStore.fetchBudgets(props.projectId, props.version);
                // Update pagination with total count
                const allItems = budgetStore.budgets.flatMap((b) => b.items);
                pagination.value.total = allItems.length;
                pagination.value.totalPages = Math.ceil(allItems.length / pagination.value.pageSize) || 1;
            } catch (error) {
                console.error('Error loading budget items:', error);
            } finally {
                loading.value = false;
            }
        };

        // All budget items from store
        const allBudgetItems = computed(() =>
            budgetStore.budgets.flatMap((b) =>
                b.items.map((item: any) => ({
                    itemCode: item.ItemCode,
                    description: item.Description,
                    location: `${item.Location1}${item.Location2 ? ' > ' + item.Location2 : ''}`,
                    element: `${item.Category} > ${item.Element} > ${item.SubElement}`,
                    itemType: item.ItemType,
                    uom: item.Unit,
                    quantity: Number(item.Quantity) || 0,
                    price: Number(item.Rate) || 0
                }))
            )
        );

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
            const start = (pagination.value.page - 1) * pagination.value.pageSize;
            const end = start + pagination.value.pageSize;
            return filteredItems.value.slice(start, end).map((item, index) => ({
                ...item,
                rowIndex: start + index + 1
            }));
        });

        // Update pagination when filters change
        watch(
            filteredItems,
            (items) => {
                pagination.value.total = items.length;
                pagination.value.totalPages = Math.ceil(items.length / pagination.value.pageSize) || 1;
                // Reset to page 1 if current page exceeds totalPages
                if (pagination.value.page > pagination.value.totalPages) {
                    pagination.value.page = 1;
                }
            },
            { immediate: true }
        );

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

        watch(localVisible, (visible) => {
            if (visible) {
                fetchBudgetItems();
            }
        });

        const handlePageChange = (page: number) => {
            pagination.value.page = page;
        };

        const handlePageSizeChange = (pageSize: number) => {
            pagination.value.pageSize = pageSize;
            pagination.value.page = 1; // Reset to page 1 when changing page size
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
            { field: 'price', header: 'Price', sortable: true, bodySlot: 'priceSlot' },
            { field: 'total', header: 'Total', bodySlot: 'totalSlot' }
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
