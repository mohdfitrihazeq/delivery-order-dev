// --- utils/showNotification.utils.ts ---
export interface ToastServiceMethods {
    add: (options: { severity?: string; summary?: string; detail?: string; life?: number }) => void;
    removeAll?: () => void;
}

let globalToast: ToastServiceMethods | null = null;
let recentErrorMessages = new Set<string>();
let clearErrorTimer: number | null = null;

export function setGlobalToast(toastInstance: ToastServiceMethods) {
    globalToast = toastInstance;
}

function scheduleClear() {
    if (clearErrorTimer) clearTimeout(clearErrorTimer);
    clearErrorTimer = window.setTimeout(() => {
        recentErrorMessages.clear();
    }, 3000);
}

export function showSuccess(message?: string, fallbackMessage = 'Success.') {
    console.log('✅ showSuccess with message', message);
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
        return;
    }

    const message = error?.response?.data?.message || error?.message || error || fallbackMessage;

    if (recentErrorMessages.has(message)) {
        return;
    }

    recentErrorMessages.add(message);
    scheduleClear();

    globalToast.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 4000
    });
}
