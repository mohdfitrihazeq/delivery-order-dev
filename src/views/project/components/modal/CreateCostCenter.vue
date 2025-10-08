<script lang="ts">
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { defineComponent, reactive } from 'vue';

interface TableRow {
    element: string;
    subElement: string;
    subSubElement: string;
    backchargePotential: string;
    selected: boolean;
}

export default defineComponent({
    name: 'CreateCostCenter',
    props: {
        visible: { type: Boolean, required: true }
    },
    emits: ['update:visible', 'submit'],
    setup(props, { emit }) {
        const close = () => emit('update:visible', false);

        const tableData = reactive<TableRow[]>([
            { element: 'Element1', subElement: 'Sub1', subSubElement: 'SubSub1', backchargePotential: 'Yes', selected: false },
            { element: 'Element2', subElement: 'Sub2', subSubElement: 'SubSub2', backchargePotential: 'No', selected: false },
            { element: 'Element3', subElement: 'Sub3', subSubElement: 'SubSub3', backchargePotential: 'Yes', selected: false },
            { element: 'Element4', subElement: 'Sub4', subSubElement: 'SubSub4', backchargePotential: 'No', selected: false },
            { element: 'Element5', subElement: 'Sub5', subSubElement: 'SubSub5', backchargePotential: 'Yes', selected: false },
            { element: 'Element6', subElement: 'Sub6', subSubElement: 'SubSub6', backchargePotential: 'No', selected: false }
        ]);

        const handleSubmit = () => {
            const selectedRows = tableData.filter((row) => row.selected);
            console.log('Selected Rows:', selectedRows);
            emit('submit', selectedRows);
            close();
        };

        return {
            tableData,
            handleSubmit,
            close
        };
    }
});
</script>

<template>
    <Dialog :visible="visible" @update:visible="(val) => $emit('update:visible', val)" modal header="Create Cost Center Element" :style="{ width: '50vw' }">
        <div class="space-y-4">
            <!-- Category -->
            <div>
                <label>Category:</label>
                <input type="text" value="Material" disabled class="border p-1 ml-2" />
            </div>

            <!-- PrimeVue DataTable -->
            <DataTable v-model:selection="tableData" :value="tableData" dataKey="element" :paginator="true" :rows="3" :selectionMode="'multiple'" class="p-datatable-sm">
                <Column selectionMode="multiple" headerStyle="width: 3em" />
                <Column field="element" header="Element" />
                <Column field="subElement" header="Sub Element" />
                <Column field="subSubElement" header="Sub Sub Element" />
                <Column field="backchargePotential" header="Backcharge Potential" />
            </DataTable>

            <!-- Buttons -->
            <div class="flex justify-end space-x-2 mt-2">
                <button @click="close" class="border px-3 py-1">Cancel</button>
                <button @click="handleSubmit" class="bg-blue-500 text-white px-3 py-1">Submit</button>
            </div>
        </div>
    </Dialog>
</template>

<style scoped>
/* 可以自定义 DataTable 样式 */
</style>
