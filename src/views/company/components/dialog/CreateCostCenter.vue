<script lang="ts" src="./CreateCostCenter.script.ts"></script>

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
