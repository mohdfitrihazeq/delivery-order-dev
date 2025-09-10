import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: () => import('@/views/Dashboard.vue')
            },
            {
                path: '/request-orders',
                name: 'request-orders',
                component: () => import('@/views/request-orders/RequestOrders.vue')
            },
            {
                path: '/filter-frozen-table',
                name: 'filterfrozentable',
                component: () => import('@/components/table/FilterFrozenTable.vue')
            },
            {
                path: '/sample-call-table',
                name: 'samplecalltable',
                component: () => import('@/components/table/SampleCallTable.vue')
            },
            // TODO: REMOVE THE DRAFTS FILES BELOW LATER
            {
                path: '/uikit/formlayout',
                name: 'formlayout',
                component: () => import('@/views/drafts/uikit/FormLayout.vue')
            },
            {
                path: '/uikit/input',
                name: 'input',
                component: () => import('@/views/drafts/uikit/InputDoc.vue')
            },
            {
                path: '/uikit/button',
                name: 'button',
                component: () => import('@/views/drafts/uikit/ButtonDoc.vue')
            },
            {
                path: '/uikit/table',
                name: 'table',
                component: () => import('@/views/drafts/uikit/TableDoc.vue')
            },
            {
                path: '/uikit/list',
                name: 'list',
                component: () => import('@/views/drafts/uikit/ListDoc.vue')
            },
            {
                path: '/uikit/tree',
                name: 'tree',
                component: () => import('@/views/drafts/uikit/TreeDoc.vue')
            },
            {
                path: '/uikit/panel',
                name: 'panel',
                component: () => import('@/views/drafts/uikit/PanelsDoc.vue')
            },
            {
                path: '/uikit/overlay',
                name: 'overlay',
                component: () => import('@/views/drafts/uikit/OverlayDoc.vue')
            },
            {
                path: '/uikit/media',
                name: 'media',
                component: () => import('@/views/drafts/uikit/MediaDoc.vue')
            },
            {
                path: '/uikit/message',
                name: 'message',
                component: () => import('@/views/drafts/uikit/MessagesDoc.vue')
            },
            {
                path: '/uikit/file',
                name: 'file',
                component: () => import('@/views/drafts/uikit/FileDoc.vue')
            },
            {
                path: '/uikit/menu',
                name: 'menu',
                component: () => import('@/views/drafts/uikit/MenuDoc.vue')
            },
            {
                path: '/uikit/charts',
                name: 'charts',
                component: () => import('@/views/drafts/uikit/ChartDoc.vue')
            },
            {
                path: '/uikit/misc',
                name: 'misc',
                component: () => import('@/views/drafts/uikit/MiscDoc.vue')
            },
            {
                path: '/uikit/timeline',
                name: 'timeline',
                component: () => import('@/views/drafts/uikit/TimelineDoc.vue')
            },
            {
                path: '/pages/crud',
                name: 'crud',
                component: () => import('@/views/drafts/pages/Crud.vue')
            }
        ]
    },
    {
        path: '/pages/notfound',
        name: 'notfound',
        component: () => import('@/views/drafts/pages/NotFound.vue')
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/views/auth/index.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
