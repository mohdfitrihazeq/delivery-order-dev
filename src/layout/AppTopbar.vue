<script setup>
import { useLayout } from '@/layout/composables/layout';
import { Motion } from '@motionone/vue';
import AppConfigurator from './AppConfigurator.vue';
const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <Motion tag="div" class="layout-topbar bg-gradient-to-r from-teal-500 to-cyan-300 shadow-lg backdrop-blur-md" :initial="{ y: -80, opacity: 0 }" :animate="{ y: 0, opacity: 1 }" :transition="{ duration: 0.8, ease: 'easeOut' }">
        <div class="layout-topbar-logo-container flex items-center gap-3">
            <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
                <i class="pi pi-bars text-teal-700"></i>
            </button>

            <router-link to="/" class="layout-topbar-logo">
                <h1 class="text-2xl font-extrabold leading-tight m-0 bg-gradient-to-r from-teal-50 to-teal-100 bg-clip-text text-transparent">DO SYSTEM</h1>
            </router-link>
        </div>

        <div class="layout-topbar-actions flex items-center gap-3">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon text-white': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
            </div>
            <div class="relative">
                <button
                    v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                    type="button"
                    class="layout-topbar-action layout-topbar-action-highlight"
                >
                    <i class="pi pi-palette"></i>
                </button>
                <AppConfigurator />
            </div>
            <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{
                    selector: '@next',
                    enterFromClass: 'hidden',
                    enterActiveClass: 'animate-scalein',
                    leaveToClass: 'hidden',
                    leaveActiveClass: 'animate-fadeout',
                    hideOnOutsideClick: true
                }"
            >
                <i class="pi pi-ellipsis-v text-white"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content flex gap-2">
                    <button type="button" class="layout-topbar-action text-white hover:opacity-80 transition">
                        <i class="pi pi-bell"></i>
                        <span>Notification</span>
                    </button>
                    <button type="button" class="layout-topbar-action text-white hover:opacity-80 transition">
                        <i class="pi pi-sign-out"></i>
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </div>
    </Motion>
</template>
