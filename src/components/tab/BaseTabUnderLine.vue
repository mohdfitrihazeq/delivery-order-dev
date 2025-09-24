<script setup lang="ts">
import Badge from 'primevue/badge';
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import Tabs from 'primevue/tabs';
import { ref, watch } from 'vue';

interface TabItem {
    value: string;
    label: string;
    icon?: string;
    badge?: string | number;
}

const props = defineProps<{
    tabs: TabItem[];
    modelValue?: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const activeTab = ref(props.modelValue ?? props.tabs[0]?.value ?? '0');

watch(activeTab, (val) => emit('update:modelValue', val));
</script>

<template>
    <Tabs v-model:value="activeTab">
        <!-- Tab Headers -->
        <TabList class="custom-tabs">
            <Tab v-for="tab in tabs" :key="tab.value" :value="tab.value" as="button" :class="['custom-tab', { active: activeTab === tab.value }]">
                <i v-if="tab.icon" :class="['pi', tab.icon]"></i>
                <span class="whitespace-nowrap">{{ tab.label }}</span>
                <Badge v-if="tab.badge" :value="tab.badge" />
            </Tab>
        </TabList>

        <!-- Tab Panels -->
        <TabPanels>
            <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value" as="div" class="p-4">
                <slot :name="tab.value" />
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>
