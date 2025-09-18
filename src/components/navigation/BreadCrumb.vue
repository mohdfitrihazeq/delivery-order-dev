<script setup lang="ts">
import { useRouter } from 'vue-router';

interface Crumb {
    label: string;
    to?: string;
}

defineProps<{
    items: Crumb[];
}>();

const router = useRouter();

const go = (to?: string) => {
    if (to) router.push(to);
};
</script>

<template>
    <nav class="text-sm text-gray-600 mb-4">
        <ol class="flex gap-2 items-center">
            <li v-for="(item, idx) in items" :key="idx" class="flex items-center gap-2">
                <span v-if="item.to" class="cursor-pointer text-cyan-600 hover:underline" @click="go(item.to)">
                    {{ item.label }}
                </span>
                <span v-else class="font-semibold text-gray-900">{{ item.label }}</span>

                <span v-if="idx < items.length - 1">›</span>
            </li>
        </ol>
    </nav>
</template>
