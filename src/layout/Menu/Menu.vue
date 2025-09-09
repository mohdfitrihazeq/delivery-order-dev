<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="i">
            <menu-item v-if="!item.separator" :item="item" :index="i" />
            <menu-separator v-else />
        </template>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMenu } from './Menu.script';
import MenuItem from './MenuItem.vue';
import MenuSeparator from './MenuSeparator.vue';

export default defineComponent({
    components: {
        MenuItem,
        MenuSeparator
    },
    setup() {
        const { model } = useMenu();
        return { model };
    }
});
</script>

<style scoped lang="scss"></style>
