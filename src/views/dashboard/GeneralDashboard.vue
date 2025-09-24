<script setup lang="ts">
import SummaryCard from '@/components/summaryCard/SummaryCard.vue';
import type { CardItem } from '@/types/card.type';
import RevenueStreamWidget from './components/chart/RevenueStreamWidget.vue';

// ---------------------------
// 1. DATA (constants, refs)
// ---------------------------
const BudgetSummaryData: CardItem[] = [
    { title: 'Total Budget', value: '$1,800,000', description: '24 new since last visit', icon: 'pi pi-dollar', color: 'orange' },
    { title: 'Total Spent', value: '52%', description: '+52% since last week', icon: 'pi pi-chart-line', color: 'blue' },
    { title: 'Budget Items', value: '14', description: '5 Delivered', icon: 'pi pi-database', color: 'green' },
    { title: 'Project Days', value: '669', description: 'Since project start', icon: 'pi pi-calendar', color: 'purple' }
];
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <SummaryCard :cardItems="BudgetSummaryData" :cardCol="4" />

        <div class="col-span-12 xl:col-span-12">
            <RevenueStreamWidget />
        </div>
    </div>
</template>
