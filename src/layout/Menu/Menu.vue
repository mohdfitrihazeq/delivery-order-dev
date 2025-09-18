<script lang="ts">
import MenuSeparator from '@/components/SeparatorLine.vue';
import { defineComponent } from 'vue';
import { useMenu } from './Menu';
import MenuItem from './MenuItem.vue';

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

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="i">
            <menu-item v-if="!item.separator" :item="item" :index="i" />
            <menu-separator v-else />
        </template>
    </ul>
</template>

<style scoped lang="scss"></style>
