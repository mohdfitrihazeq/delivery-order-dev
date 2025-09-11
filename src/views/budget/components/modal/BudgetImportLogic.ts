import { useToast } from 'primevue/usetoast';
import { ref, watch } from 'vue';

export default function useImportBudgetDialogLogic(props: { visible: boolean }, emit: (e: 'close') => void) {
    const toast = useToast();
    const internalVisible = ref(props.visible);

    watch(
        () => props.visible,
        (val) => {
            internalVisible.value = val;
        }
    );

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

    return { internalVisible, onHide, onAdvancedUpload };
}
