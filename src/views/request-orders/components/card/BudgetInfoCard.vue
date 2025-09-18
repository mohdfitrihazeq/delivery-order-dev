<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BudgetInfoCard'
});
</script>

<template>
    <div class="flex items-start gap-3 border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white relative">
        <!-- Blue strip on the left -->
        <div class="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-blue-500"></div>

        <!-- Content -->
        <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-blue-50 text-blue-500 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17h6m-6-4h6m2 9H7a2 2 0 01-2-2V5a2 2 0 
             012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z"
                />
            </svg>
        </div>

        <div class="relative z-10">
            <p class="font-semibold text-gray-800">Current Budget Type: Budgeted Items</p>
            <p class="text-gray-500 text-sm">Items will be selected from your project budget. Descriptions and prices are pre-filled.</p>
        </div>
    </div>
</template>
