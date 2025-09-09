<script setup>
import { ProductService } from '@/service/ProductService';
import { onMounted, ref } from 'vue';

const products = ref(null);

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
});
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="glossy-card mb-0">
            <div class="flex items-start gap-3 mb-4">
                <div class="flex items-center justify-center bg-gray-100 dark:bg-gray-400/10 rounded-full w-10 h-10">
                    <i class="pi pi-chart-bar text-gray-500 !text-xl"></i>
                </div>
                <div>
                    <div class="text-gray-900 dark:text-white font-semibold">Budget Items</div>
                    <div class="text-gray-500 text-sm">Import and manage your BOQ</div>
                </div>
            </div>

            <div class="mb-4">
                <div class="text-3xl font-bold text-gray-900 dark:text-white">0</div>
                <div class="text-gray-500 text-sm">items in budget</div>
            </div>

            <div class="mb-4">
                <div class="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>0%</span>
                </div>
                <div class="w-full h-2 bg-gray-200 rounded-full">
                    <div class="h-2 bg-blue-500 rounded-full" style="width: 0%"></div>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <span class="px-3 py-1 text-xs border border-yellow-300 text-yellow-600 bg-yellow-50 rounded-md flex items-center gap-1"> <i class="pi pi-exclamation-triangle"></i> pending </span>
                <button class="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg shadow-sm flex items-center gap-2 hover:bg-gray-50">Manage Budget <i class="pi pi-arrow-right"></i></button>
            </div>
        </div>

        <!-- Total Spent -->
        <div class="glossy-card mb-0">
            <div class="flex items-start gap-3 mb-4">
                <div class="flex items-center justify-center bg-gray-100 dark:bg-gray-400/10 rounded-full w-10 h-10">
                    <i class="pi pi-shopping-cart text-gray-500 !text-xl"></i>
                </div>
                <div>
                    <div class="text-gray-900 dark:text-white font-semibold">Request Orders</div>
                    <div class="text-gray-500 text-sm">Create purchase requests</div>
                </div>
            </div>
            <div class="mb-4">
                <div class="text-3xl font-bold text-gray-900 dark:text-white">0</div>
                <div class="text-gray-500 text-sm">of 0 items requested</div>
            </div>

            <div class="mb-4">
                <div class="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>0%</span>
                </div>
                <div class="w-full h-2 bg-gray-200 rounded-full">
                    <div class="h-2 bg-blue-500 rounded-full" style="width: 0%"></div>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <span class="px-3 py-1 text-xs border border-yellow-300 text-yellow-600 bg-yellow-50 rounded-md flex items-center gap-1"> <i class="pi pi-exclamation-triangle"></i> pending </span>
                <button class="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg shadow-sm flex items-center gap-2 hover:bg-gray-50">Create Request <i class="pi pi-arrow-right"></i></button>
            </div>
        </div>

        <!-- Budget Items -->
        <div class="glossy-card mb-0">
            <div class="flex items-start gap-3 mb-4">
                <div class="flex items-center justify-center bg-gray-100 dark:bg-gray-400/10 rounded-full w-10 h-10">
                    <i class="pi pi-car text-gray-500 !text-xl"></i>
                </div>
                <div>
                    <div class="text-gray-900 dark:text-white font-semibold">Deliveries</div>
                    <div class="text-gray-500 text-sm">Track and verify deliveries</div>
                </div>
            </div>
            <div class="mb-4">
                <div class="text-3xl font-bold text-gray-900 dark:text-white">0</div>
                <div class="text-gray-500 text-sm">of 0 delivered</div>
            </div>

            <div class="mb-4">
                <div class="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>0%</span>
                </div>
                <div class="w-full h-2 bg-gray-200 rounded-full">
                    <div class="h-2 bg-blue-500 rounded-full" style="width: 0%"></div>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <span class="px-3 py-1 text-xs border border-yellow-300 text-yellow-600 bg-yellow-50 rounded-md flex items-center gap-1"> <i class="pi pi-exclamation-triangle"></i> pending </span>
                <button class="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg shadow-sm flex items-center gap-2 hover:bg-gray-50">Record Delivery <i class="pi pi-arrow-right"></i></button>
            </div>
        </div>
    </div>
</template>
