<script lang="ts" src="./ViewDelivery.script.ts"></script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card">
            <div class="w-full mb-4">
                <BreadcrumbList />
            </div>
            <h1 class="text-xl font-bold">Delivery Order</h1>
            <p class="text-sm text-gray-500">{{ singleDelivery?.DocNo }} - {{ singleDelivery?.RefDoc }}</p>

            <div v-if="loading" class="mt-4 text-center text-gray-500">Loading...</div>

            <div v-else-if="singleDelivery" class="mt-4 p-4 border rounded">
                <h2 class="font-semibold mb-2">Delivery Order Information</h2>
                <div class="grid grid-cols-3 gap-4 text-sm">
                    <div>
                        <p class="font-semibold">DO Number</p>
                        <p>{{ singleDelivery.DocNo }}</p>
                    </div>
                    <div>
                        <p class="font-semibold">PO Number</p>
                        <p>{{ singleDelivery.RefDoc || '-' }}</p>
                    </div>
                    <div>
                        <p class="font-semibold">Driver Plate</p>
                        <p>{{ singleDelivery.PlateNo || '-' }}</p>
                    </div>
                    <div>
                        <p class="font-semibold">Delivery Date</p>
                        <p>{{ singleDelivery.Date || '-' }}</p>
                    </div>
                    <div>
                        <p class="font-semibold">Status</p>
                        <Tag :value="singleDelivery.Status" :severity="singleDelivery.Status === 'Pending' ? 'danger' : 'success'" />
                    </div>
                </div>
            </div>

            <!-- Table -->
            <div style="margin-top: 60px">
                <ReusableTable :value="items" :columns="itemsColumns" :onSearch="onSearchWrapper" emptyTitle="No Delivery Items Found">
                    <template #no="{ data }">{{ data.no }}</template>
                    <template #status="{ data }">
                        <Tag :value="data.status" :severity="data.status === 'Completed' ? 'success' : 'warn'" />
                    </template>
                </ReusableTable>
            </div>
        </div>
    </Motion>
</template>
