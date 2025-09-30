<script lang="ts" src="./Delivery.script.ts"></script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card mb-0">
            <BreadcrumbList />
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h1 class="text-2xl font-bold">Delivery Verification</h1>
                    <p class="text-gray-500">Compare received materials with purchase orders and record discrepancies</p>
                </div>
                <Button @click="$router.push('/deliveries/createDelivery')">+ New Delivery Verification</Button>
            </div>
            <!-- 
            <div class="grid grid-cols-12 gap-4 mb-8">
                <DeliveriesSummaryData :cardItems="deliverySummaryData" :cardCol="3" />
            </div> -->

            <BaseTab v-model="activeTab" :tabs="tabItems">
                <template #default="{ activeTab }">
                    <Motion :key="activeTab" :initial="{ opacity: 0, x: 30 }" :animate="{ opacity: 1, x: 0 }" :exit="{ opacity: 0, x: -30 }" :transition="{ duration: 0.8 }">
                        <!-- Pending -->
                        <template v-if="activeTab === '0'">
                            <ReusableTable :value="incompletedList" emptyTitle="Incompleted Delivery List" :columns="deliveryListColumn" :onSearch="onSearchWrapper" :onActionClick="handleAction">
                                <template #totalAmount="{ data }"> ${{ data.totalAmount }} </template>
                                <template #status="{ data }">
                                    <Tag :value="data.status" :severity="data.status === 'incompleted' ? 'warn' : 'success'" />
                                </template>
                            </ReusableTable>
                        </template>

                        <!-- Partially Delivered -->
                        <template v-else-if="activeTab === '1'">
                            <ReusableTable :value="completedList" emptyTitle="Completed Delivery List" :columns="deliveryListColumn" :onSearch="onSearchWrapper" :onActionClick="handleAction">
                                <template #totalAmount="{ data }"> ${{ data.totalAmount }} </template>
                                <template #status="{ data }">
                                    <Tag :value="data.status" :severity="data.status === 'incompleted' ? 'warn' : 'success'" />
                                </template>
                            </ReusableTable>
                        </template>
                    </Motion>
                </template>
            </BaseTab>
        </div>
    </Motion>
</template>
