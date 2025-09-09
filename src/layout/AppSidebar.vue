<script setup>
import Menu from './Menu/Menu.vue';
import MenuSeparator from './Menu/MenuSeparator.vue';
</script>

<template>
    <div class="layout-sidebar">
        <div class="flex items-center gap-3 mb-4 mt-3">
            <!-- Avatar -->
            <div class="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">JD</div>
            <!-- Info -->
            <div class="flex-1">
                <div class="font-semibold text-gray-900 leading-tight">Jane Doe</div>
                <div class="text-xs text-gray-500">Project Manager</div>
            </div>
            <!-- Role & Switch -->
            <div class="flex flex-col items-end gap-2">
                <button class="flex items-center gap-1 border border-gray-300 px-2 py-0.5 rounded text-xs font-medium hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Switch
                </button>
            </div>
        </div>
        <menu-separator></menu-separator>
        <div class="flex items-center justify-between mb-2 mt-4">
            <span class="font-medium text-gray-600">Project A</span>
            <span class="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                {{ { name: 'Project A', status: 'Active', budget: 10000, spent: 4500 }.status }}
            </span>
        </div>

        <!-- Budget & Progress Box -->
        <div class="bg-gray-50 border border-gray-300 rounded-md p-4 mb-4 mt-4">
            <!-- Budget & Spent -->
            <div class="text-gray-500 text-xs mb-2">
                <div class="mb-2">
                    Budget: <span class="font-medium">${{ { name: 'Project A', status: 'Active', budget: 10000, spent: 4500 }.budget.toLocaleString() }}</span>
                </div>
                <div class="mb-2">
                    Spent: <span class="font-medium">${{ { name: 'Project A', status: 'Active', budget: 10000, spent: 4500 }.spent.toLocaleString() }}</span>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-2 mt-2">
                <div class="bg-purple-900 h-2" :style="{ width: (4500 / 10000) * 100 + '%' }"></div>
            </div>

            <!-- Percentage Text -->
            <div class="text-gray-500 text-xs text-center">{{ ((4500 / 10000) * 100).toFixed(1) }}% utilized</div>
        </div>

        <!-- Tabs -->
        <div class="flex mt-2 pt-2 gap-2 mb-4">
            <button v-for="tab in ['Budget', 'Orders']" :key="tab" class="flex-1 px-2 py-1 text-sm font-medium bg-gray-100 rounded hover:bg-gray-200">
                {{ tab }}
            </button>
        </div>
        <Menu></Menu>
    </div>
</template>
