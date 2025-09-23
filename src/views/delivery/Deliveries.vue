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
                <Button @click="$router.push('/deliveries/createDelivery')">+ New Delivery Verification</Button>
            </div>

            <div class="grid grid-cols-12 gap-4 mb-4">
                <DeliveriesSummaryData :cardItems="deliverySummaryData" :cardCol="3" />
            </div>

            <div class="p-6 card glossy-card mb-0 mt-3">
                <ReusableTable :value="filteredDeliveryList" emptyTitle="Delivery List Data" :columns="deliveryListColumn" :onSearch="onSearchWrapper" :onActionClick="handleAction" :extraFilters="extraFilters" :onFilterChange="handleFilter">
                    <template #totalAmount="{ data }"> ${{ data.totalAmount }} </template>
                    <template #status="{ data }">
                        <Tag :value="data.status" :severity="data.status === 'incompleted' ? 'warn' : 'success'" />
                    </template>
                </ReusableTable>
            </div>
        </div>
    </Motion>
</template>
