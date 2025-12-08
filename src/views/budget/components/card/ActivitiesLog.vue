<script lang="ts">
import { useBudgetChangeRequestStore } from '@/stores/budget/budgetChangeRequest.store';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'ActivitiesLog',
    setup() {
        const route = useRoute();
        const bcrStore = useBudgetChangeRequestStore();
        // const activities = ref<Activity[]>([]);
        const loading = ref(false);

        const loadActivities = async () => {
            const budgetChangeRequestId = Number(route.params.budgetChangeRequestId);
            if (!budgetChangeRequestId) return;

            loading.value = true;
            try {
                await bcrStore.getBudgetChangeRequestActivity(budgetChangeRequestId);

                // if (!result || !result.history) {
                //     activities.value = [];
                //     return;
                // }

                // // 映射成 Activity[]
                // activities.value = result.history.map((item: any) => ({
                //     user: item.user,
                //     role: item.role,
                //     date: item.date,
                //     action: item.action,
                //     icon: item.icon || 'pi pi-clock'
                // }));
            } catch (error) {
                // activities.value = [];
            } finally {
                loading.value = false;
            }
        };

        onMounted(loadActivities);

        // 当 route.params.requestNo 改变时重新加载
        watch(() => route.params.requestNo, loadActivities);

        return {
            loading,
            requestNo: route.params.requestNo
        };
    }
});
</script>

<template>
    <div class="card p-4 mb-6 shadow">
        <h3 class="text-lg font-semibold mb-4">Activities Log (RO#: {{ requestNo }})</h3>

        <ul v-if="!loading" class="space-y-4 text-sm">
            <!-- <li v-for="(log, index) in activities" :key="index" class="flex gap-3">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <i :class="log.icon" class="text-primary text-sm"></i>
                </div>

                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        <span class="font-semibold">{{ log.user }}</span>
                        <span class="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">{{ log.role }}</span>
                        <span class="text-gray-400 text-xs">{{ log.date }}</span>
                    </div>
                    <div class="mt-1 text-gray-700 text-sm">{{ log.action }}</div>
                </div>
            </li> -->
        </ul>

        <div v-else class="text-center text-gray-500 py-4">Loading activities...</div>
    </div>
</template>
