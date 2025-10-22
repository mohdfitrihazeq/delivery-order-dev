<script lang="ts" src="./CreateBCR.script.ts"></script>

<template>
    <Motion :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0, y: -20 }" :transition="{ duration: 0.6 }">
        <div class="p-6 card">
            <BreadcrumbList />

            <div class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="text-2xl font-bold">New Budget Change Request</h1>
                    <p class="text-gray-500">Project: MKT</p>
                </div>
                <div class="flex gap-2">
                    <Button label="Cancel" @click="goBack" outlined />
                    <Button label="Submit Request" :disabled="items.length === 0" @click="submitRequest" />
                </div>
            </div>

            <!-- Header Information -->
            <div class="card p-4 mb-6 border">
                <h2 class="text-lg font-semibold mb-4">Header Information</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">Serial No</label>
                        <InputText v-model="roNumber" type="text" class="w-full" disabled />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">Date Requested</label>
                        <InputText v-model="requestDate" type="text" class="w-full" disabled />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">Requested By</label>
                        <InputText v-model="requestBy" type="text" class="w-full" disabled />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">Department</label>
                        <InputText v-model="department" type="text" class="w-full" disabled />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">Reason of Request</label>
                        <Select v-model="selectedReason" :options="reasonOptions" optionLabel="label" optionValue="value" placeholder="Select Reason" class="w-full" />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">Remarks</label>
                        <InputText v-model="remarks" type="text" class="w-full" />
                    </div>
                </div>
            </div>

            <!-- Materials Section -->
            <div class="card p-4 mb-6 border">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold">Materials Section</h2>
                    <Button label="+ Add Material" @click="openMeterial" />
                </div>

                <div v-if="items.length === 0" class="flex justify-center items-center py-10 text-gray-500">
                    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
                        <ResultNotFound />
                    </Motion>
                </div>

                <div v-else class="overflow-x-auto">
                    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
                        <DataTable
                            :value="items"
                            :paginator="items?.length > 0"
                            :rows="10"
                            :rowsPerPageOptions="[10]"
                            tableStyle="min-width: 80rem"
                            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                            class="overflow-hidden"
                        >
                            <!-- Item Code -->
                            <Column field="itemCode" header="Item Code">
                                <template #body="slotProps">
                                    <Dropdown v-model="slotProps.data.itemCode" :options="itemOptions" optionLabel="label" optionValue="value" placeholder="Select item..." class="w-full" @change="fillItemDetails(slotProps.data)">
                                        <template #option="slotProps">
                                            <div class="flex flex-col">
                                                <span class="font-medium">{{ slotProps.option.label }}</span>
                                                <span class="text-xs text-gray-500">{{ slotProps.option.description }}</span>
                                            </div>
                                        </template>
                                        <template #value="slotProps">
                                            <span v-if="slotProps.value">{{ getItemLabel(slotProps.value) }}</span>
                                            <span v-else class="text-gray-400">Select item...</span>
                                        </template>
                                    </Dropdown>
                                </template>
                            </Column>

                            <!-- Description -->
                            <Column field="description" header="Description">
                                <template #body="slotProps">
                                    <InputText v-model="slotProps.data.description" class="w-full" disabled />
                                </template>
                            </Column>

                            <!-- Units -->
                            <Column field="uom" header="Units">
                                <template #body="slotProps">
                                    <InputText v-model="slotProps.data.uom" class="w-full" disabled />
                                </template>
                            </Column>

                            <!-- Unit Price -->
                            <Column field="unitPrice" header="Unit Price">
                                <template #body="slotProps">
                                    <InputText type="number" v-model.number="slotProps.data.unitPrice" class="w-full" />
                                </template>
                            </Column>

                            <!-- Budgeted Quantity -->
                            <Column field="budgetQty" header="Budgeted Quantity">
                                <template #body="slotProps">
                                    <InputText type="number" v-model.number="slotProps.data.budgetQty" class="w-full" />
                                </template>
                            </Column>

                            <!-- Ordered Quantity -->
                            <Column field="orderedQty" header="Ordered Quantity">
                                <template #body="slotProps">
                                    <InputText type="number" v-model.number="slotProps.data.orderedQty" class="w-full" />
                                </template>
                            </Column>

                            <!-- New Order -->
                            <Column field="newOrder" header="New Order">
                                <template #body="slotProps">
                                    <InputText type="number" v-model.number="slotProps.data.newOrder" class="w-full" />
                                </template>
                            </Column>

                            <!-- Exceeded Quantity -->
                            <Column field="exceedQty" header="Exceeded Quantity">
                                <template #body="slotProps">
                                    <span :class="{ 'text-red-600 font-bold': calcExceedQty(slotProps.data) > 0, 'text-green-600': calcExceedQty(slotProps.data) < 0 }">
                                        {{ calcExceedQty(slotProps.data) }}
                                    </span>
                                </template>
                            </Column>

                            <!-- Exceeded % -->
                            <Column field="exceedPercent" header="Exceeded %">
                                <template #body="slotProps">
                                    <span :class="{ 'text-red-600 font-bold': calcExceedQty(slotProps.data) > 0, 'text-green-600': calcExceedQty(slotProps.data) < 0 }"> {{ calcExceedPercent(slotProps.data).toFixed(1) }}% </span>
                                </template>
                            </Column>

                            <!-- Estimated $ exceed -->
                            <Column field="estimatedExceed" header="Estimated $ exceed">
                                <template #body="slotProps">
                                    <span :class="{ 'text-red-600 font-bold': calcExceedQty(slotProps.data) > 0, 'text-green-600': calcExceedQty(slotProps.data) < 0 }">
                                        {{ calcEstimatedExceed(slotProps.data).toFixed(2) }}
                                    </span>
                                </template>
                            </Column>

                            <!-- Remarks -->
                            <Column field="remark" header="Remarks">
                                <template #body="slotProps">
                                    <InputText v-model="slotProps.data.remark" class="w-full" />
                                </template>
                            </Column>

                            <!-- Actions -->
                            <Column header="Actions">
                                <template #body="slotProps">
                                    <Button icon="pi pi-trash" severity="danger" text @click="items.splice(items.indexOf(slotProps.data), 1)" />
                                </template>
                            </Column>

                            <template #paginatorend>
                                <Button type="button" icon="pi pi-download" text @click="handleExport" />
                            </template>
                        </DataTable>
                        <div class="pt-3 mt-2 text-small font-semibold flex justify-between items-center">
                            <span>{{ items.length }} {{ items.length > 1 ? 'items' : 'item' }}</span>
                            <span class="font-semibold"> Total Variance Amount: ${{ totalVarianceAmount.toFixed(2) }} </span>
                        </div>
                    </Motion>
                </div>
            </div>

            <MeterialModal v-model:visible="showBulkItemModal" @material-selected="handleBulkItems" />
        </div>
    </Motion>
</template>
