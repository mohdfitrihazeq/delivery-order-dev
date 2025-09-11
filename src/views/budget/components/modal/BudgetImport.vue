<script setup lang="ts">
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast';
import { defineEmits, defineProps } from 'vue';
import useImportBudgetDialogLogic from './BudgetImportLogic';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const { internalVisible, onHide, onAdvancedUpload } = useImportBudgetDialogLogic(props, emit);
</script>

<template>
    <Dialog v-model:visible="internalVisible" modal header="Import Budget Items" :style="{ width: '43vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @hide="onHide">
        <p class="m-0">Upload a CSV file with budget items. Required columns: item_code, description, element, 1st_sub_element, 2nd_sub_element, location1, location2, uom, budget_qty, rate, amount, wastage.</p>
        <br />
        <Toast />
        <FileUpload name="files" :customUpload="true" @upload="onAdvancedUpload" :multiple="false" accept=".csv" :maxFileSize="2000000" choose-label="Choose CSV" upload-label="Upload" cancel-label="Cancel">
            <template #empty>
                <span>Drag and drop CSV files here to upload.</span>
            </template>
        </FileUpload>
        <br />
    </Dialog>
</template>
