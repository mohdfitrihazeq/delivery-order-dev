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
                    <Button label="Cancel" @click="$router.push('/bcr')" outlined />
                    <Button label="Save as Draft" severity="secondary" outlined />
                    <Button label="Submit Request" :disabled="!isAttachmentValid" />
                </div>
            </div>

            <div class="card p-4 mb-6 shadow">
                <h2 class="text-lg font-semibold mb-4">Header Information</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">Request No</label>
                        <InputText v-model="roNumber" type="text" class="w-full" />
                    </div>

                    <div>
                        <label for="requestedBy" class="block text-sm text-gray-600 mb-1">Requested By</label>
                        <InputText id="requestedBy" type="text" class="w-full" />
                    </div>

                    <div>
                        <label for="dateRequested" class="block text-sm text-gray-600 mb-1">Date Requested</label>
                        <InputText id="dateRequested" type="text" class="w-full" />
                    </div>

                    <div>
                        <label for="reason" class="block text-sm text-gray-600 mb-1">Reason of Request</label>
                        <Select id="reason" :options="reasonOptions" optionLabel="label" optionValue="value" placeholder="Select Reason" class="w-full" />
                    </div>
                </div>
            </div>

            <div class="card p-4 mb-6 shadow">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold">Materials Section</h2>
                    <div class="flex gap-2">
                        <Button label="+ Add Material" @click="addItem" />
                    </div>
                </div>

                <div v-if="items.length === 0" class="flex justify-center items-center py-10 text-gray-500">
                    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
                        <div class="text-center">
                            <div class="text-5xl mb-2">📦</div>
                            <p>No material added yet</p>
                        </div>
                    </Motion>
                </div>

                <div v-else class="overflow-x-auto">
                    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
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
                                            <InputText type="number" placeholder="0.00" class="w-full" />
                                        </td>

                                        <td class="px-3 py-2">
                                            <InputTextStyle type="number" placeholder="0" class="w-full" />
                                        </td>

                                        <td class="px-3 py-2">
                                            <InputText type="number" placeholder="0" class="w-full" />
                                        </td>

                                        <td class="px-3 py-2">
                                            <InputText type="number" placeholder="0" class="w-full" />
                                        </td>

                                        <td class="px-3 py-2">
                                            <InputText type="number" placeholder="0" class="w-full" />
                                        </td>

                                        <td class="px-3 py-2">
                                            <InputText type="number" placeholder="0%" class="w-full" />
                                        </td>

                                        <td class="px-3 py-2">
                                            <InputText type="number" placeholder="0.00" class="w-full" />
                                        </td>

                                        <td class="px-3 py-2">
                                            <InputText v-model="item.remark" placeholder="Remark" class="w-full" />
                                        </td>

                                        <!-- Actions -->
                                        <td class="px-3 py-2 text-center">
                                            <Button icon="pi pi-trash" severity="danger" text @click="items.splice(index, 1)" />
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>

                        <div class="pt-3 mt-2 border-t text-sm text-gray-600 flex justify-between">
                            <span>{{ items.length }} {{ items.length > 1 ? 'items' : 'item' }}</span>
                        </div>
                    </Motion>
                </div>
            </div>
        </div>
    </Motion>
</template>
