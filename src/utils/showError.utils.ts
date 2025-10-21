import { getGlobalToast } from './toastBus';

export function showError(error: any, fallbackMessage = 'Something went wrong.') {
    const toast = getGlobalToast();
    const message = error?.response?.data?.message || error?.message || fallbackMessage;

    if (toast) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 4000
        });
    } else {
        console.error('[Toast Missing]', message);
    }

    return message;
}
