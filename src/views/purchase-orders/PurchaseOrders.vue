<script lang="ts" src="./PurchaseOrders.script"></script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card glossy-card mb-0">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-2xl font-bold">Purchase Orders</h1>
                    <p class="text-gray-500">Manage and monitor purchase orders while keeping track of received items and discrepancies.</p>
                </div>
                <Button @click="$router.push('/deliveries/createDelivery')">+ New Purchase Order</Button>
            </div>

            <div class="grid grid-cols-12 gap-4 mb-3">
                <POSummaryData :cardItems="poSummaryData" :cardCol="4" />
            </div>

            <!-- Body -->
            <div class="card">
                <BaseTab v-model="activeTab" :tabs="tabItems">
                    <template #default="{ activeTab }">
                        <Motion :key="activeTab" :initial="{ opacity: 0, x: 30 }" :animate="{ opacity: 1, x: 0 }" :exit="{ opacity: 0, x: -30 }" :transition="{ duration: 0.8 }">
                            <template v-if="activeTab === '0'">
                                <BaseSpinner v-if="isLoading" class="my-10" />
                                <ResultNotFound v-else-if="!isLoading && pendingList.length === 0" class="my-10" message="No Pending Purchase Orders Found" />
                                <ReusableTable v-else :value="pendingList" emptyTitle="Pending Delivery" :columns="pendingListColumn" :filters="filters" :onSearch="onSearchWrapper">
                                    <template #no="{ data }">
                                        {{ data.no }}
                                    </template>
                                    <template #totalAmount="{ data }"> ${{ data.totalAmount }} </template>
                                    <template #status="{ data }">
                                        <Tag :value="data.status" :severity="data.status === 'active' ? 'success' : data.status === 'partially delivered' ? 'warn' : 'danger'" />
                                    </template>
                                    <template #action="{ data }">
                                        <Button icon="pi pi-eye" class="p-button-text p-button-sm" @click="viewPO(data)" />
                                    </template>
                                </ReusableTable>
                            </template>

                            <template v-else-if="activeTab === '1'">
                                <BaseSpinner v-if="isLoading" class="my-10" />
                                <ResultNotFound v-else-if="!isLoading && partiallyList.length === 0" class="my-10" message="No Partially Delivered Purchase Orders Found" />
                                <ReusableTable v-else :value="partiallyList" emptyTitle="Partially Delivery" :columns="partiallyListColumn" :filters="filters" :onSearch="onSearchWrapper">
                                    <template #no="{ data }">{{ data.no }}</template>
                                    <template #status="{ data }">
                                        <Tag :value="data.status" :severity="data.status === 'active' ? 'success' : data.status === 'partially delivered' ? 'warn' : 'danger'" />
                                    </template>
                                </ReusableTable>
                            </template>

                            <template v-else-if="activeTab === '2'">
                                <BaseSpinner v-if="isLoading" class="my-10" />
                                <ResultNotFound v-else-if="!isLoading && completedList.length === 0" class="my-10" message="No Completed Purchase Orders Found" />
                                <ReusableTable v-else :value="completedList" emptyTitle="Completed Delivery" :columns="completedListColumn" :filters="filters" :onSearch="onSearchWrapper">
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
