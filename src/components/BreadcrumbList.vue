<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const home: MenuItem = {
    icon: 'pi pi-home',
    route: '/'
};

const items = computed<MenuItem[]>(() => {
    return (route.meta.breadcrumb ?? []) as MenuItem[];
});
</script>

<template>
    <Breadcrumb v-if="items.length > 0" :home="home" :model="items" class="mb-4 py-1 px-2">
        <template #item="{ item, props }">
            <router-link v-if="item.route" v-bind="props.action" :to="item.route">
                <i v-if="item.icon" :class="item.icon" class="mr-1"></i>
                {{ item.label }}
            </router-link>
            <span v-else>
                <i v-if="item.icon" :class="item.icon" class="mr-1"></i>
                {{ item.label }}
            </span>
        </template>
    </Breadcrumb>
</template>
