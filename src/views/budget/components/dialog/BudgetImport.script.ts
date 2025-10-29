import { budgetService } from '@/services/budgetService.service';
import { useToast } from 'primevue/usetoast';
import { ref, watch } from 'vue';
import * as XLSX from 'xlsx';

export default function useImportBudgetDialogLogic(props: { visible: boolean }, emit: (e: 'close') => void) {
    const toast = useToast();
    const internalVisible = ref(props.visible);
    const selectedFile = ref<File | null>(null);
    const isSubmitting = ref(false);

    // ---------------------------
    // WATCH DIALOG VISIBLE
    // ---------------------------
    watch(
        () => props.visible,
        (val) => {
            internalVisible.value = val;
        }
    );

    // ---------------------------
    // CLOSE DIALOG
    // ---------------------------
    function onHide() {
        emit('close');
        internalVisible.value = false;
        selectedFile.value = null;
    }

    // ---------------------------
    // DOWNLOAD TEMPLATE FILE
    // ---------------------------
    function onDownloadFormat() {
        try {
            const headers = [['LOC 1', 'LOC 2', 'ELEMENT', 'SUB ELEMENT', 'SUB SUB ELEMENT', 'ITEM TYPE', 'ITEM CODE', 'PUR.DESCRIPTION', 'DESC 2', 'UNIT', 'BUDGET QTY', 'RATE', 'AMOUNT', 'WASTAGE']];

            const worksheet = XLSX.utils.aoa_to_sheet(headers);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Budget Template');

            const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([wbout], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Budget_Template.xlsx';
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);
        } catch (error) {
            toast.add({
                severity: 'error',
                summary: 'Download Failed',
                detail: 'Unable to create template file.',
                life: 3000
            });
        }
    }

    // ---------------------------
    // FILE SELECT (but not upload yet)
    // ---------------------------
    function onFileSelect(event: any) {
        const file = event.files?.[0];
        if (!file) {
            toast.add({
                severity: 'warn',
                summary: 'No File',
                detail: 'Please select a file.',
                life: 2000
            });
            return;
        }
        selectedFile.value = file;
        toast.add({
            severity: 'info',
            summary: 'File Selected',
            detail: file.name,
            life: 2000
        });
    }

    // ---------------------------
    // SUBMIT UPLOAD
    // ---------------------------
    async function onSubmitUpload() {
        if (!selectedFile.value) {
            toast.add({
                severity: 'warn',
                summary: 'No File',
                detail: 'Please select a file before submitting.',
                life: 3000
            });
            return;
        }

        const projectId = JSON.parse(localStorage.getItem('selectedProject') || '{}')?.ProjectId;
        if (!projectId) {
            toast.add({
                severity: 'warn',
                summary: 'Missing Project',
                detail: 'Please select a project before importing.',
                life: 4000
            });
            return;
        }

        try {
            isSubmitting.value = true;

            const formData = new FormData();
            formData.append('projectId', String(projectId));
            formData.append('file', selectedFile.value);

            const response = await budgetService.createBudget(formData);

            if (response?.success) {
                toast.add({
                    severity: 'success',
                    summary: 'Upload Successful',
                    detail: 'Budget file uploaded successfully!',
                    life: 3000
                });
                onHide();
            } else {
                toast.add({
                    severity: 'error',
                    summary: 'Upload Failed',
                    detail: response?.message || 'Failed to upload file.',
                    life: 4000
                });
            }
        } catch (err: any) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: err?.response?.data?.message || 'An error occurred while uploading.',
                life: 4000
            });
        } finally {
            isSubmitting.value = false;
        }
    }

    return {
        internalVisible,
        onHide,
        onFileSelect,
        onDownloadFormat,
        onSubmitUpload,
        selectedFile,
        isSubmitting
    };
}
