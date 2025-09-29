<script lang="ts" src="./EditBCR.script.ts"></script>

<template>
    <Motion :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0, y: -20 }" :transition="{ duration: 0.6 }">
        <div class="p-6 card">
            <BreadcrumbList />

            <!-- Page Header -->
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

            <!-- Header Information -->
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
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">Materials Section</h3>
                    <div class="flex items-center gap-4 text-sm">
                        <span class="font-semibold text-red-600">Total Variance Amount: {{ totalVarianceAmount }}</span>
                        <Button label="+ Add Material" class="text-sm" @click="addItem" />
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="items.length === 0" class="flex justify-center items-center py-10 text-gray-500 text-sm">
                    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
                        <div class="text-center">
                            <div class="text-5xl mb-2">📦</div>
                            <p>No material added yet</p>
                        </div>
                    </Motion>
                </div>

                <!-- Table -->
                <div v-else class="overflow-x-auto">
                    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
                        <table class="min-w-full text-sm text-gray-700 rounded-lg border">
                            <thead class="text-sm font-semibold text-gray-600 bg-gray-50">
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
                                    <tr class="border-t align-top text-sm">
                                        <td class="px-3 py-2">
                                            <Dropdown v-model="item.itemCode" :options="itemOptions" optionLabel="label" optionValue="value" placeholder="Select item..." class="w-full text-sm" @change="fillItemDetails(item)">
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
                                        <td class="px-3 py-2"><InputText v-model="item.description" class="w-full text-sm" disabled /></td>
                                        <td class="px-3 py-2"><InputText v-model="item.uom" class="w-full text-sm" disabled /></td>
                                        <td class="px-3 py-2"><InputNumber v-model="item.unitPrice" class="w-full text-sm" mode="decimal" :min="0" /></td>
                                        <td class="px-3 py-2"><InputNumber v-model="item.budgetQty" class="w-full text-sm" :min="0" /></td>
                                        <td class="px-3 py-2"><InputNumber v-model="item.orderedQty" class="w-full text-sm" :min="0" /></td>
                                        <td class="px-3 py-2"><InputNumber v-model="item.newOrder" class="w-full text-sm" :min="0" /></td>
                                        <td class="px-3 py-2"><InputNumber v-model="item.exceededQty" class="w-full text-sm" :min="0" /></td>
                                        <td class="px-3 py-2"><InputNumber v-model="item.exceededPercent" class="w-full text-sm" :min="0" /></td>
                                        <td class="px-3 py-2"><InputNumber v-model="item.estimatedExceed" class="w-full text-sm" :min="0" /></td>
                                        <td class="px-3 py-2"><InputText v-model="item.remark" class="w-full text-sm" /></td>
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

            <!-- Discussion Thread -->
            <div class="card p-4 mb-6 shadow">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold flex items-center gap-2"><i class="pi pi-comments"></i> Discussion Thread</h3>
                    <!-- Add Comment 按钮 -->
                    <Button label="Add Comment" icon="pi pi-plus" class="p-button-sm" @click="showCommentModal = true" />
                </div>

                <!-- 讨论列表 -->
                <div v-for="(item, index) in discussions" :key="index" class="border rounded p-3 bg-gray-50 flex flex-col gap-2 mb-3">
                    <div class="flex justify-between items-start gap-2 text-sm text-gray-600">
                        <div class="flex-1">
                            <div class="flex items-center gap-2">
                                <span class="font-semibold">{{ item.role }}</span>
                                <span>{{ item.name }}</span>
                                <span class="text-gray-400">{{ item.datetime }}</span>
                            </div>
                            <div class="text-sm text-gray-700 break-words mt-1">
                                {{ item.message }}
                            </div>
                        </div>

                        <Button v-if="item.documentUrl" text class="ml-2 flex-shrink-0 w-auto" tooltip="View Document" style="width: auto"> <i class="pi pi-file"></i> Attachments </Button>
                    </div>
                </div>

                <!-- Comment Modal -->
                <CommentBCR v-model:visible="showCommentModal" :requestNo="selectedRequestNo" @submit="handleCommentSubmit" />
            </div>
        </div>
    </Motion>
</template>
