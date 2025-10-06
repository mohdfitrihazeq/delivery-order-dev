<script lang="ts" src="./EditBCR.script.ts"></script>

<template>
    <div class="p-6 card">
        <BreadcrumbList />

        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-2xl font-bold">Edit Budget Change Request</h1>
                <p class="text-gray-500">Project: MKT</p>
            </div>

            <div class="flex gap-2">
                <Button label="Cancel" @click="$router.push('/bcr')" outlined />
                <Button label="Save as Draft" severity="secondary" outlined />
                <Button label="Submit Request" :disabled="!isAttachmentValid" />
            </div>
        </div>

        <div class="card p-4 mb-6 shadow">
            <h3 class="text-lg font-semibold mb-4">Header Information</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <label class="block text-gray-600 mb-1">Request No</label>
                    <InputText v-model="roNumber" type="text" class="w-full text-sm" />
                </div>
                <div>
                    <label class="block text-gray-600 mb-1">Requested By</label>
                    <InputText v-model="requestBy" type="text" class="w-full text-sm" />
                </div>
                <div>
                    <label class="block text-gray-600 mb-1">Date Requested</label>
                    <InputText v-model="requestDate" type="text" class="w-full text-sm" />
                </div>
                <div>
                    <label class="block text-gray-600 mb-1">Reason of Request</label>
                    <Select :options="reasonOptions" optionLabel="label" optionValue="value" placeholder="Select Reason" class="w-full text-sm" />
                </div>
            </div>
        </div>

        <!-- Materials Section -->
        <div class="card p-4 mb-6 shadow">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold">Materials</h3>
                <Button label="Add Item" icon="pi pi-plus" @click="addItem" outlined />
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full rounded-lg border">
                    <thead class="text-sm text-gray-600 bg-gray-50">
                        <tr>
                            <th class="px-3 py-2 text-left">Item Code</th>
                            <th class="px-3 py-2 text-left">Description</th>
                            <th class="px-3 py-2 text-left">Units</th>
                            <th class="px-3 py-2 text-left">Unit Price</th>
                            <th class="px-3 py-2 text-left">Budgeted Quantity</th>
                            <th class="px-3 py-2 text-left">Ordered Quantity</th>
                            <th class="px-3 py-2 text-left">New Order</th>
                            <th class="px-3 py-2 text-left">Exceeded Quantity</th>
                            <th class="px-3 py-2 text-left">Exceeded %</th>
                            <th class="px-3 py-2 text-left">Estimated $ exceed</th>
                            <th class="px-3 py-2 text-left">Remarks</th>
                            <th class="px-3 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item, index) in items" :key="index">
                            <tr class="border-t align-top">
                                <td class="px-3 py-2">
                                    <Dropdown v-model="item.itemCode" :options="itemOptions" optionLabel="label" optionValue="value" placeholder="Select item..." class="w-full" @change="fillItemDetails(item)">
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
                                </td>

                                <td class="px-3 py-2">
                                    <InputText v-model="item.description" placeholder="Description" class="w-full" disabled />
                                </td>

                                <td class="px-3 py-2">
                                    <InputText v-model="item.uom" placeholder="Unit" class="w-full" disabled />
                                </td>

                                <td class="px-3 py-2">
                                    <InputNumber type="number" v-model="item.unitPrice" placeholder="0.00" class="w-full" />
                                </td>

                                <td class="px-3 py-2">
                                    <InputNumber type="number" v-model="item.budgetQty" placeholder="0" class="w-full" />
                                </td>

                                <td class="px-3 py-2">
                                    <InputNumber type="number" v-model="item.orderedQty" placeholder="0" class="w-full" />
                                </td>

                                <td class="px-3 py-2">
                                    <InputNumber type="number" v-model="item.newOrder" placeholder="0" class="w-full" />
                                </td>

                                <td class="px-3 py-2">
                                    <InputNumber type="number" v-model="item.exceededQty" placeholder="0" class="w-full" />
                                </td>

                                <td class="px-3 py-2">
                                    <InputNumber type="number" v-model="item.exceededPct" placeholder="0%" class="w-full" />
                                </td>

                                <td class="px-3 py-2">
                                    <InputNumber type="number" v-model="item.estimatedExceed" placeholder="0.00" class="w-full" />
                                </td>

                                <td class="px-3 py-2">
                                    <InputText v-model="item.remark" placeholder="Remark" class="w-full" />
                                </td>

                                <td class="px-3 py-2 text-center">
                                    <Button icon="pi pi-trash" severity="danger" text @click="items.splice(index, 1)" />
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>

            <div class="text-right mt-4 font-semibold">Total Variance Amount: {{ totalVarianceAmount.toFixed(2) }}</div>
        </div>
    </div>
</template>
