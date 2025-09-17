<script lang="ts">
import { Motion } from '@motionone/vue';
import Tag from 'primevue/tag';
import { defineComponent, ref } from 'vue';

import BaseTab from '@/components/tab/BaseTab.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import { usePurchase } from './DeliveriesLogic';
import DeliveriesSummaryData from './DeliveriesSummaryData.vue';

export default defineComponent({
    name: ' Delieveries',
    components: {
        BaseTab,
        Motion,
        Tag,
        DeliveriesSummaryData,
        ReusableTable
    },
    setup() {
        const logic = usePurchase();

        const tabItems = [
            { value: '0', label: 'Purchase Orders' },
            { value: '1', label: 'Pending' },
            { value: '2', label: 'In Progress' },
            { value: '3', label: 'Completes' }
        ];

        const activeTab = ref('0');

        return {
            ...logic,
            activeTab,
            tabItems
        };
    }
});
</script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card glossy-card mb-0">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-2xl font-bold">Delivery Verification</h1>
                    <p class="text-gray-500">Compare received materials with purchase orders and record discrepancies</p>
                </div>
                <button class="btn-cyan-gradient">+ New Delivery Verification</button>
            </div>

            <div class="grid grid-cols-12 gap-4 mb-3">
                <DeliveriesSummaryData />
            </div>

            <!-- Body -->
            <BaseTab v-model="activeTab" :tabs="tabItems">
                <template #default="{ activeTab }">
                    <div v-if="activeTab === '0'" class="ms-6">
                        <div class="mt-5 mb-3">
                            <h7 class="text-gray-500"><b>Purchase Orders </b></h7>
                            <p class="mt-2 text-sm">View purchase orders and their delivery status</p>
                        </div>
                        <ReusableTable :value="purchaseList" :columns="purchaseColumn" :filters="filters" :onSearch="onSearchWrapper">
                            <template #totalAmount="{ data }"> ${{ data.totalAmount }} </template>
                            <template #status="{ data }">
                                <Tag :value="data.status" :severity="data.status === 'active' ? 'success' : data.status === 'partially delivered' ? 'warn' : 'danger'" />
                            </template>
                        </ReusableTable>
                    </div>

                    <div v-else-if="activeTab === '1'" class="ms-6">
                        <div class="mt-5 mb-3">
                            <h7 class="text-gray-500"><b>Pending Deliveries</b></h7>
                            <p class="mt-2 text-sm">Delivery orders with status: draft or submitted</p>
                        </div>
                    </div>

                    <div v-else-if="activeTab === '2'" class="ms-6">
                        <div class="mt-5 mb-3">
                            <h7 class="text-gray-500"><b>In Progress Deliveries </b></h7>
                            <p class="mt-2 text-sm">Delivery orders with status: verified</p>
                        </div>
                    </div>

                    <div v-else-if="activeTab === '3'" class="ms-6">
                        <div class="mt-5 mb-3">
                            <h7 class="text-gray-500"><b>Completed Deliveries </b></h7>
                            <p class="mt-2 text-sm">Delivery orders with status: completed</p>
                        </div>
                        <ReusableTable :value="deliveriesList" :columns="deliveriesColumn" :filters="filters" :onSearch="onSearchWrapper">
                            <template #status="{ data }">
                                <Tag :value="data.status" :severity="data.status === 'completed' ? 'success' : data.status === 'partially delivered' ? 'warn' : 'danger'" />
                            </template>
                        </ReusableTable>
                    </div>
                </template>
            </BaseTab>
        </div>
    </Motion>
</template>
