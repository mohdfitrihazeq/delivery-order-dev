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
        <div class="mb-4">
            <div class="flex gap-4 mb-4">
                <!-- Search -->
                <div class="flex-1">
                    <div class="p-input-icon-left w-full">
                        <InputText v-model="searchTerm" placeholder="Search by item code or description..." class="w-full" />
                    </div>
                </div>
                <!-- Clear Filters Button -->
                <Button label="Clear Filters" icon="pi pi-times" outlined @click="clearFilters" :disabled="!hasActiveFilters" />
            </div>

            <!-- Filter Dropdowns -->
            <div class="grid grid-cols-3 gap-4">
                <!-- Location Filter -->
                <div>
                    <label class="block text-sm font-medium mb-2">Location</label>
                    <Dropdown v-model="selectedLocation" :options="locationOptions" option-label="label" option-value="value" placeholder="All" class="w-full" :show-clear="true" />
                </div>

                <!-- Element Filter -->
                <div>
                    <label class="block text-sm font-medium mb-2">Element</label>
                    <Dropdown v-model="selectedElement" :options="elementOptions" option-label="label" option-value="value" placeholder="All" class="w-full" :show-clear="true" />
                </div>

                <!-- Item Type Filter -->
                <div>
                    <label class="block text-sm font-medium mb-2">Item Type</label>
                    <Dropdown v-model="selectedItemType" :options="itemTypeOptions" option-label="label" option-value="value" placeholder="All" class="w-full" :show-clear="true" />
                </div>
            </div>
        </div>

        <!-- Results Summary -->
        <div class="mb-4 text-sm text-gray-600">Showing {{ filteredItems.length }} of {{ budgetItems.length }} items</div>

        <!-- Items Table -->
        <div class="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <DataTable :value="filteredItems" v-model:selection="selectedItems" data-key="itemCode" :scrollable="true" scroll-height="400px" class="w-full" :loading="loading">
                <!-- <template #header>
                    <div class="flex items-center justify-between p-3 bg-gray-50 border-b">
                        <div class="flex items-center gap-2">
                            <Checkbox v-model="selectAll" :binary="true" @change="toggleSelectAll" />
                            <span class="font-medium">Select All</span>
                        </div>
                    </div>
                </template> -->

                <Column selection-mode="multiple" style="width: 3rem" />

                <Column field="itemCode" header="Item Code" style="min-width: 120px">
                    <template #body="slotProps">
                        <span class="font-medium">{{ slotProps.data.itemCode }}</span>
                    </template>
                </Column>

                <Column field="description" header="Description" style="min-width: 250px">
                    <template #body="slotProps">
                        <span>{{ slotProps.data.description }}</span>
                    </template>
                </Column>

                <Column field="location" header="Location" style="min-width: 150px">
                    <template #body="slotProps">
                        <span class="text-sm">{{ slotProps.data.location }}</span>
                    </template>
                </Column>

                <Column field="element" header="Element" style="min-width: 200px">
                    <template #body="slotProps">
                        <span class="text-sm">{{ slotProps.data.element }}</span>
                    </template>
                </Column>

                <Column field="itemType" header="Item Type" style="min-width: 100px">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.itemType" :severity="getItemTypeSeverity(slotProps.data.itemType)" />
                    </template>
                </Column>

                <Column field="uom" header="UOM" style="min-width: 80px">
                    <template #body="slotProps">
                        <span class="text-sm">{{ slotProps.data.uom }}</span>
                    </template>
                </Column>

                <Column field="price" header="Price" style="min-width: 120px" class="text-right">
                    <template #body="slotProps">
                        <span class="font-medium">
                            {{ slotProps.data.price.toLocaleString(undefined, { style: 'currency', currency: 'MYR' }) }}
                        </span>
                    </template>
                </Column>

                <Column header="Total" style="min-width: 150px" class="text-right">
                    <template #body="slotProps">
                        <span class="font-bold">
                            {{ (slotProps.data.price * slotProps.data.quantity).toLocaleString(undefined, { style: 'currency', currency: 'MYR' }) }}
                        </span>
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="pt-3 mt-2 border-t text-right text-lg font-semibold">Total: {{ grandTotal.toLocaleString(undefined, { style: 'currency', currency: 'MYR' }) }}</div>

        <!-- Footer -->
        <template #footer>
            <div class="flex items-center justify-between">
                <div class="text-sm text-gray-600">{{ selectedItems.length }} items selected</div>
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
