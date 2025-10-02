<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { computed, ref, watch } from 'vue';
import LoginForm from './components/form/LoginForm.vue';
import { useLoginCardAnimation } from './index.script';

const { loginCard } = useLoginCardAnimation();

const demoAccounts = [
    { role: 'PM', id: 'pm_user', pwd: 'pm123' },
    { role: 'Site', id: 'site_user', pwd: 'site123' },
    { role: 'Purchasing', id: 'purchasing_user', pwd: 'purchase123' }
];

const selectedDemo = ref<any>(null);
const useRealAPI = ref(false);

const loginUsername = ref('');
const loginPassword = ref('');

watch(selectedDemo, (val) => {
    if (!useRealAPI.value) {
        if (val) {
            loginUsername.value = val.id;
            loginPassword.value = val.pwd;
        } else {
            loginUsername.value = '';
            loginPassword.value = '';
        }
    }
});

watch(useRealAPI, (val) => {
    if (val) {
        selectedDemo.value = null;
        loginUsername.value = '';
        loginPassword.value = '';
    } else {
        selectedDemo.value = demoAccounts[0];
    }
});

const selectedDetails = computed(() => {
    return selectedDemo.value ? `id: ${selectedDemo.value.id} | pwd: ${selectedDemo.value.pwd}` : 'Select a demo account to view credentials';
});
</script>

<template>
    <div class="flex items-center justify-center min-h-screen p-4 custom-layout-gradient shadow-lg">
        <div ref="loginCard" class="login-card flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
            <!-- Left Section -->
            <div class="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400 items-center justify-center">
                <div class="flex flex-col items-center text-center px-6">
                    <img src="/images/logo/illustration-truck.png" alt="Delivery Illustration" class="object-contain w-2/3 drop-shadow-lg -mt-4" />
                    <h2 class="text-white text-lg font-semibold tracking-wide mt-6 mb-2">Accurate <span class="mx-3">·</span> Transparent <span class="mx-2">·</span> Reliable</h2>
                    <p class="text-white text-sm opacity-90">Your one-stop solution for managing delivery orders</p>
                </div>
            </div>

            <!-- Right Section -->
            <div class="flex flex-col justify-center w-full lg:w-1/2 p-10 bg-white">
                <div class="flex justify-center mb-6">
                    <img src="/images/logo/prosync-logo.png" alt="Prosync Logo" class="h-10" />
                </div>
                <h1 class="text-2xl font-bold text-center mb-1 bg-gradient-to-r from-cyan-700 to-blue-400 bg-clip-text text-transparent">DO SYSTEM</h1>
                <p class="text-center text-gray-500 mb-6">Delivery order management system</p>

                <!-- API Mode Checkbox -->
                <div class="mb-4 p-3 bg-gray-100 rounded-lg">
                    <label class="flex items-center cursor-pointer">
                        <input type="checkbox" v-model="useRealAPI" class="mr-2" />
                        <span class="text-sm text-gray-700">Use Real API (for testing with local backend)</span>
                    </label>
                </div>

                <!-- Demo Accounts Dropdown -->
                <div class="mt-3 border rounded-lg bg-gray-50 p-4 text-sm text-gray-700 mb-6">
                    <p class="font-semibold mb-4 text-center text-blue-600">Demo Accounts</p>
                    <Dropdown v-model="selectedDemo" :options="demoAccounts" optionLabel="role" placeholder="Select a role" class="w-full" :disabled="useRealAPI" />
                    <p class="mt-3 text-center text-gray-700">
                        {{ selectedDetails }}
                    </p>
                </div>

                <!-- Login Form -->
                <LoginForm v-model:modelValueUsername="loginUsername" v-model:modelValuePassword="loginPassword" :useRealAPI="useRealAPI" />
            </div>
        </div>
    </div>
</template>
