import { useToast } from 'primevue/usetoast';

let toastInstance: any;

export function getToast() {
    if (!toastInstance) {
        try {
            toastInstance = useToast();
        } catch {
            console.warn('⚠️ PrimeVue Toast not available yet.');
        }
    }
    return toastInstance;
}

export function showError(error: any, fallbackMessage = 'Something went wrong.') {
    const toast = getToast();
    if (!toast) return;

    const message = error?.response?.data?.message || error?.message || fallbackMessage;

    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 4000
    });
}

export function showSuccess(message?: string, fallbackMessage = 'Success.') {
    const toast = getToast();
    if (!toast) return;

    toast.add({
        severity: 'success',
        summary: 'Success',
        detail: message || fallbackMessage,
        life: 4000
    });
}
