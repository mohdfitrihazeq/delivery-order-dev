<script lang="ts" src="./CreateRequestOrders.script.ts"></script>

<template>
    <Motion :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0, y: -20 }" :transition="{ duration: 0.6 }">
        <div class="p-6 card glossy-card">
            <BreadcrumbList />
            <div class="flex items-center mb-6 gap-4">
                <div>
                    <h1 class="text-2xl font-bold">Create Request Order</h1>
                    <p class="text-gray-500">Create a new request order for project: MKT</p>
                </div>
            </div>

            <div class="card p-4 mb-6 shadow">
                <h2 class="text-lg font-semibold mb-4">Request Order Details</h2>
                <div class="grid grid-cols-3 gap-4">
                    <!-- RO Number -->
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">RO Number <span class="text-red-600 font-bold">*</span></label>
                        <div class="flex flex-col gap-2">
                            <InputText v-model="roNumber" type="text" class="w-full" :invalid="showValidation && !roNumber.trim()" placeholder="Enter RO Number" />
                            <Message v-if="showValidation && !roNumber.trim()" severity="error" icon="pi pi-times-circle" text="RO Number is required" />
                        </div>
                    </div>

                    <!-- Budget Type -->
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">Budget Type <span class="text-red-600 font-bold">*</span></label>
                        <div class="flex flex-col gap-2">
                            <Select id="budgetType" v-model="budgetType" :options="budgetOptions" optionLabel="label" optionValue="value" placeholder="Select Budget Type" class="w-full" :invalid="showValidation && !budgetType" />
                            <Message v-if="showValidation && !budgetType" severity="error" icon="pi pi-times-circle" text="Budget Type is required" />
                        </div>
                    </div>

                    <!-- RO Date -->
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">RO Date <span class="text-red-600 font-bold">*</span></label>
                        <div class="flex flex-col gap-2">
                            <DatePicker :showIcon="true" :showButtonBar="true" v-model="calendarValue" :invalid="showValidation && !calendarValue" placeholder="Select Date" />
                            <Message v-if="showValidation && !calendarValue" severity="error" icon="pi pi-times-circle" text="RO Date is required" />
                        </div>
                    </div>

                    <!-- Subcon AutoComplete for Unbudgeted Items -->
                    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 1 }">
                        <div v-if="budgetType === 'Unbudgeted Item'">
                            <label class="block text-sm text-gray-600 mb-1">Subcon <span class="text-red-600 font-bold">*</span></label>
                            <div class="flex flex-col gap-2">
                                <AutoComplete v-model="selectedSubcon" :suggestions="filteredSubconList" field="name" option-label="name" forceSelection dropdown placeholder="Search Subcon" @complete="handleSubconSearch" />
                                <Message v-if="showValidation && !selectedSubcon" severity="error" icon="pi pi-times-circle" text="Subcon is required for Unbudgeted Items" />
                            </div>
                        </div>
                    </Motion>
                </div>
            </div>
            <Presence>
                <!-- Empty Items View -->
                <Motion v-if="items.length === 0" :key="budgetType" :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0, y: -20 }" :transition="{ duration: 0.6 }">
                    <BudgetInfoCard class="my-4" :budgetType="budgetType" />
                </Motion>
            </Presence>

            <!-- Items Section with animated empty state -->
            <div class="card p-4 mb-6 shadow">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold">Order Items <span class="text-red-600 font-bold">*</span></h2>
                </div>

                <div v-if="showValidation && items.length === 0" class="mt-6">
                    <Message severity="error" icon="pi pi-times-circle" text="At least one item is required" />
                </div>

                <Presence>
                    <!-- Empty Items View -->
                    <Motion
                        v-if="items.length === 0"
                        :key="budgetType"
                        :initial="{ opacity: 0, y: 20 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :exit="{ opacity: 0, y: -20 }"
                        :transition="{ duration: 0.6 }"
                        class="flex justify-center items-center py-10 text-gray-500"
                    >
                        <div class="text-center">
                            <div class="text-5xl mb-2">📦</div>
                            <p>No items added yet</p>
                            <div class="flex gap-2 justify-center mt-4">
                                <Button v-if="budgetType === 'Budgeted Item'" label="Add from Budget" icon="pi pi-box" outlined @click="openBulkItemModal" />
                                <Button v-if="budgetType === 'Unbudgeted Item'" label="+ Add First Item" @click="addItem" />
                            </div>
                        </div>
                    </Motion>

                    <!-- DataTable -->
                    <Motion v-else :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }" :transition="{ duration: 0.6 }" class="overflow-x-auto">
                        <div class="flex gap-2 justify-end mt-4">
                            <Button v-if="budgetType === 'Budgeted Item'" label="Add from Budget" icon="pi pi-box" outlined @click="openBulkItemModal" />
                            <Button v-if="budgetType === 'Unbudgeted Item'" label="+ Add First Item" @click="addItem" />
                        </div>
                        <DataTable :value="items" class="rounded-lg" scrollable scrollHeight="400px">
                            <Column field="itemCode" header="Item Code" style="min-width: 120px; width: 20%">
                                <template #body="{ data }">
                                    <Dropdown v-model="data.itemCode" :options="itemOptions" optionLabel="label" optionValue="value" placeholder="Select item..." class="w-full" @change="fillItemDetails(data)">
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

                            <Column field="description" header="Description" style="min-width: 200px; width: 25%">
                                <template #body="{ data }">
                                    <div class="px-2">{{ data.description }}</div>
                                </template>
                            </Column>

                            <Column field="location" header="Location" style="min-width: 150px; width: 18%">
                                <template #body="{ data }">
                                    <div class="px-2">{{ data.location }}</div>
                                </template>
                            </Column>

                            <Column field="uom" header="UOM" style="min-width: 70px; width: 70px">
                                <template #body="{ data }">
                                    <div class="text-center">{{ data.uom }}</div>
                                </template>
                            </Column>

                            <Column field="quantity" header="Quantity" style="min-width: 110px; width: 110px">
                                <template #body="{ data }">
                                    <InputNumber v-model.number="data.quantity" class="w-full" :min="0" />
                                </template>
                            </Column>

                            <Column field="price" header="Price" style="min-width: 140px; width: 140px; display: none">
                                <template #body="{ data }">
                                    <InputNumber v-model="data.price" mode="currency" currency="MYR" locale="en-MY" class="w-full" :minFractionDigits="2" />
                                </template>
                            </Column>

                            <Column header="Total" style="min-width: 130px; width: 130px; text-align: right; display: none">
                                <template #body="{ data }">
                                    <span class="font-semibold pr-2">
                                        {{
                                            ((data.price ?? 0) * (data.quantity ?? 0)).toLocaleString('en-MY', {
                                                style: 'currency',
                                                currency: 'MYR'
                                            })
                                        }}
                                    </span>
                                </template>
                            </Column>

                            <Column field="deliveryDate" header="Delivery Date" style="min-width: 150px; width: 150px">
                                <template #body="{ data }">
                                    <DatePicker v-model="data.deliveryDate" placeholder="mm/dd/yyyy" dateFormat="mm/dd/yy" class="w-full" />
                                </template>
                            </Column>

                            <Column header="Action" style="min-width: 60px; width: 60px; text-align: center">
                                <template #body="{ data, index }">
                                    <Button icon="pi pi-ellipsis-v" text @click="toggleMenu($event, index)" />
                                    <Menu :model="getActionItems(data, index)" :popup="true" :ref="(el: any) => setMenuRef(el, index)" />
                                </template>
                            </Column>
                        </DataTable>
                    </Motion>
                </Presence>

                <div class="pt-3 mt-2 border-t text-right text-lg font-semibold" style="display: none">Total: {{ grandTotal.toLocaleString('en-MY', { style: 'currency', currency: 'MYR' }) }}</div>

                <!-- Attachments and Remark remain unchanged -->
                <div class="mt-4">
                    <label class="block text-sm text-gray-600 mb-2">Attachments</label>
                    <div v-if="existingAttachments.length > 0" class="mb-4">
                        <h4 class="text-sm font-semibold mb-2">Existing Attachments</h4>
                        <div class="flex flex-wrap gap-2">
                            <div v-for="(file, index) in existingAttachments" :key="`existing-${index}`" class="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                                <i class="pi pi-file"></i>
                                <span class="text-sm">{{ file.filename }}</span>
                                <Button icon="pi pi-eye" text rounded severity="info" @click="previewAttachment(file)" />
                                <Button icon="pi pi-times" text rounded severity="danger" @click="removeAttachment(index, 'existing')" />
                            </div>
                        </div>
                    </div>

                    <FileUpload name="attachments" :multiple="true" accept="image/*" :maxFileSize="1000000" :auto="false" @select="onSelectedFiles" :showUploadButton="false" :showCancelButton="false">
                        <template #content>
                            <div v-if="newAttachments.length > 0" class="mt-4 flex flex-wrap gap-2">
                                <div v-for="(file, index) in newAttachments" :key="`new-${index}`" class="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                                    <i class="pi pi-file"></i>
                                    <span class="text-sm">{{ file.name }}</span>
                                    <span v-if="file.size" class="text-xs text-gray-500">({{ formatSize(file.size) }})</span>
                                    <Button icon="pi pi-times" text rounded severity="danger" @click="removeAttachment(index, 'new')" />
                                </div>
                            </div>
                        </template>
                        <template #empty>
                            <div class="flex items-center justify-center flex-col p-4">
                                <i class="pi pi-cloud-upload text-4xl text-gray-400 mb-2" />
                                <p class="text-sm text-gray-500">Drag and drop files here or click "Choose Files"</p>
                            </div>
                        </template>
                    </FileUpload>
                </div>

                <div class="mt-4">
                    <label class="block text-sm text-gray-600 mb-1">Remark</label>
                    <Textarea v-model="overallRemark" rows="3" class="w-full" placeholder="Add any additional remarks or notes..." />
                </div>

                <div class="pt-3 mt-2 border-t text-sm text-gray-600 flex justify-between">
                    <span>{{ items.length }} {{ items.length > 1 ? 'items' : 'item' }}</span>
                    <span>{{ budgetType === 'Budgeted Item' ? 'Budgeted' : 'Unbudgeted' }}</span>
                </div>
            </div>

            <div class="flex justify-end gap-3">
                <Button label="Cancel" @click="$router.push('/request-orders')" outlined />
                <Button label="Save as Draft" severity="secondary" outlined @click="saveDraft" v-tooltip="'Save for later'" />
                <Button label="Submit Request Order" @click="openPreviewModal" />
            </div>
        </div>

        <!-- Modal Components -->
        <CreateROModal v-model:visible="showBulkItemModal" @items-selected="handleSelectedItems" />
        <PreviewRo v-model:visible="showPreviewModal" :summaryData="previewSummary" @submit="submitRequestOrder" />
    </Motion>
    <ConfirmDialog />
</template>
