<template>
  <FullScreenLayout>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-l from-teal-800 via-teal-700 to-cyan-400">
      <!-- Card -->
      <div class="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border border-white">
        <!-- Left Section -->
        <div class="hidden lg:block w-1/2">
          <img src="/images/logo/illustration-truck-new.png" alt="Delivery Illustration"
            class="object-cover w-full h-full" />
        </div>

        <!-- Right Section -->
        <div class="flex flex-col justify-center w-full lg:w-1/2 p-10">
          <!-- Logo -->
          <div class="flex justify-center mb-6">
            <img src="/images/logo/prosync-logo.png" alt="Prosync Logo" class="h-10" />
          </div>

          <!-- Title -->
          <h1 class="text-2xl font-bold text-center mb-1 
         bg-gradient-to-r from-teal-800 to-teal-400 
         bg-clip-text text-transparent">
            DO SYSTEM
          </h1>

          <p class="text-center text-gray-500 mb-6">Delivery order management system</p>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <input v-model="username" type="text" placeholder="Username"
                class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none" />
            </div>
            <div>
              <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password"
                class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none" />
            </div>
            <div class="flex justify-between text-sm">
              <router-link to="/reset-password" class="text-teal-600 hover:underline">
                Forgot password?
              </router-link>
            </div>
            <button type="submit" class="w-full py-2 text-white bg-cyan-500 rounded-md hover:bg-cyan-600 transition">
              Login
            </button>
          </form>

        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="absolute bottom-4 w-full text-center text-gray-200 text-sm">
      © 2025 Prosync Construction Solutions.
    </footer>
  </FullScreenLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommonGridShape from '@/components/common/CommonGridShape.vue'
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const keepLoggedIn = ref(false)
const username = ref('')

// const handleSubmit = () => {
//   console.log('Login:', { username: username.value, password: password.value })
// }

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted', {
    email: email.value,
    password: password.value,
    keepLoggedIn: keepLoggedIn.value,
  })
}
</script>
