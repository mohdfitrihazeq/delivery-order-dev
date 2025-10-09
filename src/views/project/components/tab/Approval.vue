<template>
    <div class="grid gap-6 md:grid-cols-3">
        <Card class="border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 bg-white overflow-hidden">
            <template #title>
                <div class="border-b-2 border-primary-400 pb-2 mb-3 flex justify-between items-center">
                    <span class="text-lg font-semibold text-gray-800">Budget Change Request</span>
                    <i class="pi pi-wallet text-primary text-xl"></i>
                </div>
            </template>
            <template #content>
                <ul class="space-y-2">
                    <li v-for="(person, index) in budgetChangeList" :key="index" class="flex items-center justify-between border-b border-gray-100 pb-1">
                        <div class="flex items-center space-x-2">
                            <span class="text-gray-400 font-medium w-5 text-right">{{ index + 1 }}.</span>
                            <span class="font-medium text-gray-700">{{ person.name }}</span>
                        </div>
                        <span class="text-sm text-gray-500">{{ person.role }}</span>
                    </li>
                </ul>
            </template>
        </Card>

        <Card class="border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 bg-white overflow-hidden">
            <template #title>
                <div class="border-b-2 border-primary-400 pb-2 mb-3 flex justify-between items-center">
                    <span class="text-lg font-semibold text-gray-800">Request Order</span>
                    <i class="pi pi-wallet text-primary text-xl"></i>
                </div>
            </template>
            <template #content>
                <ul class="space-y-2">
                    <li v-for="(person, index) in requestOrderList" :key="index" class="flex items-center justify-between border-b border-gray-100 pb-1">
                        <div class="flex items-center space-x-2">
                            <span class="text-gray-400 font-medium w-5 text-right">{{ index + 1 }}.</span>
                            <span class="font-medium text-gray-700">{{ person.name }}</span>
                        </div>
                        <span class="text-sm text-gray-500">{{ person.role }}</span>
                    </li>
                </ul>
            </template>
        </Card>

        <Card class="border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 bg-white overflow-hidden">
            <template #title>
                <div class="border-b-2 border-primary-400 pb-2 mb-3 flex justify-between items-center">
                    <span class="text-lg font-semibold text-gray-800">Request Order Exceeded Budget</span>
                    <i class="pi pi-wallet text-primary text-xl"></i>
                </div>
            </template>
            <template #content>
                <ul class="space-y-2">
                    <li v-for="(person, index) in exceededBudgetList" :key="index" class="flex items-center justify-between border-b border-gray-100 pb-1">
                        <div class="flex items-center space-x-2">
                            <span class="text-gray-400 font-medium w-5 text-right">{{ index + 1 }}.</span>
                            <span class="font-medium text-gray-700">{{ person.name }}</span>
                        </div>
                        <span class="text-sm text-gray-500">{{ person.role }}</span>
                    </li>
                </ul>
            </template>
        </Card>
    </div>
</template>

<script lang="ts">
import Card from 'primevue/card';
import { defineComponent, ref } from 'vue';

interface Person {
    name: string;
    role: string;
}

export default defineComponent({
    name: 'RequestSummaryCards',
    components: { Card },
    setup() {
        const budgetChangeList = ref<Person[]>([
            { name: 'ZIYU', role: 'PM' },
            { name: 'ALICE', role: 'Finance' },
            { name: 'KELVIN', role: 'Admin' }
        ]);

        const requestOrderList = ref<Person[]>([
            { name: 'BRYAN', role: 'Procurement' },
            { name: 'CINDY', role: 'PM' }
        ]);

        const exceededBudgetList = ref<Person[]>([
            { name: 'DAVID', role: 'Finance' },
            { name: 'EMMA', role: 'PM' },
            { name: 'LIAM', role: 'Director' }
        ]);

        return {
            budgetChangeList,
            requestOrderList,
            exceededBudgetList
        };
    }
});
</script>
