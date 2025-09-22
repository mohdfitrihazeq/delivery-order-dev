<script lang="ts" src="./Menu.script.ts"></script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="i">
            <menu-item v-if="!item.separator" :item="item" :index="i" />
            <SeparatorLine v-else />
        </template>
    </ul>
</template>
