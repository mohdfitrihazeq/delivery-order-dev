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

            <BudgetInfoCard class="my-4" :budgetType="budgetType" />

            <!-- Order Items -->
            <div class="card p-4 mb-6 shadow">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold">Order Items</h2>
                    <Button label="+ Add Item" @click="addItem" />
                </div>

                <!-- Empty State -->
                <div v-if="items.length === 0" class="flex justify-center items-center py-10 text-gray-500">
                    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
                        <div class="text-center">
                            <div class="text-5xl mb-2">📦</div>
                            <p>No items added yet</p>
                            <Button label="+ Add First Item" @click="addItem" />
                        </div>
                    </Motion>
                </div>

                <!-- Items Table -->
                <div v-else class="overflow-x-auto">
                    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
                        <table class="min-w-full rounded-lg">
                            <!-- Header -->
                            <thead class="text-sm text-gray-600">
                                <tr>
                                    <th class="px-3 py-2 text-left">Item Code</th>
                                    <th class="px-3 py-2 text-left">Description</th>
                                    <th class="px-3 py-2 text-left">UOM</th>
                                    <th class="px-3 py-2 text-left">Quantity</th>
                                    <th class="px-3 py-2 text-left">Delivery Date</th>
                                    <th class="px-3 py-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <!-- Body -->
                            <tbody>
                                <tr v-for="(item, index) in items" :key="index" class="border-t">
                                    <!-- Item Code -->
                                    <td class="px-3 py-2 align-top">
                                        <Dropdown v-model="item.itemCode" :options="itemOptions" optionLabel="label" optionValue="value" placeholder="Select item..." class="w-full" @change="fillItemDetails(item)">
                                            <!-- Custom option template -->
                                            <template #option="slotProps">
                                                <div class="flex flex-col">
                                                    <span class="font-medium">{{ slotProps.option.label }}</span>
                                                    <span class="text-xs text-gray-500">{{ slotProps.option.description }}</span>
                                                </div>
                                            </template>

                                            <template #value="slotProps">
                                                <span v-if="slotProps.value">
                                                    {{ getItemLabel(slotProps.value) }}
                                                </span>
                                                <span v-else class="text-gray-400">Select item...</span>
                                            </template>
                                        </Dropdown>
                                    </td>

                                    <!-- Description -->
                                    <td class="px-3 py-2 align-top">
                                        <InputText v-model="item.description" placeholder="Description" class="w-full" disabled />
                                    </td>

                                    <!-- UOM -->
                                    <td class="px-3 py-2 align-top">
                                        <InputText v-model="item.uom" placeholder="Unit" class="w-full" disabled />
                                    </td>

                                    <!-- Quantity -->
                                    <td class="px-1 py-1 align-top">
                                        <InputText v-model="item.quantity" type="number" placeholder="Qty" class="w-full" />
                                    </td>

                                    <!-- Delivery Date -->
                                    <td class="px-3 py-2 align-top">
                                        <DatePicker v-model="item.deliveryDate" placeholder="mm/dd/yyyy" class="w-full" />
                                    </td>

                                    <!-- Actions -->
                                    <td class="px-3 py-2 text-center align-top">
                                        <Button icon="pi pi-ellipsis-v" class="p-button-text" @click="toggleMenu($event, index)" />
                                        <Menu :model="getActionItems(item, index)" :popup="true" :ref="(el: any) => setMenuRef(el, index)" />
                                    </td>
                                </tr>

                                <!-- Expanded rows for Notes / Remarks -->
                                <tr v-for="(item, index) in items" :key="'extra-' + index">
                                    <td colspan="6" class="px-3 py-2">
                                        <div v-if="item.showNotes" class="mt-2">
                                            <label class="block text-sm text-gray-600 mb-1">Notes</label>
                                            <Textarea v-model="item.notes" rows="2" class="w-full" />
                                        </div>
                                        <div v-if="item.showRemark" class="mt-2">
                                            <label class="block text-sm text-gray-600 mb-1">Remark</label>
                                            <Textarea v-model="item.remark" rows="2" class="w-full" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Items Summary -->
                        <div class="pt-3 mt-2 border-t text-sm text-gray-600 flex justify-between">
                            <span>{{ items.length }} {{ items.length > 1 ? 'items' : 'item' }}</span>
                            <span>{{ budgetType === 'Budgeted Item' ? 'Budgeted' : 'Unbudgeted' }}</span>
                        </div>
                    </Motion>
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
