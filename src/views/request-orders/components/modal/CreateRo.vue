<script lang="ts" src="./CreateRo.script.ts"></script>

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
                <div>
                    <label class="block text-sm font-medium mb-2">Location</label>
                    <Dropdown v-model="selectedLocation" :options="locationOptions" option-label="label" option-value="value" placeholder="All" class="w-full" :show-clear="true" />
                </div>

                <div>
                    <label class="block text-sm font-medium mb-2">Element</label>
                    <Dropdown v-model="selectedElement" :options="elementOptions" option-label="label" option-value="value" placeholder="All" class="w-full" :show-clear="true" />
                </div>

                <div>
                    <label class="block text-sm font-medium mb-2">Item Type</label>
                    <Dropdown v-model="selectedItemType" :options="itemTypeOptions" option-label="label" option-value="value" placeholder="All" class="w-full" :show-clear="true" />
                </div>
            </div>
        </div>

        <!-- Results Summary -->
        <div class="mb-4 text-sm text-gray-600">Showing {{ filteredItems?.length || 0 }} of {{ allBudgetItems?.length || 0 }} items</div>

        <ReusableTable
            :value="paginatedItems"
            :columns="columns"
            :loading="loading"
            :pagination="pagination"
            :onPageChange="handlePageChange"
            :onPageSizeChange="handlePageSizeChange"
            :selection-mode="'checkbox'"
            v-model:selection="selectedItems"
            emptyTitle="No budget items found"
        >
            <template #itemTypeSlot="{ data }">
                <Tag :value="data.itemType" :severity="getItemTypeSeverity(data.itemType)" />
            </template>

            <template #priceSlot="{ data }">
                {{ data.price.toLocaleString(undefined, { style: 'currency', currency: 'MYR' }) }}
            </template>

            <template #totalSlot="{ data }">
                {{ (data.price * data.quantity).toLocaleString(undefined, { style: 'currency', currency: 'MYR' }) }}
            </template>
        </ReusableTable>

        <div class="pt-3 mt-2 border-t text-right text-lg font-semibold" style="display: none">Total: {{ grandTotal.toLocaleString(undefined, { style: 'currency', currency: 'MYR' }) }}</div>

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
