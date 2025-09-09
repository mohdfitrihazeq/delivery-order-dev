<script setup>
import Menu from './Menu/Menu.vue';
import MenuSeparator from './Menu/MenuSeparator.vue';
</script>

<template>
    <div class="layout-sidebar">
        <div class="flex items-center gap-3 mb-4 mt-3">
            <!-- Login Sidebar -->
            <div class="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">JD</div>
            <div class="flex-1">
                <div class="font-semibold text-gray-900 leading-tight">Jane Doe</div>
                <div class="text-xs text-gray-500">Project Manager</div>
            </div>
        </div>
        <menu-separator></menu-separator>

        <!-- Project Sidebar -->
        <div class="flex items-center justify-between mb-2 mt-4">
            <span class="font-medium text-gray-600">Project A</span>
            <span class="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                {{ { name: 'Project A', status: 'Active', budget: 10000, spent: 4500 }.status }}
            </span>
        </div>
        <div class="bg-gray-50 border border-gray-300 rounded-md p-4 mb-4 mt-4">
            <div class="text-gray-500 text-xs mb-2">
                <div class="mb-2">
                    Budget: <span class="font-medium">${{ { name: 'Project A', status: 'Active', budget: 10000, spent: 4500 }.budget.toLocaleString() }}</span>
                </div>
                <div class="mb-2">
                    Spent: <span class="font-medium">${{ { name: 'Project A', status: 'Active', budget: 10000, spent: 4500 }.spent.toLocaleString() }}</span>
                </div>
            </div>

            <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-2 mt-2">
                <div class="bg-purple-900 h-2" :style="{ width: (4500 / 10000) * 100 + '%' }"></div>
            </div>

            <div class="text-gray-500 text-xs text-center">{{ ((4500 / 10000) * 100).toFixed(1) }}% utilized</div>
        </div>
        <div class="flex mt-2 pt-2 gap-2 mb-4">
            <button v-for="tab in ['Budget', 'Orders']" :key="tab" class="flex-1 px-2 py-1 text-sm font-medium bg-gray-100 rounded hover:bg-gray-200">
                {{ tab }}
            </button>
        </div>

        <!-- Menu Sidebar -->
        <Menu></Menu>
    <div class="layout-sidebar shadow">
        <app-menu></app-menu>
    </div>
</template>
