import { useToast } from 'primevue/usetoast';

export function showError(error: any, fallbackMessage = 'Something went wrong.') {
    const toast = useToast();
    const message = error?.response?.data?.message || error?.message || fallbackMessage;

    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 4000
    });
}
