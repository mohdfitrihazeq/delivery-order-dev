<script lang="ts" src="./deliveryInfo.script"></script>

<template>
    <div class="p-mb-5 mt-5">
        <Message severity="secondary" variant="outlined" :closable="false">
            <i class="pi pi-exclamation-circle"></i>
            Provide delivery information. Driver plate number and photos are optional - you can proceed directly to select Purchase Order.
        </Message>

        <Card class="mt-6 border">
            <template #title> <i class="pi pi-truck"></i> Delivery Information </template>
            <template #content>
                <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit" class="flex flex-col gap-4 mt-1 w-full sm:w-full">
                    <div class="grid grid-cols-2 gap-4 p-3">
                        <!-- Driver Plate Number -->
                        <div class="flex flex-col">
                            <label for="driverPlate">Driver Plate Number</label>
                            <InputText name="driverPlate" placeholder="Plate Number" fluid />
                            <Message v-if="errors.driverPlate" severity="error" size="small" variant="simple">
                                {{ errors.driverPlate }}
                            </Message>
                        </div>

                        <!-- Delivery Date -->
                        <div class="flex flex-col">
                            <label for="deliveryDate">Delivery Date</label>
                            <Calendar name="deliveryDate" placeholder="Select Date" showIcon :showTime="true" />
                            <Message v-if="errors.deliveryDate" severity="error" size="small" variant="simple">
                                {{ errors.deliveryDate }}
                            </Message>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4 p-3">
                        <div class="flex flex-col">
                            <label for="driverPlate">Additional Noted</label>
                            <Textarea name="remarks" rows="5" cols="30" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4 p-3">
                        <Toast ref="toastRef" />
                        <div>
                            <label class="font-semibold text-gray-800 flex items-center">
                                <i class="pi pi-camera mr-2"></i>
                                Delivery Evidence Photos
                            </label>
                            <p class="text-sm text-gray-500 mt-1">Upload photos of delivered items (optional, max 5 photos)</p>
                        </div>
                        <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
                            <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                                <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                                    <div class="flex gap-2">
                                        <Button @click="chooseCallback()" icon="pi pi-images" rounded variant="outlined" severity="secondary" />
                                        <Button @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded variant="outlined" severity="success" :disabled="!files || files.length === 0" />
                                        <Button @click="clearCallback()" icon="pi pi-times" rounded variant="outlined" severity="danger" :disabled="!files || files.length === 0" />
                                    </div>
                                    <ProgressBar :value="totalSizePercent" :showValue="false" class="md:w-20rem h-1 w-full md:ml-auto">
                                        <span class="whitespace-nowrap">{{ totalSize }}B / 1MB</span>
                                    </ProgressBar>
                                </div>
                            </template>

                            <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                                <div class="flex flex-col gap-8 pt-4">
                                    <div v-if="files.length > 0">
                                        <h5>Pending</h5>
                                        <div class="flex flex-wrap gap-4">
                                            <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                                <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                                                <div>{{ formatSize(file.size) }}</div>
                                                <Badge value="Pending" severity="warn" />
                                                <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" variant="outlined" rounded severity="danger" />
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="uploadedFiles.length > 0">
                                        <h5>Completed</h5>
                                        <div class="flex flex-wrap gap-4">
                                            <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                                <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                                                <div>{{ formatSize(file.size) }}</div>
                                                <Badge value="Completed" class="mt-4" severity="success" />
                                                <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" variant="outlined" rounded severity="danger" />
                                            </div>
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
                    <div class="flex justify-end mt-4"><Button type="submit" label="Next" severity="primary" /></div>
                </Form>
            </template>
        </Card>
    </div>
</template>
