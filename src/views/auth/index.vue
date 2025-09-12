<script setup lang="ts">
import LoginForm from './components/form/LoginForm.vue';
import { useLoginCardAnimation } from './index.script';

const { loginCard } = useLoginCardAnimation();
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
                <div class="flex justify-center mb-6">
                    <img src="/images/logo/prosync-logo.png" alt="Prosync Logo" class="h-10" />
                </div>
                <h1 class="text-2xl font-bold text-center mb-1 custom-text-gradient bg-clip-text">DO SYSTEM</h1>
                <p class="text-center text-gray-500 mb-6">Delivery order management system</p>
                <LoginForm />
            </div>
        </div>
    </div>

    <footer class="absolute bottom-4 w-full text-center text-white text-sm">© 2025 Prosync Construction Solutions.</footer>
</template>
