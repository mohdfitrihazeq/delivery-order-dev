<script lang="ts">
import BaseTab from '@/components/tab/BaseTab.vue';
import { Motion } from '@motionone/vue';
import Tag from 'primevue/tag';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'RequestOrders',
    components: { BaseTab, Tag, Motion },
    setup() {
        const activeTab = ref('0');

        const orders = ref([
            { id: 1, roNumber: 'RO-001', requestedBy: 'John Doe', deliveryDate: '2025-09-15', totalAmount: '$1200', status: 'Approved', requestedAt: '2025-09-01' },
            { id: 2, roNumber: 'RO-002', requestedBy: 'Jane Smith', deliveryDate: '2025-09-20', totalAmount: '$850', status: 'Rejected', requestedAt: '2025-09-05' },
            { id: 3, roNumber: 'RO-003', requestedBy: 'Mike Chan', deliveryDate: '2025-09-25', totalAmount: '$640', status: 'Pending', requestedAt: '2025-09-07' }
        ]);

        const filteredOrders = computed(() => {
            if (activeTab.value === '1') {
                return orders.value.filter((order) => order.status === 'Approved');
            }
            if (activeTab.value === '2') {
                return orders.value.filter((order) => order.status === 'Rejected');
            }
            return orders.value; // '0' = All Orders
        });

        const getStatusSeverity = (status: string) => {
            switch (status) {
                case 'Approved':
                    return 'success';
                case 'Rejected':
                    return 'danger';
                case 'Pending':
                    return 'warn';
                default:
                    return 'info';
            }
        };

        return { activeTab, filteredOrders, getStatusSeverity };
    },
    data() {
        return {
            tabItems: [
                { value: '0', label: 'All Orders' },
                { value: '1', label: 'Approved' },
                { value: '2', label: 'Rejected' }
            ]
        };
    }
});
</script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card glossy-card mb-0">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-2xl font-bold">Request Orders</h1>
                    <p class="text-gray-500">Manage purchase requests for project materials and services</p>
                </div>
                <button class="btn-cyan-gradient">+ New Request Order</button>
            </div>

            <!-- Card -->
            <div class="card">
                <!-- Tabs -->
                <BaseTab v-model="activeTab" :tabs="tabItems">
                    <template #default="{ activeTab }">
                        <div v-if="activeTab === '0'">All Orders</div>
                        <div v-else-if="activeTab === '1'">Approved</div>
                        <div v-else-if="activeTab === '2'">Rejected</div>
                    </template>
                </BaseTab>

                <!-- Table -->
                <div class="overflow-x-auto mt-4">
                    <table class="min-w-full text-sm text-left">
                        <thead>
                            <tr class="text-gray-600 border-b">
                                <th class="py-2 px-4">#</th>
                                <th class="py-2 px-4">RO Number</th>
                                <th class="py-2 px-4">Requested By</th>
                                <th class="py-2 px-4">Delivery Date</th>
                                <th class="py-2 px-4">Total Amount</th>
                                <th class="py-2 px-4">Status</th>
                                <th class="py-2 px-4">Requested At</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="filteredOrders.length === 0">
                                <td colspan="7" class="text-center text-gray-500 py-6">No request orders found</td>
                            </tr>
                            <tr v-for="(order, index) in filteredOrders" :key="order.id" class="border-b">
                                <td class="py-2 px-4">{{ index + 1 }}</td>
                                <td class="py-2 px-4">{{ order.roNumber }}</td>
                                <td class="py-2 px-4">{{ order.requestedBy }}</td>
                                <td class="py-2 px-4">{{ order.deliveryDate }}</td>
                                <td class="py-2 px-4">{{ order.totalAmount }}</td>
                                <td class="py-2 px-4">
                                    <Tag :value="order.status" :severity="getStatusSeverity(order.status)" />
                                </td>
                                <td class="py-2 px-4">{{ order.requestedAt }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Motion>
</template>
