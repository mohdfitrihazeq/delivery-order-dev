<script lang="ts" src="./Delivery.script.ts"></script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card mb-0">
            <div class="w-full mb-4">
                <BreadcrumbList />
            </div>
            <div class="flex justify-between items-center mb-4">
                <h1 class="text-2xl font-bold">Delivery Verification</h1>
                <Button @click="$router.push('/deliveries/createDelivery')">+ New Delivery Verification</Button>
            </div>

            <BaseTab v-model="activeTab" :tabs="tabItems">
                <template #default="{ activeTab }">
                    <template v-if="activeTab === '0'">
                        <ReusableTable :value="filteredPendingList" emptyTitle="Pending Delivery List" :columns="deliveryListColumn" :onSearch="handleSearch" :onActionClick="handleAction" :loading="deliveryStore.loading">
                            <template #status="{ data }">
                                <Tag :value="data.Status" severity="warn" />
                            </template>
                        </ReusableTable>
                    </template>

                    <template v-else>
                        <ReusableTable :value="filteredCompletedList" emptyTitle="Completed Delivery List" :columns="deliveryListColumn" :onSearch="handleSearch" :onActionClick="handleAction" :loading="deliveryStore.loading">
                            <template #status="{ data }">
                                <Tag :value="data.Status" severity="success" />
                            </template>
                        </ReusableTable>
                    </template>
                </template>
            </BaseTab>
        </div>
    </Motion>
</template>
