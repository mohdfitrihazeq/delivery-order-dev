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
    <div class="flex items-center justify-center min-h-screen p-4 custom-layout-gradient shadow-lg">
        <!-- Card -->
        <div ref="loginCard" class="login-card flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden border border-white">
            <!-- Left Section -->
            <div class="hidden lg:flex w-1/2 bg-blue-100 items-center justify-center">
                <img src="/images/logo/illustration-truck.png" alt="Delivery Illustration" class="object-contain w-3/4 h-auto" />
            </div>

            <!-- Right Section -->
            <div class="flex flex-col justify-center w-full lg:w-1/2 p-10 bg-white">
                <!-- Logo -->
                <div class="flex justify-center mb-6">
                    <img src="/images/logo/prosync-logo.png" alt="Prosync Logo" class="h-10" />
                </div>

                <!-- Title -->
                <h1 class="text-2xl font-bold text-center mb-1 custom-text-gradient bg-clip-text">DO SYSTEM</h1>

                <p class="text-center text-gray-500 mb-6">Delivery order management system</p>

                <!-- AuthForm Component -->
                <LoginForm />
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="absolute bottom-4 w-full text-center text-white text-sm">© 2025 Prosync Construction Solutions.</footer>
</template>
