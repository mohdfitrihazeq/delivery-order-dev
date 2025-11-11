<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import type { MenuItem } from 'primevue/menuitem';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();
const route = useRoute();

const home: MenuItem = {
    icon: 'pi pi-home',
    route: '/'
};

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
        <!-- LEFT: Sidebar -->
        <app-sidebar></app-sidebar>

        <!-- RIGHT: Topbar + Content -->
        <div class="layout-right-section">
            <app-topbar></app-topbar>

            <div class="layout-main-container">
                <div class="layout-main">
                    <!-- Page Content -->
                    <router-view></router-view>
                </div>
            </div>
        </div>

        <div class="layout-mask animate-fadein"></div>
    </div>
    <Toast />
</template>

<style scoped lang="scss">
.layout-wrapper {
    width: 100%;
    height: 100vh;
}

.layout-sidebar {
    flex-shrink: 0;
    width: 18rem;
    position: relative;
    z-index: 998;
}

.layout-right-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;

    margin-right: -2rem;
    margin-top: -1.5rem;
}

.layout-main-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;

    scroll-behavior: smooth;
}

.layout-main {
    padding: 0rem 1.5rem;
}

.layout-mask {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    width: 100%;
    height: 100%;
}

.animate-fadein {
    animation: fadeIn 0.15s linear;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
