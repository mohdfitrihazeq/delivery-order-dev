<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const showPassword = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const handleSubmit = () => {
    console.log('Login attempt', { username: username.value, password: password.value });
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
            <input v-model="username" type="text" placeholder="Username" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none" />
        </div>

        <div class="relative">
            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none pr-10" />
            <button type="button" class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500" @click="togglePasswordVisibility">
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 
               2.943 9.542 7-1.274 4.057-5.064 
               7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 
               19c-4.478 0-8.268-2.943-9.542-7a10.05 
               10.05 0 012.179-3.58m2.36-2.36A9.956 
               9.956 0 0112 5c4.478 0 8.268 2.943 
               9.542 7a9.965 9.965 0 01-4.043 
               5.225M15 12a3 3 0 01-6 0 3 
               3 0 016 0z"
                    />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
                </svg>
            </button>
        </div>

        <div class="flex justify-between text-sm">
            <router-link to="/reset-password" class="text-teal-600 hover:underline"> Forgot password? </router-link>
        </div>

        <button type="submit" class="w-full py-2 text-white bg-cyan-500 rounded-md hover:bg-cyan-600 transition">Login</button>
    </form>
</template>
