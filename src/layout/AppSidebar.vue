<script setup lang="ts">
import { Motion } from '@motionone/vue';
import { onMounted, ref } from 'vue';
import Menu from './menu/Menu.vue';

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
            <Menu></Menu>
        </div>
    </Motion>
</template>
