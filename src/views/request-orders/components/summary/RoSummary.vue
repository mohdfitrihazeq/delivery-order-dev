<script setup lang="ts">
import { AlertTriangle, CheckCircle, DollarSign } from 'lucide-vue-next';

defineProps<{
    pendingCount: number;
    approvedCount: number;
    totalValue: number;
}>();
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <!-- Pending Orders -->
        <div class="flex justify-between items-center p-6 bg-white rounded-2xl shadow-sm border">
            <div>
                <h3 class="font-semibold text-gray-800">Pending Orders</h3>
                <p class="text-2xl font-bold text-yellow-600 mt-2">{{ pendingCount }}</p>
                <p class="text-gray-500 text-sm">Awaiting approval</p>
            </div>
            <AlertTriangle class="w-6 h-6 text-yellow-600" />
        </div>

        <!-- Approved This Week -->
        <div class="flex justify-between items-center p-6 bg-white rounded-2xl shadow-sm border">
            <div>
                <h3 class="font-semibold text-gray-800">Approved This Week</h3>
                <p class="text-2xl font-bold text-green-600 mt-2">{{ approvedCount }}</p>
                <p class="text-gray-500 text-sm">Approved for purchase</p>
            </div>
            <CheckCircle class="w-6 h-6 text-green-600" />
        </div>

        <!-- Total Request Order Value -->
        <div class="flex justify-between items-center p-6 bg-white rounded-2xl shadow-sm border">
            <div>
                <h3 class="font-semibold text-gray-800">Total Request Order Value</h3>
                <p class="text-2xl font-bold text-gray-800 mt-2">${{ totalValue }}</p>
                <p class="text-gray-500 text-sm">Total orders value</p>
            </div>
            <DollarSign class="w-6 h-6 text-gray-500" />
        </div>
    </div>
</template>
