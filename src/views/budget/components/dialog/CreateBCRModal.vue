<script lang="ts" src="./CreateBCRModal.script.ts"></script>

<template>
    <Dialog v-model:visible="localVisible" modal :header="modalTitle" :style="{ width: '90vw', maxWidth: '1200px' }" :closable="true" @hide="closeModal" class="create-ro-modal">
        <template #header>
            <div class="flex items-center gap-3">
                <i class="pi pi-box text-xl"></i>
                <div>
                    <h2 class="text-xl font-bold m-0">Add Bulk Items from Budget</h2>
                    <p class="text-sm text-gray-500 m-0">Select multiple items from your project budget to add to your request order.</p>
                </div>
            </div>
        </template>

        <!-- Search and Filters -->
        <div class="mb-3">
            <div class="flex gap-4 mb-3">
                <!-- Search -->
                <div class="flex-1">
                    <div class="p-input-icon-left w-full">
                        <InputText v-model="searchTerm" placeholder="Search by Item Code / Name" class="w-full" :show-clear="true" />
                    </div>
                </div>
                <!-- Clear Filters Button -->
                <Button label="Clear Filters" icon="pi pi-times" outlined @click="clearFilters" :disabled="!hasActiveFilters" />
            </div>

            <!-- Filter Dropdowns -->
            <div class="grid grid-cols-2 gap-2">
                <!-- Location Filter -->
                <div>
                    <label class="block text-sm font-medium mb-2">Location</label>
                    <Dropdown v-model="selectedLocation" :options="locationOptions" optionLabel="label" optionValue="value" placeholder="Location" class="w-full" :show-clear="true" />
                </div>

                <!-- Element Filter -->
                <div>
                    <label class="block text-sm font-medium mb-2">Element</label>
                    <Dropdown v-model="selectedElement" :options="elementOptions" optionLabel="label" optionValue="value" placeholder="Element" class="w-full" :show-clear="true" />
                </div>
            </div>
        </div>

        <!-- Results Summary -->
        <div class="mb-3 text-sm text-gray-600">Showing {{ filteredItems.length }} of {{ budgetItems.length }} items</div>

        <!-- Items Table -->
        <div class="border border-gray-200 rounded-lg overflow-hidden mb-3">
            <DataTable v-model:selection="selectedItems" :value="filteredItems" dataKey="ItemCode" :loading="loading" scrollable scrollHeight="280px" class="w-full">
                <Column selectionMode="multiple" headerStyle="width:3rem" />

                <Column field="ItemCode" header="Item Code" style="min-width: 150px" />
                <Column field="Name" header="Item Name" style="min-width: 220px" />

                <Column field="location" header="Location" style="min-width: 200px" />
                <Column field="element" header="Element" style="min-width: 200px" />

                <Column field="Uom" header="UoM" style="min-width: 100px" />
                <Column field="OrderedQty" header="Qty" style="min-width: 100px">
                    <template #body="slotProps">
                        {{ Number(slotProps.data.OrderedQty) || 0 }}
                    </template>
                </Column>

                <Column field="UnitPrice" header="Unit Price" style="min-width: 120px">
                    <template #body="slotProps">
                        {{ Number(slotProps.data.UnitPrice).toFixed(2) }}
                    </template>
                </Column>

                <Column header="Total" style="min-width: 150px">
                    <template #body="slotProps">
                        {{ (Number(slotProps.data.UnitPrice) * Number(slotProps.data.OrderedQty) || 0).toFixed(2) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="pt-3 mt-2 border-t text-right text-lg font-semibold">Total: {{ grandTotal.toFixed(2) }}</div>

        <!-- Footer -->
        <template #footer>
            <div class="flex items-center justify-between">
                <div class="text-sm text-gray-600 mr-3">{{ selectedItems.length }} items selected</div>
                <div class="flex gap-3">
                    <Button label="Cancel" icon="pi pi-times" outlined @click="closeModal" />
                    <Button :label="`Add Selected Items (${selectedItems.length})`" icon="pi pi-check" @click="addSelectedItems" :disabled="selectedItems.length === 0" />
                </div>
            </div>
        </template>
    </Dialog>
</template>

<style scoped>
.create-ro-modal :deep(.p-dialog-header) {
    padding: 1.5rem;
}

.create-ro-modal :deep(.p-dialog-content) {
    padding: 1.5rem;
}

.create-ro-modal :deep(.p-dialog-footer) {
    padding: 1rem 1.5rem;
}

.create-ro-modal :deep(.p-datatable-header) {
    padding: 0;
}

.create-ro-modal :deep(.p-datatable .p-datatable-thead > tr > th) {
    padding: 0.75rem;
    font-weight: 600;
}

.create-ro-modal :deep(.p-datatable .p-datatable-tbody > tr > td) {
    padding: 0.75rem;
}
</style>
