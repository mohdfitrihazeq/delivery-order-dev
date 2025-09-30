```vue
<script lang="ts" src="./ViewBCR.script.ts"></script>

<template>
    <Motion :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0, y: -20 }" :transition="{ duration: 0.6 }">
        <div class="p-6 card">
            <BreadcrumbList />

            <BaseTab v-model="activeTab" :tabs="tabItems">
                <template #default="{ activeTab }">
                    <!-- Tab: Detail -->
                    <div v-if="activeTab === 'detail'">
                        <!-- Page Header -->
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h1 class="text-2xl font-bold">View Budget Change Request</h1>
                                <p class="text-gray-500">Project: MKT</p>
                            </div>
                        </div>

                        <!-- Header Information -->
                        <div class="card p-4 mb-6 shadow">
                            <h3 class="text-lg font-semibold mb-4">Header Information</h3>
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <label class="block text-gray-600 mb-1">Request No</label>
                                    <div class="w-full border rounded px-2 py-1 bg-gray-50">{{ roNumber }}</div>
                                </div>
                                <div>
                                    <label class="block text-gray-600 mb-1">Requested By</label>
                                    <div class="w-full border rounded px-2 py-1 bg-gray-50">{{ requestBy }}</div>
                                </div>
                                <div>
                                    <label class="block text-gray-600 mb-1">Date Requested</label>
                                    <div class="w-full border rounded px-2 py-1 bg-gray-50">{{ requestDate }}</div>
                                </div>
                                <div>
                                    <label class="block text-gray-600 mb-1">Reason of Request</label>
                                    <div class="w-full border rounded px-2 py-1 bg-gray-50">VO</div>
                                </div>
                            </div>
                        </div>

                        <!-- Materials -->
                        <div class="card p-4 mb-6 shadow">
                            <h3 class="text-lg font-semibold mb-4">Materials</h3>

                            <div class="overflow-x-auto">
                                <table class="min-w-full border border-gray-200 text-sm">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-4 py-2 border">Item Code</th>
                                            <th class="px-4 py-2 border">Description</th>
                                            <th class="px-4 py-2 border">UOM</th>
                                            <th class="px-4 py-2 border">Budgeted Qty</th>
                                            <th class="px-4 py-2 border">Variance Qty</th>
                                            <th class="px-4 py-2 border">Rate</th>
                                            <th class="px-4 py-2 border">Variance Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in items" :key="index">
                                            <td class="border px-2 py-1">{{ item.itemCode }}</td>
                                            <td class="border px-2 py-1">{{ item.description }}</td>
                                            <td class="border px-2 py-1">{{ item.uom }}</td>
                                            <td class="border px-2 py-1">{{ item.budgetQty }}</td>
                                            <td class="border px-2 py-1">{{ item.varianceQty }}</td>
                                            <td class="border px-2 py-1">{{ item.unitPrice }}</td>
                                            <td class="border px-2 py-1">
                                                {{ item.varianceAmount?.toFixed(2) }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="text-right mt-4 font-semibold">Total Variance Amount: {{ totalVarianceAmount.toFixed(2) }}</div>
                        </div>

                        <DiscussionThread :discussions="discussionData" :editMode="false" />
                    </div>

                    <div v-else-if="activeTab === 'activities'">
                        <ActivitiesLog :roNumber="roNumber" />
                    </div>
                </template>
            </BaseTab>
        </div>
    </Motion>
</template>
