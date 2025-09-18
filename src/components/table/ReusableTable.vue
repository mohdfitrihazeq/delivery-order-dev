<script setup lang="ts">
import type { TableColumn } from '@/types/table.type';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';

const props = defineProps<{
    value: any[];
    columns: TableColumn[];
    loading?: boolean;
    filters?: any;
    onSearch?: (value: string) => void;
    showCreate?: boolean;
    showImportFile?: boolean;
    onCreate?: () => void;
    onImportFile?: () => void;
    onRefresh?: () => void;
    onExport?: () => void;
    onActionClick?: (type: 'edit' | 'view' | 'delete', rowData: any) => void;
    emptyTitle?: string;
}>();

const search = ref('');

function handleSearch() {
    props.onSearch?.(search.value);
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
</script>

<template>
    <!-- Search + Button -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <span class="p-input-icon-left w-full sm:max-w-sm">
            <InputText v-model="search" placeholder="Search..." @input="handleSearch" class="w-full" />
        </span>

        <div class="flex gap-2">
            <Button v-if="props.showCreate" label="Create" icon="pi pi-plus" @click="props.onCreate?.()" />
            <Button v-if="props.showImportFile" label="Import CSV" icon="pi pi-upload" @click="props.onImportFile?.()" />
        </div>
    </div>

    <!-- Table Content -->
    <DataTable
        :value="props.value"
        :filters="props.filters"
        :paginator="props.value?.length > 0"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        tableStyle="min-width: 50rem"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        class="rounded-lg overflow-hidden border"
    >
        <template #paginatorstart> </template>

        <Column v-for="(col, idx) in props.columns" :key="idx" :field="col.field" :header="col.header" :sortable="col.sortable" :frozen="col.frozen" :style="col.style">
            <template v-if="col.bodySlot && !col.action" #body="slotProps">
                <slot :name="col.bodySlot" :data="slotProps.data" />
            </template>

            <template v-if="col.action" #body="slotProps">
                <div class="flex gap-2">
                    <Button
                        v-for="actionType in col.actions"
                        :key="actionType"
                        :label="actionType.charAt(0).toUpperCase() + actionType.slice(1)"
                        :icon="actionType === 'edit' ? 'pi pi-pencil' : actionType === 'view' ? 'pi pi-eye' : 'pi pi-trash'"
                        class="p-button-sm"
                        @click="props.onActionClick?.(actionType, slotProps.data)"
                    />
                </div>
            </template>
        </Column>

        <!-- When Empty Data -->
        <template #empty>
            <div class="flex items-center justify-center py-3 text-gray-500 gap-2">
                <Motion as="i" class="pi pi-ban text-2xl" />
                <Motion as="span" class="text-lg font-medium"> {{ props.emptyTitle ?? 'No List Found' }} ! </Motion>
            </div>
        </template>

        <template #paginatorend>
            <Button type="button" icon="pi pi-download" text @click="handleExport" />
        </template>
    </DataTable>
</template>
