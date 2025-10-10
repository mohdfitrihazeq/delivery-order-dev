<script lang="ts" src="./EditRo.script.ts"></script>

<template>
    <Dialog v-model:visible="localVisible" :modal="true" header="Edit Request Order" :style="{ width: '90vw', maxWidth: '1200px' }">
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
                        <label class="block text-sm font-semibold mb-2">Total Amount</label>
                        <InputNumber v-model="editForm.totalAmount" mode="decimal" :minFractionDigits="2" class="w-full" disabled />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">Budget Type</label>
                        <Dropdown v-model="editForm.budgetType" :options="budgetTypeOptions" optionLabel="label" optionValue="value" class="w-full" disabled />
                    </div>
                </div>

                <h3 class="font-semibold mb-3">Requested Items</h3>
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
                    <Column field="notes" header="Notes">
                        <template #body="slotProps">
                            <InputText v-model="slotProps.data.notes" class="w-full" />
                        </template>
                    </Column>
                    <Column header="Actions">
                        <template #body="slotProps">
                            <Button icon="pi pi-trash" severity="danger" text @click="removeItem(slotProps.index)" />
                        </template>
                    </Column>
                </DataTable>
                <Button label="Add Item" icon="pi pi-plus" outlined @click="addItem" class="mb-4 mt-4" />

                <!-- Overall Attachments -->
                <div class="mt-4">
                    <label class="block text-sm text-gray-600 mb-5">Attachments</label>
                    <FileUpload v-model="attachments" name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
                        <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                            <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                                <div class="flex gap-2">
                                    <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined></Button>
                                    <Button @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0"></Button>
                                    <Button @click="onClearTemplatingUpload(clearCallback)" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
                                </div>
                                <ProgressBar :value="totalSizePercent" :showValue="true" class="md:w-20rem h-1rem w-full md:ml-auto relative">
                                    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white-600"> {{ totalSize }}B / 1MB </span>
                                </ProgressBar>
                            </div>
                        </template>

                        <template #content="{ files, uploadedFiles, removeUploadedFileCallback }">
                            <div v-if="files.length > 0">
                                <h5>Pending</h5>
                                <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                    <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                        <div>
                                            <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                        </div>
                                        <span class="font-semibold">{{ file.name }}</span>
                                        <div>{{ formatSize(file.size) }}</div>
                                        <Badge value="Pending" severity="warning" />
                                        <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded severity="danger" />
                                    </div>
                                </div>
                            </div>

                            <div v-if="uploadedFiles.length > 0">
                                <h5>Completed</h5>
                                <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                    <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                        <div>
                                            <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                        </div>
                                        <span class="font-semibold">{{ file.name }}</span>
                                        <div>{{ formatSize(file.size) }}</div>
                                        <Badge value="Completed" class="mt-3" severity="success" />
                                        <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded severity="danger" />
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #empty>
                            <div class="flex items-center justify-center flex-col">
                                <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
                                <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
                            </div>
                        </template>
                    </FileUpload>
                </div>

                <!-- Overall Remark -->
                <div class="mt-4">
                    <label class="block text-sm text-gray-600 mb-1">Remark</label>
                    <Textarea v-model="Remark" rows="3" class="w-full" placeholder="Add any additional remarks or notes..." />
                </div>
                <div v-if="editForm.attachments && editForm.attachments.length" class="mt-3">
                    <h6>Attachments:</h6>
                    <div class="flex flex-wrap gap-3">
                        <div v-for="(file, index) in editForm.attachments" :key="index" class="flex items-center gap-2 cursor-pointer" @click="previewAttachment(file)">
                            <i class="pi pi-paperclip text-blue-600"></i>
                            <span class="text-sm text-blue-600 hover:underline">
                                {{ getAttachmentName(file) }}
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <template #footer>
            <div class="flex justify-end gap-2">
                <Button label="Cancel" severity="secondary" outlined icon="pi pi-times" @click="handleCancel" />
                <Button label="Save Changes" severity="success" icon="pi pi-check" @click="handleSave" :disabled="loading" :loading="loading" />
            </div>
        </template>
    </Dialog>
</template>
