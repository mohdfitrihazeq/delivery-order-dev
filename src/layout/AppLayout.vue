<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import type { MenuItem } from 'primevue/menuitem';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();
const route = useRoute();

// ✅ 定义 home
const home: MenuItem = {
    icon: 'pi pi-home',
    route: '/' // ⚠️ 用 route，不要用 to
};

// ✅ 从 meta 拿 items
const items = computed<MenuItem[]>(() => {
    return (route.meta.breadcrumb ?? []) as MenuItem[];
});

const outsideClickListener = ref<((event: Event) => void) | null>(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive
    };
});

function bindOutsideClickListener() {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive = false;
                layoutState.staticMenuMobileActive = false;
                layoutState.menuHoverActive = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
}

function unbindOutsideClickListener() {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener.value);
        outsideClickListener.value = null;
    }
}

function isOutsideClicked(event: Event) {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !((sidebarEl && (sidebarEl.isSameNode(event.target as Node) || sidebarEl.contains(event.target as Node))) || (topbarEl && (topbarEl.isSameNode(event.target as Node) || topbarEl.contains(event.target as Node))));
}
</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <app-topbar></app-topbar>
        <app-sidebar></app-sidebar>

        <div class="layout-main-container">
            <div class="layout-main">
                <Breadcrumb v-if="items.length > 0" :home="home" :model="items" class="mb-2 py-1">
                    <template #item="{ item, props }">
                        <!-- ✅ 用 item.route，不要用 item.to -->
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

                <!-- Page Content -->
                <router-view></router-view>
            </div>
        </div>

        <div class="layout-mask animate-fadein"></div>
    </div>
    <Toast />
</template>
