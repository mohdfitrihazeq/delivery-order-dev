<script lang="ts" src="./ViewRo.script.ts"></script>

<template>
    <Dialog v-model:visible="localVisible" modal header="Request Order Details" class="w-11/12 md:w-2/3">
        <div v-if="order">
            <h2 class="text-lg font-bold mb-4">Request Order - {{ order.roNumber }}</h2>

            <div class="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                    <p class="font-semibold">Status</p>
                    <p>{{ order.status }}</p>
                </div>
                <div>
                    <p class="font-semibold">Requested At</p>
                    <p>{{ order.requestedAt }}</p>
                </div>
                <div>
                    <p class="font-semibold">Requested By</p>
                    <p>{{ order.requestedBy }}</p>
                </div>
                <div>
                    <p class="font-semibold">Budget Type</p>
                    <p>{{ order.budgetType }}</p>
                </div>
                <div>
                    <p class="font-semibold">RO Date</p>
                    <p>{{ order.roDate }}</p>
                </div>
            </div>

            <h3 class="font-semibold mb-2">Requested Items</h3>
            <table class="w-full border text-sm">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="p-2 text-left">Item Code</th>
                        <th class="p-2 text-left">Description</th>
                        <th class="p-2 text-left">UOM</th>
                        <th class="p-2 text-left">Order Qty</th>
                        <th class="p-2 text-left">Delivery Date</th>
                        <th class="p-2 text-left">Note</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, idx) in order.items || []" :key="idx">
                        <td class="p-2">{{ item.code }}</td>
                        <td class="p-2">{{ item.description }}</td>
                        <td class="p-2">{{ item.uom }}</td>
                        <td class="p-2">{{ item.qty }}</td>
                        <td class="p-2">{{ item.deliveryDate }}</td>
                        <td class="p-2">{{ item.note }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <template #footer>
            <div class="flex justify-end gap-2">
                <template v-if="isPurchasingRole && order?.status === 'Pending'">
                    <Button label="Reject Request" severity="danger" outlined icon="pi pi-times" @click="handleReject" />
                    <Button label="Approve Request" severity="success" icon="pi pi-check" @click="handleApprove" />
                </template>
                <template v-else>
                    <Button label="Close" severity="secondary" icon="pi pi-times" @click="handleClose" />
                </template>
            </div>
        </template>
    </Dialog>
</template>
