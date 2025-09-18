<script lang="ts" src="./RequestOrders.script"></script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card glossy-card mb-0">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-2xl font-bold">Request Orders</h1>
                    <p class="text-gray-500">Manage purchase requests for project materials and services</p>
                </div>
                <Button label="+ New Request Order" @click="$router.push('/request-orders/create')" />
            </div>

            <RoSummary :pendingCount="pendingCount" :approvedCount="approvedCount" :totalValue="totalValue" />
            <!-- Card -->
            <div class="card">
                <!-- Tabs -->
                <BaseTab v-model="activeTab" :tabs="tabItems">
                    <template #default="{ activeTab }">
                        <Motion :key="activeTab" :initial="{ opacity: 0, x: 30 }" :animate="{ opacity: 1, x: 0 }" :exit="{ opacity: 0, x: -30 }" :transition="{ duration: 0.8 }">
                            <RoTable :orders="filteredOrders" :getStatusSeverity="getStatusSeverity" :activeTab="activeTab" />
                        </Motion>
                    </template>
                </BaseTab>
            </div>
        </div>
    </Motion>
</template>
