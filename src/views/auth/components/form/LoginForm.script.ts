import { useAuthStore } from '@/stores/auth/auth.store';
import { useToast } from 'primevue/usetoast';
import { nextTick, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export function useLoginForm(props?: { modelValueUsername?: string; modelValuePassword?: string; useRealAPI?: boolean }) {
    const username = ref(props?.modelValueUsername || '');
    const password = ref(props?.modelValuePassword || '');
    const useRealAPI = ref(props?.useRealAPI ?? true);
    const showPassword = ref(false);
    const isLoading = ref(false);

    const router = useRouter();
    const toast = useToast();
    const authStore = useAuthStore();

    // Sync props with local state
    if (props) {
        watch(
            () => props.modelValueUsername,
            (val) => {
                if (val !== undefined) username.value = val;
            }
        );
        watch(
            () => props.modelValuePassword,
            (val) => {
                if (val !== undefined) password.value = val;
            }
        );
        watch(
            () => props.useRealAPI,
            (val) => {
                if (val !== undefined) useRealAPI.value = val;
            }
        );
    }

    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
    };

    const handleSubmit = async () => {
        if (!username.value || !password.value) {
            toast.add({
                severity: 'warn',
                summary: 'Missing Credentials',
                detail: 'Please enter username and password',
                life: 3000
            });
            return;
        }

        try {
            isLoading.value = true;

            // Minimal delay so spinner is visible
            await new Promise((r) => setTimeout(r, 300));

            const success = await authStore.login(username.value, password.value, useRealAPI.value);

            if (success) {
                await nextTick();

                toast.add({
                    severity: 'success',
                    summary: 'Login Successful',
                    detail: `Welcome ${authStore.userRole}!`,
                    life: 3000
                });

                router.push({ name: 'dashboard' });
            } else {
                toast.add({
                    severity: 'error',
                    summary: 'Login Failed',
                    detail: 'Invalid username or password',
                    life: 3000
                });
            }
        } catch (err) {
            console.error('Login failed:', err);
            toast.add({
                severity: 'error',
                summary: 'Login Error',
                detail: 'An error occurred during login',
                life: 3000
            });
        } finally {
            isLoading.value = false;
        }
    };

    return {
        username,
        password,
        showPassword,
        togglePasswordVisibility,
        handleSubmit,
        isLoading,
        useRealAPI
    };
}
