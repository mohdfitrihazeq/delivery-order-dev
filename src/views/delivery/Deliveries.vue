<script lang="ts" src="./Delivery.script.ts"></script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card glossy-card mb-0">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-2xl font-bold">Delivery Verification</h1>
                    <p class="text-gray-500">Compare received materials with purchase orders and record discrepancies</p>
                </div>
                <button class="btn-cyan-gradient" @click="$router.push('/deliveries/createDelivery')">+ New Delivery Verification</button>
            </div>

            <div class="grid grid-cols-12 gap-4 mb-3">
                <DeliveriesSummaryData :cardItems="deliverySummaryData" :cardCol="4" />
            </div>

            <!-- Body -->
            <BaseTab v-model="activeTab" :tabs="tabItems">
                <template #default="{ activeTab }">
                    <div v-if="activeTab === '0'" class="ms-6">
                        <ReusableTable :value="pendingList" emptyTitle="Pending Delivery" :columns="pendingListColumn" :filters="filters" :onSearch="onSearchWrapper">
                            <template #totalAmount="{ data }"> ${{ data.totalAmount }} </template>
                            <template #status="{ data }">
                                <Tag :value="data.status" :severity="data.status === 'active' ? 'success' : data.status === 'partially delivered' ? 'warn' : 'danger'" />
                            </template>
                        </ReusableTable>
                    </div>

                    <div v-else-if="activeTab === '1'" class="ms-6">
                        <ReusableTable :value="partiallyList" emptyTitle="Partially Delivery" :columns="partiallyListColumn" :filters="filters" :onSearch="onSearchWrapper"> </ReusableTable>
                    </div>
                    <div v-else-if="activeTab === '2'" class="ms-6">
                        <ReusableTable :value="completedList" emptyTitle="Completed Delivery" :columns="completedListColumn" :filters="filters" :onSearch="onSearchWrapper">
                            <template #discrepancyType="{ data }">
                                <Tag :value="data.discrepancyType" :severity="data.discrepancyType === 'Partial Delivery' ? 'warn' : 'danger'" />
                            </template>
                            <template #status="{ data }">
                                <Tag :value="data.status" :severity="data.status === 'completed' ? 'success' : 'danger'" />
                            </template>
                        </ReusableTable>
                    </div>
                </template>
            </BaseTab>
        </div>
    </Motion>
</template>
