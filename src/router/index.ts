import AppLayout from '@/layout/AppLayout.vue';
import { isAuthenticated } from '@/views/auth/index.script';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: AppLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: () => import('@/views/dashboard/Dashboard.vue')
            },
            {
                path: '/request-orders',
                name: 'request-orders',
                component: () => import('@/views/request-orders/RequestOrders.vue'),
                meta: {
                    breadcrumb: [{ label: 'Request Orders', route: '/request-orders' }]
                }
            },
            {
                path: '/request-orders/create',
                name: 'create-request-orders',
                component: () => import('@/views/request-orders/components/page/CreateRequestOrders.vue'),
                meta: {
                    breadcrumb: [{ label: 'Request Orders', route: '/request-orders' }, { label: 'Create' }]
                }
            },
            {
                path: '/purchase-orders',
                name: 'purchaseorders',
                component: () => import('@/views/budget/Budget.vue'),
                meta: {
                    breadcrumb: [{ label: 'Purchase Order', route: '/purchase-orders' }]
                }
            },
            {
                path: '/budget',
                name: 'budget',
                component: () => import('@/views/budget/Budget.vue'),
                meta: {
                    breadcrumb: [{ label: 'Budget', route: '/budget' }]
                }
            },
            {
                path: '/deliveries',
                name: 'deliveries',
                component: () => import('@/views/delivery/Deliveries.vue'),
                meta: {
                    breadcrumb: [{ label: 'Deliveries', route: '/deliveries' }]
                }
            },
            {
                path: '/deliveries/createDelivery',
                name: 'deliveries-create',
                component: () => import('@/views/delivery/components/pages/createDelivery.vue'),
                meta: {
                    breadcrumb: [{ label: 'Deliveries', route: '/deliveries' }, { label: 'Create' }]
                }
            },

            // TODO: REMOVE THE DRAFTS FILES BELOW LATER
            {
                path: '/sample-call-table',
                name: 'samplecalltable',
                component: () => import('@/components/table/SampleCallTable.vue')
            }
        ]
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/views/auth/index.vue'),
        meta: {
            breadcrumb: [{ label: 'Login', public: true }]
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated.value) {
        next({ name: 'login' });
    } else if (to.name === 'login' && isAuthenticated.value) {
        next({ name: 'dashboard' });
    } else {
        next();
    }
});

export default router;
