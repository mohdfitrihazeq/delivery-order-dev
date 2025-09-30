<script setup lang="ts">
import { setToastInstance } from '@/utils/NotificationToast.utils';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
setToastInstance(toast);
</script>

<template>
    <router-view v-slot="{ Component }">
        <Motion :initial="{ opacity: 0, x: 40 }" :animate="{ opacity: 1, x: 0 }" :exit="{ opacity: 0, x: -40 }" :transition="{ duration: 0.4 }">
            <component :is="Component" />
        </Motion>

        <Toast />
    </router-view>
</template>
