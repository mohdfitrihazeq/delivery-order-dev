import { useToast } from 'primevue/usetoast';

let toastInstance: ReturnType<typeof useToast> | null = null;

export function setToastInstance(instance: ReturnType<typeof useToast>) {
    toastInstance = instance;
}

export function showError(error: any, fallbackMessage = 'Something went wrong.', title = 'Error') {
    if (!toastInstance) {
        console.error('Toast instance not set. Call setToastInstance() in App.vue.');
        return;
    }

    const message = error?.response?.data?.message || error?.message || fallbackMessage;

    toastInstance.add({
        severity: 'error',
        summary: title,
        detail: message,
        life: 4000
    });
}

export function showSuccess(response: any, fallbackMessage = 'Success', title = 'Success') {
    if (!toastInstance) {
        console.error('Toast instance not set. Call setToastInstance() in App.vue.');
        return;
    }

    const message = response?.data?.message || response?.message || fallbackMessage;

    toastInstance.add({
        severity: 'success',
        summary: title,
        detail: message,
        life: 4000
    });
}

// export function showInfo(message: any, fallbackMessage = "Info", title = "Info") {
//     if (!toastInstance) {
//         console.error("Toast instance not set. Call setToastInstance() in App.vue.");
//         return;
//     }

//     const details = message?.message || fallbackMessage;

//     toastInstance.add({
//         severity: "info",
//         summary: title,
//         detail: details,
//         life: 4000,
//     });
// }

// export function showWarn(message: any, fallbackMessage = "Warning", title = "Warning") {
//     if (!toastInstance) {
//         console.error("Toast instance not set. Call setToastInstance() in App.vue.");
//         return;
//     }

//     const details = message?.message || fallbackMessage;

//     toastInstance.add({
//         severity: "warn",
//         summary: title,
//         detail: details,
//         life: 4000,
//     });
// }
