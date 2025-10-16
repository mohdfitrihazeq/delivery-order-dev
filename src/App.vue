<script setup lang="ts">
import { setGlobalToast } from '@/utils/showNotification.utils';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
setGlobalToast(toast);
</script>

<template>
    <Toast />
    <router-view v-slot="{ Component }">
        <Motion :initial="{ opacity: 0, x: 40 }" :animate="{ opacity: 1, x: 0 }" :exit="{ opacity: 0, x: -40 }" :transition="{ duration: 0.4 }">
            <component :is="Component" />
        </Motion>
    </router-view>
</template>
