<script lang="ts" src="./CreateRequestOrders.script.ts"></script>

<template>
    <Motion :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0, y: -20 }" :transition="{ duration: 0.6 }">
        <Breadcrumb :items="[{ label: 'Request Orders', to: '/request-orders' }, { label: 'Create Request Order' }]" />
        <div class="p-6 card glossy-card">
            <!-- Header with Back Button -->
            <div class="flex items-center mb-6 gap-4">
                <Button icon="pi pi-arrow-left" label="Back" @click="goBack" />
                <div>
                    <h1 class="text-2xl font-bold">Create Request Order</h1>
                    <p class="text-gray-500">Create a new request order for project: MKT</p>
                </div>
            </div>

            <!-- Request Order Details -->
            <div class="card p-4 mb-6 shadow">
                <h2 class="text-lg font-semibold mb-4">Request Order Details</h2>
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">RO Number</label>
                        <InputText v-model="roNumber" type="text" class="w-full" :disabled="true" />
                    </div>
                    <div>
                        <label for="budgetType" class="block font-medium mb-1">Budget Type</label>
                        <Select id="budgetType" v-model="budgetType" :options="budgetOptions" optionLabel="label" optionValue="value" placeholder="Select Budget Type" class="w-full" />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">RO Date</label>
                        <DatePicker :showIcon="true" :showButtonBar="true" v-model="calendarValue"></DatePicker>
                    </div>
                </div>
            </div>
            <BudgetInfoCard class="my-4" />

            <!-- Order Items -->
            <div class="card p-4 mb-6 shadow">
                <h2 class="text-lg font-semibold mb-4">Order Items</h2>
                <div class="flex justify-center items-center py-10 text-gray-500">
                    <div class="text-center">
                        <div class="text-5xl mb-2">📦</div>
                        <p>No items added yet</p>
                        <Button label="+ Add First Item" />
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-end gap-3">
                <Button label="Cancel" @click="$router.push('/request-orders')" outlined />
                <Button label="Save as Draft" severity="secondary" outlined />
                <Button label="Submit Request Order" />
            </div>
        </div>
    </Motion>
</template>
