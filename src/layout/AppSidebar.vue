<script setup lang="ts">
import { Motion } from '@motionone/vue';
import { onMounted, ref } from 'vue';
import Menu from './menu/Menu.vue';
import { useLayout } from '@/layout/composables/layout';

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();
const username = ref<string | null>(null);
const role = ref<string | null>(null);

onMounted(() => {
    const user = localStorage.getItem('user');
    if (user) {
        try {
            const parsed = JSON.parse(user);
            username.value = parsed.username;
            role.value = parsed.role;
        } catch {
            username.value = user;
            role.value = null;
        }
    }
});

const initials = (name: string | null) => {
    if (!name) return '';
    return name
        .split(' ')
        .map((n) => n[0]?.toUpperCase())
        .join('')
        .slice(0, 2);
};
</script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="layout-sidebar shadow-sm">
            <!-- LEFT: Menu button and DO SYSTEM title -->
            <div class="flex items-center gap-4" style="padding: 1.5rem 0.2rem">
                <router-link to="/" class="layout-topbar-logo hidden sm:block">
                    <h1 class="text-2xl font-extrabold leading-tight m-0 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">DO SYSTEM</h1>
                </router-link>
            </div>
            <Menu></Menu>
        </div>
    </Motion>
</template>
