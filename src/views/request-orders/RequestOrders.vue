<script lang="ts" src="./RequestOrders.script.ts"></script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card glossy-card mb-0">
            <BreadcrumbList />
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-2xl font-bold">Request Orders</h1>
                    <p class="dark:text-gray-200 text-gray-500">Manage purchase requests for project materials and services</p>
                </div>
                <Button label="+ New Request Order" @click="$router.push('/request-orders/create')" />
            </div>

            <RoSummary :pendingCount="pendingCount" :approvedCount="approvedCount" :totalValue="totalValue" />

            <!-- Tabs -->
            <div class="card">
                <BaseTab v-model="activeTab" :tabs="tabItems">
                    <template #default="{ activeTab }">
                        <Motion :key="activeTab" :initial="{ opacity: 0, x: 30 }" :animate="{ opacity: 1, x: 0 }" :exit="{ opacity: 0, x: -30 }" :transition="{ duration: 0.8 }">
                            <RoTable :orders="filteredOrders" :getStatusSeverity="getStatusSeverity" :activeTab="activeTab" :isPurchasingRole="isPurchasingRole" @view="openOrderDetails" @approve="approveOrder" @reject="rejectOrder" />
                        </Motion>
                    </template>
                </BaseTab>
            </div>

            <!-- Details Modal -->
            <Dialog v-model:visible="showDetailsModal" modal header="Request Order Details" class="w-11/12 md:w-2/3">
                <div v-if="selectedOrder">
                    <h2 class="text-lg font-bold mb-4">Request Order - {{ selectedOrder.roNumber }}</h2>

                    <div class="grid grid-cols-2 gap-4 text-sm mb-6">
                        <div>
                            <p class="font-semibold">Status</p>
                            <p>{{ selectedOrder.status }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">Requested At</p>
                            <p>{{ selectedOrder.requestedAt }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">Requested By</p>
                            <p>{{ selectedOrder.requestedBy }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">Budget Type</p>
                            <p>{{ selectedOrder.budgetType }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">RO Date</p>
                            <p>{{ selectedOrder.roDate }}</p>
                        </div>
                    </div>

                    <h3 class="font-semibold mb-2">Requested Items</h3>
                    <table class="w-full border text-sm">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="p-2 text-left">Item Code</th>
                                <th class="p-2 text-left">Description</th>
                                <th class="p-2 text-left">UOM</th>
                                <th class="p-2 text-left">Order Qty</th>
                                <th class="p-2 text-left">Delivery Date</th>
                                <th class="p-2 text-left">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, idx) in selectedOrder.items" :key="idx">
                                <td class="p-2">{{ item.code }}</td>
                                <td class="p-2">{{ item.description }}</td>
                                <td class="p-2">{{ item.uom }}</td>
                                <td class="p-2">{{ item.qty }}</td>
                                <td class="p-2">{{ item.deliveryDate }}</td>
                                <td class="p-2">{{ item.note }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <template #footer>
                    <div class="flex justify-end gap-2">
                        <template v-if="isPurchasingRole && selectedOrder?.status === 'Pending'">
                            <Button label="Reject Request" severity="danger" outlined icon="pi pi-times" @click="rejectOrder()" />
                            <Button label="Approve Request" severity="success" icon="pi pi-check" @click="approveOrder()" />
                        </template>
                        <template v-else>
                            <Button label="Close" severity="secondary" icon="pi pi-times" @click="showDetailsModal = false" />
                        </template>
                    </div>
                </template>
            </Dialog>
        </div>
    </Motion>
</template>
