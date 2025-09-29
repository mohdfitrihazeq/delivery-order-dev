<script setup lang="ts">
import type { TableColumn } from '@/types/table.type';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import { ref } from 'vue';

import ResultNotFound from '@/components/resulNotFound/ResultNotFound.vue';
import BaseSpinner from '@/components/spinner/BaseSpinner.vue';

type FilterOption = {
    type: 'select' | 'text' | 'date';
    field: string;
    placeholder?: string;
    options?: { label: string; value: any }[];
};

const props = defineProps<{
    value: any[];
    columns: TableColumn[];
    loading?: boolean;
    onSearch?: (value: string) => void;
    showCreate?: boolean;
    showImportFile?: boolean;
    onCreate?: () => void;
    onImportFile?: () => void;
    onRefresh?: () => void;
    onExport?: () => void;
    onActionClick?: (type: 'edit' | 'view' | 'delete' | 'comment', rowData: any) => void;
    emptyTitle?: string;
    extraFilters?: FilterOption[];
    onFilterChange?: (filters: Record<string, any>) => void;
}>();

const search = ref('');
const activeFilters = ref<Record<string, any>>({});

function handleSearch() {
    props.onSearch?.(search.value);
}

function handleFilterChange(field: string, value: any) {
    activeFilters.value[field] = value;
    props.onFilterChange?.(activeFilters.value);
}

// Export CSV
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

const menu = ref();
const currentRow = ref<any>(null);
const menuItems = ref<any[]>([]);

function openMenu(event: Event, row: any, actions?: ('edit' | 'view' | 'delete' | 'comment')[]) {
    if (!actions) return;

    currentRow.value = row;

    menuItems.value = actions.map((actionType) => ({
        label: actionType.charAt(0).toUpperCase() + actionType.slice(1),
        icon: actionType === 'edit' ? 'pi pi-pencil' : actionType === 'view' ? 'pi pi-eye' : actionType === 'delete' ? 'pi pi-trash' : 'pi pi-comment',
        command: () => props.onActionClick?.(actionType, currentRow.value)
    }));

    menu.value.toggle(event);
}
</script>

<template>
    <!-- Search + Filter + Buttons -->
    <div class="flex flex-col sm:flex-row justify-end items-start sm:items-center mb-4 gap-2 mt-0 sm:mt-[-35px]">
        <!-- Search -->
        <span class="p-input-icon-left w-full sm:max-w-sm sm:w-auto">
            <InputText v-if="props.onSearch" v-model="search" placeholder="Search..." @input="handleSearch" class="w-full sm:w-auto" />
        </span>

        <!-- Filters + Buttons -->
        <div class="flex gap-2 flex-wrap items-center">
            <!-- Dynamic Filters -->
            <template v-for="(f, i) in props.extraFilters" :key="i">
                <!-- text -->
                <InputText v-if="f.type === 'text'" :placeholder="f.placeholder" v-model="activeFilters[f.field]" @input="handleFilterChange(f.field, activeFilters[f.field])" />

                <!-- select -->
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

                <!-- date -->
                <Calendar v-else-if="f.type === 'date'" :placeholder="f.placeholder" v-model="activeFilters[f.field]" @input="handleFilterChange(f.field, activeFilters[f.field])" dateFormat="yy-mm-dd" class="min-w-[10rem]" />
            </template>

            <!-- Buttons -->
            <Button v-if="props.showCreate" label="Create" icon="pi pi-plus" @click="props.onCreate?.()" />
            <Button v-if="props.showImportFile" label="Import CSV" icon="pi pi-upload" @click="props.onImportFile?.()" />
        </div>
    </div>

    <!-- Loading State -->
    <div v-if="props.loading" class="flex justify-center py-10">
        <BaseSpinner />
    </div>

    <!-- Empty State -->
    <div v-else-if="!props.loading && (!props.value || props.value.length === 0)" class="flex justify-center py-10">
        <ResultNotFound :message="props.emptyTitle ?? 'No List Found'" />
    </div>

    <!-- Table Content -->
    <DataTable
        v-else
        :value="props.value"
        :paginator="props.value?.length > 0"
        :rows="10"
        :rowsPerPageOptions="[10]"
        tableStyle="min-width: 50rem"
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        :class="['overflow-hidden dark:text-white', !props.onSearch && !props.extraFilters?.length && !props.showCreate && !props.showImportFile ? 'mt-9' : '']"
    >
        <template #paginatorstart> </template>

        <Column v-for="(col, idx) in props.columns" :key="idx" :field="col.field" :header="col.header" :sortable="col.sortable" :frozen="col.frozen" :style="col.style">
            <template v-if="col.bodySlot && !col.action" #body="slotProps">
                <slot :name="col.bodySlot" :data="slotProps.data" />
            </template>

            <!-- Action buttons -->
            <template v-if="col.action" #body="slotProps">
                <div class="flex gap-2">
                    <Button icon="pi pi-ellipsis-v" text @click="openMenu($event, slotProps.data, col.actions)" />
                </div>
            </template>
        </Column>

        <template #paginatorend>
            <Button type="button" icon="pi pi-download" text @click="handleExport" />
        </template>
    </DataTable>

    <Menu ref="menu" :model="menuItems" popup />
</template>
