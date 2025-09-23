<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ResultNotFound',
    props: {
        title: {
            type: String,
            default: 'No data available'
        },
        subtitle: {
            type: String,
            default: ''
        }
    }
});
</script>

<template>
    <div class="flex flex-col justify-center items-center text-center py-10 text-gray-500">
        <i class="pi pi-inbox text-4xl mb-3"></i>
        <p class="text-lg font-medium">{{ title }}</p>
        <p v-if="subtitle" class="text-sm text-gray-400">{{ subtitle }}</p>
    </div>
</template>
