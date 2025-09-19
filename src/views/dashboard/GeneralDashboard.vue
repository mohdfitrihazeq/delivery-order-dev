<script setup lang="ts">
import Deliveries from '@/components/dashboard/Deliveries.vue';
import QuickAction from '@/components/dashboard/QuickAction.vue';
import RecentSalesWidget from '@/components/dashboard/RecentSalesWidget.vue';
import RevenueStreamWidget from '@/components/dashboard/RevenueStreamWidget.vue';
import StatsWidget from '@/components/dashboard/StatsWidget.vue';
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <StatsWidget class="col-span-12" />

        <div class="col-span-12">
            <RecentSalesWidget />
        </div>

        <div class="col-span-12 xl">
            <RevenueStreamWidget />
        </div>

        <div class="col-span-12 xl">
            <QuickAction />
            <Deliveries />
        </div>
    </div>
</template>
