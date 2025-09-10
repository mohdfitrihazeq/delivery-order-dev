<!-- TODO: WANT TO DELETE THIS WHEN WE UNDERSTAND HOW TO USE THE ReusableTable COMPONENTS -->
<script setup lang="ts">
import type { TableColumn } from '@/types/table.type';
import Tag from 'primevue/tag';
import { ref } from 'vue';
import ReusableTable from './ReusableTable.vue';

const products = ref([
    { id: 1, name: 'Laptop', price: 1200, stock: 50, status: 'INSTOCK' },
    { id: 2, name: 'Mouse', price: 20, stock: 200, status: 'LOWSTOCK' },
    { id: 3, name: 'Keyboard', price: 50, stock: 80, status: 'INSTOCK' }
]);

const filters = ref({
    global: { value: null as string | null, matchMode: 'contains' }
});

const columns: TableColumn[] = [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'price', header: 'Price', sortable: true, bodySlot: 'price' },
    { field: 'stock', header: 'Stock', sortable: true },
    { field: 'status', header: 'Status', sortable: true, bodySlot: 'status' },
    { header: 'Action', action: true, actions: ['edit', 'delete'] } // 最后一列动作
];

function handleSearch(value: string) {
    // TODO: IMPLEMENT SEARCH LOGIC
}

function handleCreate() {
    // TODO: IMPLEMENT CREATE LOGIC
}

function handleAction(type: 'edit' | 'view' | 'delete', row: any) {
    console.log('Action:', type, row);
    if (type === 'edit') {
        // TODO: EDIT LOGIC
    } else if (type === 'view') {
        // TODO: VIEW LOGIC
    } else if (type === 'delete') {
        // TODO: DELETE LOGIC
    }
}

const showCreate = ref(true);
</script>

<template>
    <ReusableTable :value="products" :columns="columns" :filters="filters" :onSearch="handleSearch" :showCreate="showCreate" :onCreate="handleCreate" :onActionClick="handleAction">
        <template #price="{ data }"> ${{ data.price }} </template>

        <template #status="{ data }">
            <Tag :value="data.status" :severity="data.status === 'INSTOCK' ? 'success' : data.status === 'LOWSTOCK' ? 'warn' : 'danger'" />
        </template>
    </ReusableTable>
</template>
