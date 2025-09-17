<script setup lang="ts">
import LoginForm from './components/form/LoginForm.vue';
import { useLoginCardAnimation } from './index.script';

const { loginCard } = useLoginCardAnimation();
</script>

<template>
    <div class="flex items-center justify-center min-h-screen p-4 custom-layout-gradient shadow-lg">
        <!-- Card -->
        <div ref="loginCard" class="login-card flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
            <!-- Left Section -->
            <div class="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400 items-center justify-center">
                <div class="flex flex-col items-center text-center px-6">
                    <!-- Truck higher -->
                    <img src="/images/logo/illustration-truck.png" alt="Delivery Illustration" class="object-contain w-2/3 drop-shadow-lg -mt-4" />

                    <!-- Tagline lower -->
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
                <LoginForm />
            </div>
        </div>
    </div>

    <footer class="absolute bottom-4 w-full text-center text-white text-sm">© 2025 Prosync Construction Solutions.</footer>
</template>
