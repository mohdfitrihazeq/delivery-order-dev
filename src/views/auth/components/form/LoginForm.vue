<script setup lang="ts">
import Button from 'primevue/button';
import { defineEmits, defineProps, watch } from 'vue';
import { useLoginForm } from './LoginForm.script';

const props = defineProps<{
    modelValueUsername?: string;
    modelValuePassword?: string;
    useRealAPI?: boolean;
}>();

const emit = defineEmits(['update:modelValueUsername', 'update:modelValuePassword', 'update:useRealAPI']);

const { username, password, showPassword, togglePasswordVisibility, handleSubmit, isLoading, useRealAPI } = useLoginForm(props);

watch(username, (val) => emit('update:modelValueUsername', val));
watch(password, (val) => emit('update:modelValuePassword', val));
watch(useRealAPI, (val) => emit('update:useRealAPI', val));
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Username -->
        <div>
            <input v-model="username" type="text" placeholder="Username" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 focus:outline-none" />
        </div>

        <!-- Password -->
        <div class="relative">
            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 focus:outline-none pr-10" />
            <button type="button" class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500" @click="togglePasswordVisibility">
                <i v-if="!showPassword" class="pi pi-eye"></i>
                <i v-else class="pi pi-eye-slash"></i>
            </button>
        </div>

        <!-- Submit Button -->
        <Button type="submit" label="Login" class="w-full" severity="info" :loading="isLoading" :disabled="isLoading" />
    </form>
</template>
