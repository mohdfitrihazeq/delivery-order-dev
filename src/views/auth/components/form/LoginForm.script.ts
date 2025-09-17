import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../../index.script';

export function useLoginForm() {
    const username = ref('');
    const password = ref('');
    const showPassword = ref(false);

    const router = useRouter();
    const toast = useToast();

    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
    };

    const handleSubmit = () => {
        const result = login(username.value, password.value);

        if (result.success) {
            toast.add({
                severity: 'success',
                summary: 'Login Successful',
                detail: `Welcome ${result.role}!`,
                life: 3000
            });

            // redirect after short delay so toast shows
            setTimeout(() => {
                router.push({ name: 'dashboard' });
            }, 500);
        } else {
            toast.add({
                severity: 'error',
                summary: 'Login Failed',
                detail: result.message,
                life: 3000
            });
        }
    };

    return {
        username,
        password,
        showPassword,
        togglePasswordVisibility,
        handleSubmit
    };
}
