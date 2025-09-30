import { ref } from 'vue';
import { login } from '../../index.script';

export function useLoginForm() {
    const username = ref('');
    const password = ref('');
    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
    };

    const handleSubmit = () => {
        const result = login(username.value, password.value);

        console.log('result', result);
    };

    return {
        username,
        password,
        showPassword,
        togglePasswordVisibility,
        handleSubmit
    };
}
