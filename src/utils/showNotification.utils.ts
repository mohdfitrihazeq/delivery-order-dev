export interface ToastServiceMethods {
    add: (options: { severity?: string; summary?: string; detail?: string; life?: number }) => void;
    removeAll?: () => void;
}

let globalToast: ToastServiceMethods | null = null;

export function setGlobalToast(toastInstance: ToastServiceMethods) {
    globalToast = toastInstance;
}

export function showSuccess(message?: string, fallbackMessage = 'Success.') {
    console.log('show Success with message', message);
    console.log('checking have globalToas', globalToast);
    if (!globalToast) {
        console.warn('⚠️ Toast not initialized');
        return;
    }

    globalToast.add({
        severity: 'success',
        summary: 'Success',
        detail: message || fallbackMessage,
        life: 4000
    });
}

export function showError(error: any, fallbackMessage = 'Something went wrong.') {
    if (!globalToast) {
        console.warn('⚠️ Toast not initialized');
        return;
    }

    const message = error?.response?.data?.message || error?.message || fallbackMessage;

    globalToast.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 4000
    });
}
