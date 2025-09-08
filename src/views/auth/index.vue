<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { animate } from '@motionone/dom';
import { onMounted, ref } from 'vue';
import LoginForm from './components/LoginForm.vue';

const loginCard = ref<HTMLElement | null>(null);

onMounted(() => {
    if (loginCard.value) {
        animate(
            loginCard.value,
            {
                opacity: [0, 1],
                transform: ['translateY(-40px)', 'translateY(0)']
            },
            {
                duration: 0.8,
                easing: 'ease-out'
            }
        );
    }
});
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-l from-teal-800 via-teal-700 to-cyan-400">
        <!-- Card -->
        <div ref="loginCard" class="login-card flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border border-white">
            <!-- Left Section -->
            <div class="hidden lg:block w-1/2">
                <img src="/images/logo/illustration-truck-new.png" alt="Delivery Illustration" class="object-cover w-full h-full" />
            </div>

            <!-- Right Section -->
            <div class="flex flex-col justify-center w-full lg:w-1/2 p-10">
                <!-- Logo -->
                <div class="flex justify-center mb-6">
                    <img src="/images/logo/prosync-logo.png" alt="Prosync Logo" class="h-10" />
                </div>

                <!-- Title -->
                <h1 class="text-2xl font-bold text-center mb-1 bg-gradient-to-r from-teal-800 to-teal-400 bg-clip-text text-transparent">DO SYSTEM</h1>

                <p class="text-center text-gray-500 mb-6">Delivery order management system</p>

                <!-- AuthForm Component -->
                <LoginForm />
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="absolute bottom-4 w-full text-center text-gray-200 text-sm">© 2025 Prosync Construction Solutions.</footer>
</template>
