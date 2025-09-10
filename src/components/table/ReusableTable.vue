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
    onCreate?: () => void;
    onActionClick?: (type: 'edit' | 'view' | 'delete', rowData: any) => void;
}>();

const search = ref('');

function handleSearch() {
    props.onSearch?.(search.value);
}
</script>

<template>
    <div class="card p-4 shadow-lg rounded-lg">
        <!-- Toolbar -->
        <div class="flex flex-col sm:flex-row justify-between mb-4 items-start sm:items-center gap-2">
            <!-- 搜索框 -->
            <span class="p-input-icon-left w-full sm:max-w-sm">
                <InputText v-model="search" placeholder="Search..." @input="handleSearch" class="w-full" />
            </span>

            <!-- Create 按钮 -->
            <div v-if="props.showCreate">
                <Button label="Create" icon="pi pi-plus" class="ml-0 sm:ml-2" @click="props.onCreate?.()" />
            </div>
        </div>

        <!-- 表格 -->
        <DataTable :value="props.value" :filters="props.filters" paginator :rows="10" stripedRows showGridlines rowHover scrollable scrollHeight="400px" responsiveLayout="scroll" class="rounded-lg overflow-hidden border">
            <Column v-for="(col, idx) in props.columns" :key="idx" :field="col.field" :header="col.header" :sortable="col.sortable" :frozen="col.frozen" :style="col.style">
                <!-- 普通 slot -->
                <template v-if="col.bodySlot && !col.action" #body="slotProps">
                    <slot :name="col.bodySlot" :data="slotProps.data" />
                </template>

                <!-- Action 列 -->
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
        </DataTable>
    </div>
</template>
