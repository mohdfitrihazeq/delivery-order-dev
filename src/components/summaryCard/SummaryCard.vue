<script lang="ts" src="./SummaryCard.script.ts"></script>

<template>
    <div v-for="item in cardItems" :key="item.title" class="col-span-12 lg:col-span-6" :class="cardColClass">
        <div class="glossy-card border-grey-400 p-4" style="border-color: #f8f8f8 !important">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-bold mb-4">{{ item.title }}</span>
                </div>
                <div class="flex items-center justify-center rounded-full w-6 h-6" :class="`bg-${item.color}-100 dark:bg-${item.color}-400/10`">
                    <i :class="[item.icon, `text-${item.color}-500`, 'text-xs']"></i>
                </div>
            </div>
            <div class="font-medium text-xl dark:text-surface-0" :class="`text-${item.color}-500 !text-${item.color}-500`">
                {{ item.value }}
            </div>
            <span class="text-muted-color">{{ item.description }}</span>
        </div>
    </div>
</template>
