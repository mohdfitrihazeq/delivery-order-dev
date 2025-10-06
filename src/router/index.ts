import AppLayout from '@/layout/AppLayout.vue';
import { useAuthStore } from '@/stores/auth/auth.store';
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
                name: 'purchase-orders',
                component: () => import('@/views/purchase-orders/PurchaseOrders.vue'),
                meta: {
                    breadcrumb: [{ label: 'Purchase Orders', route: '/purchase-orders' }]
                }
            },
            {
                path: '/purchase-orders/view/:poNumber',
                name: 'ViewDetailsPO',
                component: () => import('@/views/purchase-orders/components/ViewDetailsPO.vue'),
                meta: {
                    breadcrumb: [{ label: 'Purchase Orders', route: '/purchase-orders' }, { label: 'View' }]
                }
            },
            {
                path: '/budget',
                name: 'budget',
                component: () => import('@/views/budget/budgetList/Budget.vue'),
                meta: {
                    breadcrumb: [{ label: 'Budget', route: '/budget' }]
                }
            },
            {
                path: '/bcr',
                name: 'budgetChangeRequest',
                component: () => import('@/views/budget/budgetChangeRequest/BCR.vue'),
                meta: {
                    breadcrumb: [{ label: 'Budget Change Request', route: '/bcr' }]
                }
            },
            {
                path: '/bcr/create',
                name: 'budgetChangeRequest-create',
                component: () => import('@/views/budget/components/page/CreateBCR.vue'),
                meta: {
                    breadcrumb: [{ label: 'Budget Change Request', route: '/bcr' }, { label: 'Create Budget Change Request' }]
                }
            },
            {
                path: '/bcr/edit/:requestNo',
                name: 'budgetChangeRequest-edit',
                component: () => import('@/views/budget/components/page/EditBCR.vue'),
                meta: {
                    breadcrumb: [{ label: 'BCR', route: '/bcr' }, { label: 'Edit Budget Change Request' }]
                }
            },
            {
                path: '/bcr/view/:requestNo',
                name: 'budgetChangeRequest-view',
                component: () => import('@/views/budget/components/page/ViewBCR.vue'),
                meta: {
                    breadcrumb: [{ label: 'BCR', route: '/bcr' }, { label: 'View Budget Change Request' }]
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
                component: () => import('@/views/delivery/components/pages/createDelivery/createDelivery.vue'),
                meta: {
                    breadcrumb: [{ label: 'Deliveries', route: '/deliveries' }, { label: 'Create Delivery' }]
                }
            },
            {
                path: '/deliveries/viewDelivery/:doNumber',
                name: 'deliveries-view',
                component: () => import('@/views/delivery/components/pages/viewDelivery/ViewDelivery.vue'),
                meta: {
                    breadcrumb: [{ label: 'Deliveries', route: '/deliveries' }, { label: 'View Delivery' }]
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
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next({ name: 'login' });
    }

    if (to.name === 'login' && authStore.isAuthenticated) {
        return next({ name: 'dashboard' });
    }

    next();
});

export default router;
