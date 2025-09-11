<script setup lang="ts">
import { Motion } from '@motionone/vue';
import Tag from 'primevue/tag';

interface Order {
    id: number;
    roNumber: string;
    requestedBy: string;
    roDate: string;
    deliveryDate: string;
    totalAmount: string;
    budgetType: string;
    status: string;
    requestedAt: string;
}

// Props
defineProps<{
    orders: Order[];
    getStatusSeverity: (status: string) => string;
    activeTab: string;
}>();
</script>

<template>
    <Motion :key="`table-${activeTab}`" :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0, y: -20 }" :transition="{ duration: 0.8 }">
        <div class="overflow-x-auto mt-4">
            <table class="min-w-full text-sm text-left">
                <thead>
                    <tr class="text-gray-600 border-b">
                        <th class="py-2 px-4">#</th>
                        <th class="py-2 px-4">RO Number</th>
                        <th class="py-2 px-4">Requested By</th>
                        <th class="py-2 px-4">RO Date</th>
                        <th class="py-2 px-4">Delivery Date</th>
                        <th class="py-2 px-4">Total Amount</th>
                        <th class="py-2 px-4">Budget Type</th>
                        <th class="py-2 px-4">Status</th>
                        <th class="py-2 px-4">Requested At</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="orders.length === 0">
                        <td colspan="9" class="text-center text-gray-500 py-6">No request orders found</td>
                    </tr>
                    <tr v-for="(order, index) in orders" :key="order.id" class="border-b">
                        <td class="py-2 px-4">{{ index + 1 }}</td>
                        <td class="py-2 px-4">{{ order.roNumber }}</td>
                        <td class="py-2 px-4">{{ order.requestedBy }}</td>
                        <td class="py-2 px-4">{{ order.roDate }}</td>
                        <td class="py-2 px-4">{{ order.deliveryDate }}</td>
                        <td class="py-2 px-4">{{ order.totalAmount }}</td>
                        <td class="py-2 px-4">{{ order.budgetType }}</td>
                        <td class="py-2 px-4">
                            <Tag :value="order.status" :severity="getStatusSeverity(order.status)" />
                        </td>
                        <td class="py-2 px-4">{{ order.requestedAt }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Motion>
</template>
