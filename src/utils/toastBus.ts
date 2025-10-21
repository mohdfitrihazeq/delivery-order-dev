import { useToast } from 'primevue/usetoast';

let toastInstance: ReturnType<typeof useToast> | null = null;

// Register the global PrimeVue toast instance
export function setGlobalToast(toast: ReturnType<typeof useToast>) {
    toastInstance = toast;
}

// Get the instance safely anywhere
export function getGlobalToast() {
    if (!toastInstance) {
        console.warn('⚠️ PrimeVue toast not initialized yet');
    }
    return toastInstance;
}
