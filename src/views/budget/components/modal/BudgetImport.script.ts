import { useToast } from 'primevue/usetoast';
import { ref, watch } from 'vue';

export default function useImportBudgetDialogLogic(props: { visible: boolean }, emit: (e: 'close') => void) {
    // ---------------------------
    // 1. REACTIVE STATE
    // ---------------------------
    const toast = useToast();
    const internalVisible = ref(props.visible);

    // ---------------------------
    // 2. WATCHERS
    // ---------------------------
    watch(
        () => props.visible,
        (val) => {
            internalVisible.value = val;
        }
    );

    // ---------------------------
    // 3. FUNCTIONS
    // ---------------------------
    function onHide() {
        emit('close');
        internalVisible.value = false;
    }

    function onAdvancedUpload(event: any) {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'File Uploaded',
            life: 3000
        });
        event.options.clear();
    }

    // ---------------------------
    // 4. RETURN
    // ---------------------------
    return {
        internalVisible,
        onHide,
        onAdvancedUpload
    };
}
