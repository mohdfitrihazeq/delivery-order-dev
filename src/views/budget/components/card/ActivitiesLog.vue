```vue
<script lang="ts">
import { defineComponent, ref } from 'vue';

type Activity = {
    user: string;
    role: string;
    date: string;
    action: string;
    icon?: string; // 例如 'pi pi-user' 'pi pi-check'
};

export default defineComponent({
    name: 'ActivitiesLog',
    props: {
        roNumber: {
            type: String,
            required: true
        }
    },
    setup() {
        const activities = ref<Activity[]>([
            {
                user: 'John Smith',
                role: 'PM',
                date: '20 Sept 2024, 06:00 pm',
                action: 'Budget Change Request created',
                icon: 'pi pi-clock'
            },
            {
                user: 'John Smith',
                role: 'Purchasing',
                date: '28 Sept 2025, 11:09 am',
                action: 'Added recommendation from Purchasing department',
                icon: 'pi pi-comment'
            },
            {
                user: 'Jane Doe',
                role: 'QS',
                date: '29 Sept 2025, 09:30 am',
                action: 'Reviewed variance calculation and confirmed figures',
                icon: 'pi pi-comment'
            }
        ]);

        return {
            activities
        };
    }
});
</script>

<template>
    <div class="card p-4 mb-6 shadow">
        <h3 class="text-lg font-semibold mb-4">Activities Log (RO#: {{ roNumber }})</h3>

        <ul class="space-y-4 text-sm">
            <li v-for="(log, index) in activities" :key="index" class="flex gap-3">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <i :class="log.icon" class="text-primary text-sm"></i>
                </div>

                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        <span class="font-semibold">{{ log.user }}</span>
                        <span class="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">
                            {{ log.role }}
                        </span>
                        <span class="text-gray-400 text-xs">{{ log.date }}</span>
                    </div>
                    <div class="mt-1 text-gray-700 text-sm">
                        {{ log.action }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
```
