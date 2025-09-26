<script lang="ts" src="./EditRo.script.ts"></script>

<template>
    <Dialog v-model:visible="localVisible" :modal="true" header="Edit Request Order" class="w-11/12 md:w-2/3">
        <div v-if="order">
            <form @submit.prevent="handleSave">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label class="block text-sm font-semibold mb-2">RO Number</label>
                        <InputText v-model="editForm.roNumber" class="w-full" disabled />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">Requested By</label>
                        <InputText v-model="editForm.requestedBy" class="w-full" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">RO Date</label>
                        <Calendar v-model="editForm.roDate" dateFormat="yy-mm-dd" class="w-full" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">Delivery Date</label>
                        <Calendar v-model="editForm.deliveryDate" dateFormat="yy-mm-dd" class="w-full" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">Total Amount</label>
                        <InputNumber v-model="editForm.totalAmount" mode="decimal" :minFractionDigits="2" class="w-full" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">Budget Type</label>
                        <Dropdown v-model="editForm.budgetType" :options="budgetTypeOptions" optionLabel="label" optionValue="value" class="w-full" />
                    </div>
                </div>

                <h3 class="font-semibold mb-3">Requested Items</h3>
                <div class="border rounded-lg overflow-hidden mb-4">
                    <DataTable :value="editForm.items" class="w-full">
                        <Column field="code" header="Item Code">
                            <template #body="slotProps">
                                <InputText v-model="slotProps.data.code" class="w-full" />
                            </template>
                        </Column>
                        <Column field="description" header="Description">
                            <template #body="slotProps">
                                <InputText v-model="slotProps.data.description" class="w-full" />
                            </template>
                        </Column>
                        <Column field="uom" header="UOM">
                            <template #body="slotProps">
                                <InputText v-model="slotProps.data.uom" class="w-full" />
                            </template>
                        </Column>
                        <Column field="qty" header="Quantity">
                            <template #body="slotProps">
                                <InputNumber v-model="slotProps.data.qty" class="w-full" />
                            </template>
                        </Column>
                        <Column field="deliveryDate" header="Delivery Date">
                            <template #body="slotProps">
                                <Calendar v-model="slotProps.data.deliveryDate" dateFormat="yy-mm-dd" class="w-full" />
                            </template>
                        </Column>
                        <Column field="note" header="Note">
                            <template #body="slotProps">
                                <InputText v-model="slotProps.data.note" class="w-full" />
                            </template>
                        </Column>
                        <Column header="Actions">
                            <template #body="slotProps">
                                <Button icon="pi pi-trash" severity="danger" text @click="removeItem(slotProps.index)" />
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <Button label="Add Item" icon="pi pi-plus" outlined @click="addItem" class="mb-4" />
            </form>
        </div>

        <template #footer>
            <div class="flex justify-end gap-2">
                <Button label="Cancel" severity="secondary" outlined icon="pi pi-times" @click="handleCancel" />
                <Button label="Save Changes" severity="success" icon="pi pi-check" @click="handleSave" />
            </div>
        </template>
    </Dialog>
</template>
