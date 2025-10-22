<script setup lang="ts">
import type { TableColumn } from '@/types/table.type';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import { ref, watch } from 'vue';

import ResultNotFound from '@/components/resulNotFound/ResultNotFound.vue';
import BaseSpinner from '@/components/spinner/BaseSpinner.vue';

type ActionType = 'edit' | 'view' | 'delete' | 'comment';

type FilterOption = {
    type: 'select' | 'text' | 'date';
    field: string;
    placeholder?: string;
    options?: { label: string; value: any }[];
};

interface TableRow {
    [key: string]: any;
    actions?: ActionType[];
}

interface PaginationConfig {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

const props = defineProps<{
    value: TableRow[];
    columns: TableColumn[];
    loading?: boolean;
    onSearch?: (value: string) => void;
    showCreate?: boolean;
    showImportFile?: boolean;
    onCreate?: () => void;
    onImportFile?: () => void;
    onRefresh?: () => void;
    onExport?: () => void;
    onActionClick?: (type: ActionType, rowData: TableRow) => void;
    emptyTitle?: string;
    extraFilters?: FilterOption[];
    onFilterChange?: (filters: Record<string, any>) => void;
    // Server-side pagination props
    pagination?: PaginationConfig;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
}>();

const search = ref('');
const activeFilters = ref<Record<string, any>>({});
const hasLoadedOnce = ref(false);

const menu = ref();
const currentRow = ref<TableRow | null>(null);
const menuItems = ref<any[]>([]);

const isServerSidePagination = props.pagination !== undefined;

watch(
    () => props.value,
    (val) => {
        if (val && val.length > 0) {
            hasLoadedOnce.value = true;
        }
    },
    { immediate: true }
);

function handleSearch() {
    props.onSearch?.(search.value);
}

function handleFilterChange(field: string, value: any) {
    activeFilters.value[field] = value;
    props.onFilterChange?.(activeFilters.value);
}

function handleExport() {
    props.onExport?.();
    if (!props.value || props.value.length === 0) return;

    const columns = props.columns.map((c) => c.header);
    const rows = props.value.map((row) =>
        props.columns
            .map((c) => {
                const value = row[c.field!];
                return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
            })
            .join(',')
    );

    const csvContent = [columns.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function openMenu(event: Event, row: TableRow, defaultActions?: ActionType[]) {
    const actions: ActionType[] = row.actions || defaultActions || [];
    if (!actions.length) return;

    currentRow.value = row;

    menuItems.value = actions.map((actionType) => ({
        label: actionType.charAt(0).toUpperCase() + actionType.slice(1),
        icon: actionType === 'edit' ? 'pi pi-pencil' : actionType === 'view' ? 'pi pi-eye' : actionType === 'delete' ? 'pi pi-trash' : 'pi pi-comment',
        command: () => props.onActionClick?.(actionType, currentRow.value!)
    }));

    menu.value.toggle(event);
}

function onPageChangeHandler(event: any) {
    if (!props.pagination) return;

    const newPage = Math.floor(event.first / event.rows) + 1;

    props.onPageChange?.(newPage);
    props.onPageSizeChange?.(event.rows);
}
</script>

<template>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3 mt-8 sm:mt-8">
        <div v-if="isServerSidePagination && props.pagination" class="flex items-center gap-2">
            <span class="text-sm text-gray-600 dark:text-gray-400">Rows per page:</span>
            <Dropdown :modelValue="props.pagination.pageSize" @update:modelValue="props.onPageSizeChange?.($event)" :options="[10, 25, 50, 100]" class="w-30" />
        </div>

        <div class="flex gap-2 flex-wrap items-center">
            <span class="p-input-icon-left">
                <InputText v-if="props.onSearch && hasLoadedOnce" v-model="search" placeholder="Search..." @input="handleSearch" class="w-full sm:w-auto" />
            </span>

            <template v-for="(f, i) in props.extraFilters" :key="i">
                <InputText v-if="f.type === 'text'" :placeholder="f.placeholder" v-model="activeFilters[f.field]" @input="handleFilterChange(f.field, activeFilters[f.field])" />

                <Dropdown
                    v-else-if="f.type === 'select'"
                    :options="f.options"
                    optionLabel="label"
                    optionValue="value"
                    :placeholder="f.placeholder"
                    v-model="activeFilters[f.field]"
                    @change="handleFilterChange(f.field, activeFilters[f.field])"
                    class="min-w-[8rem]"
                />

                <Calendar v-else-if="f.type === 'date'" :placeholder="f.placeholder" v-model="activeFilters[f.field]" @input="handleFilterChange(f.field, activeFilters[f.field])" dateFormat="yy-mm-dd" class="min-w-[10rem]" />
            </template>

            <Button v-if="props.showCreate" label="Create" icon="pi pi-plus" @click="props.onCreate?.()" />
            <Button v-if="props.showImportFile" label="Import CSV" icon="pi pi-upload" @click="props.onImportFile?.()" />
        </div>
    </div>

    <div v-if="props.loading" class="flex justify-center py-10">
        <BaseSpinner />
    </div>

    <div v-else-if="!props.loading && (!props.value || props.value.length === 0)" class="flex justify-center py-10">
        <ResultNotFound :message="props.emptyTitle ?? 'No List Found'" />
    </div>

    <template v-else>
        <DataTable :value="props.value" class="overflow-hidden dark:text-white" tableStyle="min-width: 50rem">
            <Column v-for="(col, idx) in props.columns" :key="idx" :field="col.field" :header="col.header" :sortable="col.sortable" :frozen="col.frozen" :style="col.style">
                <template v-if="col.bodySlot && !col.action" #body="slotProps">
                    <slot :name="col.bodySlot" :data="slotProps.data" />
                </template>

                <template v-if="col.action" #body="slotProps">
                    <div class="flex gap-2">
                        <Button icon="pi pi-ellipsis-v" text @click="openMenu($event, slotProps.data, col.actions)" />
                    </div>
                </template>
            </Column>
        </DataTable>

        <div v-if="isServerSidePagination && props.pagination" class="flex flex-col sm:flex-row items-center mt-4 px-4 py-3 border-t dark:border-gray-700 w-full">
            <div class="w-full sm:w-1/3 text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-0">
                Showing
                {{ Math.min((props.pagination.page - 1) * props.pagination.pageSize + 1, props.pagination.total) }}
                –
                {{ Math.min(props.pagination.page * props.pagination.pageSize, props.pagination.total) }}
                of
                {{ props.pagination.total }}
            </div>

            <div class="w-full sm:w-1/3 flex justify-center items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-0">
                <Button icon="pi pi-angle-double-left" text :disabled="props.pagination.page === 1" @click="props.onPageChange?.(1)" title="First Page" />
                <Button icon="pi pi-angle-left" text :disabled="props.pagination.page === 1" @click="props.onPageChange?.(props.pagination.page - 1)" title="Previous Page" />

                <span class="px-3"> Page {{ props.pagination.page }} of {{ props.pagination.totalPages || 1 }} </span>

                <Button icon="pi pi-angle-right" text :disabled="props.pagination.page >= (props.pagination.totalPages || 1)" @click="props.onPageChange?.(props.pagination.page + 1)" title="Next Page" />
                <Button icon="pi pi-angle-double-right" text :disabled="props.pagination.page >= (props.pagination.totalPages || 1)" @click="props.onPageChange?.(props.pagination.totalPages || 1)" title="Last Page" />
            </div>

            <div class="w-full sm:w-1/3 flex justify-end mt-2 sm:mt-0">
                <Button type="button" icon="pi pi-download" text @click="handleExport" title="Export CSV" />
            </div>
        </div>
    </template>

    <Menu ref="menu" :model="menuItems" popup />
</template>
