<script lang="ts" src="./PurchaseOrders.script"></script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card mb-0">
            <BreadcrumbList />

            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-2xl font-bold">Purchase Orders</h1>
                    <p class="text-gray-500">Manage and monitor purchase orders while keeping track of received items and discrepancies.</p>
                </div>
            </div>

            <!-- Summary Cards -->
            <div class="grid grid-cols-12 gap-4 mb-3">
                <POSummaryData :cardItems="poSummaryData" :cardCol="4" />
            </div>

            <!-- Body -->
            <div class="mt-6">
                <BaseTab v-model="activeTab" :tabs="tabItems">
                    <template #default="{ activeTab }">
                        <Motion :key="activeTab" :initial="{ opacity: 0, x: 30 }" :animate="{ opacity: 1, x: 0 }" :exit="{ opacity: 0, x: -30 }" :transition="{ duration: 0.8 }">
                            <!-- Loading Spinner -->
                            <div v-if="isLoading" class="flex justify-center items-center py-10">
                                <ProgressSpinner />
                            </div>

                            <!-- Pending -->
                            <template v-else-if="activeTab === '0'">
                                <ReusableTable :value="pendingList" emptyTitle="No Pending Purchase Orders Found" :columns="pendingListColumn" :filters="filters" :onSearch="onSearchWrapper">
                                    <template #no="{ data }">{{ data.no }}</template>
                                    <template #totalAmount="{ data }">$ {{ data.totalAmount }}</template>
                                    <template #status="{ data }">
                                        <Tag :value="data.status" :severity="data.status === 'active' ? 'success' : data.status === 'partially delivered' ? 'warn' : 'danger'" />
                                    </template>
                                    <template #action="{ data }">
                                        <Button icon="pi pi-eye" class="p-button-text p-button-sm" @click="viewPO(data)" v-tooltip="'View PO'" />
                                    </template>
                                </ReusableTable>
                            </template>

                            <!-- Partially Delivered -->
                            <template v-else-if="activeTab === '1'">
                                <ReusableTable :value="partiallyList" emptyTitle="No Partially Delivered Purchase Orders Found" :columns="partiallyListColumn" :filters="filters" :onSearch="onSearchWrapper">
                                    <template #no="{ data }">{{ data.no }}</template>
                                    <template #status="{ data }">
                                        <Tag :value="data.status" :severity="data.status === 'active' ? 'success' : data.status === 'partially delivered' ? 'warn' : 'danger'" />
                                    </template>
                                </ReusableTable>
                            </template>

                            <!-- Completed -->
                            <template v-else-if="activeTab === '2'">
                                <ReusableTable :value="completedList" emptyTitle="No Completed Purchase Orders Found" :columns="completedListColumn" :filters="filters" :onSearch="onSearchWrapper">
                                    <template #no="{ data }">{{ data.no }}</template>
                                    <template #discrepancyType="{ data }">
                                        <Tag :value="data.discrepancyType" :severity="data.discrepancyType === 'Partial Delivery' ? 'warn' : 'danger'" />
                                    </template>
                                    <template #status="{ data }">
                                        <Tag :value="data.status" :severity="data.status === 'completed' ? 'success' : 'danger'" />
                                    </template>
                                </ReusableTable>
                            </template>
                        </Motion>
                    </template>
                </BaseTab>
            </div>
        </div>
    </Motion>
</template>
