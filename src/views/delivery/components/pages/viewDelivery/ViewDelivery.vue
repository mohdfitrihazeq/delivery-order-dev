<script lang="ts" src="./ViewDelivery.script"></script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card glossy-card">
            <!-- Header -->
            <h1 class="text-xl font-bold">Delivery Order</h1>
            <p class="text-sm text-gray-500">{{ doNumber }} - {{ deliveryDetail.projectName }}</p>

            <!-- PO Info -->
            <div class="mt-4 p-4 border rounded">
                <h2 class="font-semibold mb-2">Delivery Order Information</h2>
                <div class="grid grid-cols-3 gap-4 text-sm">
                    <div>
                        <p class="font-semibold">DO Number</p>
                        <p>{{ doNumber }}</p>
                    </div>
                    <div>
                        <p class="font-semibold">PO Number</p>
                        <p>{{ deliveryDetail.poNumber }}</p>
                    </div>
                    <div>
                        <p class="font-semibold">Driver Plate</p>
                        <p>{{ deliveryDetail.driverPlate }}</p>
                    </div>
                    <div>
                        <p class="font-semibold">Delivery Date</p>
                        <p>{{ deliveryDetail.deliveryDate }}</p>
                    </div>
                    <div>
                        <p class="font-semibold">Status</p>
                        <p><Tag :value="status" :severity="status === 'pending' ? 'success' : 'danger'" /></p>
                    </div>
                </div>
            </div>

            <!-- Tabs -->
            <div class="mt-6">
                <ReusableTable :value="items" :columns="itemsColumns" :onSearch="onSearchWrapper">
                    <template #no="{ data }">{{ data.no }}</template>
                    <template #status="{ data }">
                        <Tag :value="data.status" :severity="data.status.toLowerCase() === 'completed' ? 'success' : 'warn'" />
                    </template>
                </ReusableTable>
            </div>
        </div>
    </Motion>
</template>
