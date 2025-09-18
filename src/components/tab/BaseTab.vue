<script lang="ts">
import { defineComponent, PropType } from 'vue';

type TabItem = {
    value: string;
    label: string;
    icon?: string;
};

export default defineComponent({
    name: 'BaseTab',
    props: {
        tabs: {
            type: Array as PropType<TabItem[]>,
            required: true
        },
        modelValue: {
            type: String,
            required: true
        }
    },
    emits: ['update:modelValue']
});
</script>

<template>
    <div class="custom-tabs">
        <button v-for="tab in tabs" :key="tab.value" :class="['custom-tab', { active: modelValue === tab.value }]" @click="$emit('update:modelValue', tab.value)">
            <i v-if="tab.icon" :class="[tab.icon, 'mr-2']"></i>
            {{ tab.label }}
        </button>
    </div>

    <div class="tab-content mt-4">
        <slot :activeTab="modelValue" />
    </div>
</template>
