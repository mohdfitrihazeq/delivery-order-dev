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
            <div class="flex items-center gap-3 mb-4 mt-3">
                <!-- Avatar Circle -->
                <div class="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                    {{ initials(username) }}
                </div>
                <div class="flex-1">
                    <div class="font-semibold text-gray-900 leading-tight dark:text-white">
                        {{ username || 'Guest' }}
                    </div>
                    <div class="text-xs text-gray-500 dark:text-white">
                        {{ role || 'No Role' }}
                    </div>
                </div>
            </div>
            <menu-separator></menu-separator>

            <!-- Project Sidebar -->
            <div class="flex items-center justify-between mb-2 mt-4 dark:bg-black">
                <span class="font-medium text-gray-600 dark:text-white">Project A</span>
                <span class="bg-green-500 text-white dark:text-white text-xs px-2 py-0.5 rounded-full">
                    {{ { name: 'Project A', status: 'Active', budget: 10000, spent: 4500 }.status }}
                </span>
            </div>
            <div class="bg-gray-50 border border-gray-300 rounded-md p-4 mb-4 mt-4 dark:bg-black">
                <div class="text-gray-500 text-xs mb-2">
                    <div class="mb-2 dark:text-white">
                        Budget: <span class="font-medium">${{ { name: 'Project A', status: 'Active', budget: 10000, spent: 4500 }.budget.toLocaleString() }}</span>
                    </div>
                    <div class="mb-2 dark:text-white">
                        Spent: <span class="font-medium">${{ { name: 'Project A', status: 'Active', budget: 10000, spent: 4500 }.spent.toLocaleString() }}</span>
                    </div>
                </div>

                <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-2 mt-2">
                    <div class="bg-purple-900 h-2" :style="{ width: (4500 / 10000) * 100 + '%' }"></div>
                </div>

                <div class="text-gray-500 text-xs text-center dark:text-white">{{ ((4500 / 10000) * 100).toFixed(1) }}% utilized</div>
            </div>
            <!-- Menu Sidebar -->
            <Menu></Menu>
        </div>
    </Motion>
</template>
