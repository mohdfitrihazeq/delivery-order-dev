<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';

export type TabItem = {
    value: string;
    label: string;
    icon?: string;
    badge?: number;
};

export default defineComponent({
    name: 'BaseTabPills',
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
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const activeTab = ref(props.modelValue);

        watch(
            () => props.modelValue,
            (newVal) => {
                activeTab.value = newVal;
            }
        );

        const selectTab = (value: string) => {
            activeTab.value = value;
            emit('update:modelValue', value);
        };

        return { activeTab, selectTab };
    }
});
</script>

<template>
    <div class="flex w-full bg-gray-100 rounded-full p-1 mt-5">
        <button
            v-for="(tab, index) in tabs"
            :key="tab.value"
            @click="selectTab(tab.value)"
            :class="['flex items-center gap-2 flex-1 justify-center rounded-full py-2 px-4 transition font-medium', activeTab === tab.value ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700']"
        >
            <!-- Icon -->
            <i v-if="tab.icon" :class="[tab.icon, 'text-sm']"></i>
            <span>{{ tab.label }}</span>
            <!-- Badge -->
            <span v-if="tab.badge !== undefined" class="ml-1 text-sm font-semibold" :class="activeTab === tab.value ? 'text-gray-900' : 'text-gray-500'"> ({{ tab.badge }}) </span>
        </button>
    </div>

    <div class="tab-content mt-4">
        <template v-for="(tab, index) in tabs" :key="tab.value">
            <slot :name="index" v-if="activeTab === tab.value" />
        </template>
    </div>
</template>
