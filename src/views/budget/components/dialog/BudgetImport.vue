<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast';
import { defineEmits, defineProps } from 'vue';
import useImportBudgetDialogLogic from './BudgetImport.script';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'success'): void;
}>();

const { internalVisible, onHide, onFileSelect, onDownloadFormat, onSubmitUpload, selectedFile, isSubmitting } = useImportBudgetDialogLogic(props, emit);
</script>

<template>
    <Dialog v-model:visible="internalVisible" modal header="Import Budget Items" :style="{ width: '43vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @hide="onHide">
        <div class="flex items-start justify-between mb-3 gap-4">
            <p class="m-0 text-muted text-sm leading-relaxed">
                Upload a <strong>CSV</strong> or <strong>Excel</strong> file with budget items.<br />
                <span class="text-secondary"> Required columns: item_code, description, element, sub_element, 1st_sub_element, 2nd_sub_element, location1, location2, uom, budget_qty, rate, amount, wastage. </span>
            </p>

            <a href="javascript:void(0)" @click="onDownloadFormat" class="flex flex-col items-center text-primary text-xs hover:text-blue-600 transition-all duration-200">
                <i class="pi pi-download text-lg mb-1"></i>
                <span class="text-center leading-tight">Download</span>
            </a>
        </div>

        <Toast />
        <FileUpload mode="basic" name="file" customUpload @select="onFileSelect" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" chooseLabel="Choose File" class="w-full mb-3" />

        <div v-if="selectedFile" class="text-sm text-green-700 mt-2"><i class="pi pi-file-excel mr-1"></i> {{ selectedFile.name }}</div>

        <div class="flex justify-end gap-3 mt-4">
            <Button label="Cancel" class="p-button-text" @click="onHide" />
            <Button label="Submit" icon="pi pi-upload" :loading="isSubmitting" class="p-button-primary" :disabled="!selectedFile || isSubmitting" @click="onSubmitUpload" />
        </div>
    </Dialog>
</template>

<style scoped>
.text-secondary {
    color: #6c757d;
}
</style>
