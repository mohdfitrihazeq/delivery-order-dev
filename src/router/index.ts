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
                component: () => import('@/views/Dashboard.vue'),
                meta: {
                    breadcrumb: [{ label: 'Dashboard', to: '/' }]
                }
            },
            {
                path: '/request-orders',
                name: 'request-orders',
                component: () => import('@/views/request-orders/RequestOrders.vue'),
                meta: {
                    breadcrumb: [{ label: 'Request Orders', to: '/request-orders' }]
                }
            },
            {
                path: '/request-orders/create',
                name: 'create-request-orders',
                component: () => import('@/views/request-orders/components/page/CreateRequestOrders.vue'),
                meta: {
                    breadcrumb: [{ label: 'Request Orders', to: '/request-orders' }, { label: 'Create' }]
                }
            },
            {
                path: '/budget',
                name: 'budget',
                component: () => import('@/views/budget/Budget.vue'),
                meta: {
                    breadcrumb: [{ label: 'Budget', to: '/budget' }]
                }
            },
            {
                path: '/deliveries',
                name: 'deliveries',
                component: () => import('@/views/delivery/Deliveries.vue'),
                meta: {
                    breadcrumb: [{ label: 'Deliveries', to: '/deliveries' }]
                }
            },
            {
                path: '/deliveries/createDelivery',
                name: 'deliveries-create',
                component: () => import('@/views/delivery/components/pages/createDelivery.vue'),
                meta: {
                    breadcrumb: [{ label: 'Deliveries', to: '/deliveries/createDelivery' }, { label: 'Create' }]
                }
            },

            // TODO: REMOVE THE DRAFTS FILES BELOW LATER
            {
                path: '/sample-call-table',
                name: 'samplecalltable',
                component: () => import('@/components/table/SampleCallTable.vue')
            },
            {
                path: '/uikit/formlayout',
                name: 'formlayout',
                component: () => import('@/views/drafts/uikit/FormLayout.vue'),
                meta: {
                    breadcrumb: [{ label: 'Form Layout' }]
                }
            },
            {
                path: '/uikit/input',
                name: 'input',
                component: () => import('@/views/drafts/uikit/InputDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'Input' }]
                }
            },
            {
                path: '/uikit/button',
                name: 'button',
                component: () => import('@/views/drafts/uikit/ButtonDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'Button' }]
                }
            },
            {
                path: '/uikit/table',
                name: 'table',
                component: () => import('@/views/drafts/uikit/TableDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'Table' }]
                }
            },
            {
                path: '/uikit/list',
                name: 'list',
                component: () => import('@/views/drafts/uikit/ListDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'List' }]
                }
            },
            {
                path: '/uikit/tree',
                name: 'tree',
                component: () => import('@/views/drafts/uikit/TreeDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'Tree' }]
                }
            },
            {
                path: '/uikit/panel',
                name: 'panel',
                component: () => import('@/views/drafts/uikit/PanelsDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'Panel' }]
                }
            },
            {
                path: '/uikit/overlay',
                name: 'overlay',
                component: () => import('@/views/drafts/uikit/OverlayDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'Overlay' }]
                }
            },
            {
                path: '/uikit/media',
                name: 'media',
                component: () => import('@/views/drafts/uikit/MediaDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'Media' }]
                }
            },
            {
                path: '/uikit/message',
                name: 'message',
                component: () => import('@/views/drafts/uikit/MessagesDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'Message' }]
                }
            },
            {
                path: '/uikit/file',
                name: 'file',
                component: () => import('@/views/drafts/uikit/FileDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'File' }]
                }
            },
            {
                path: '/uikit/menu',
                name: 'menu',
                component: () => import('@/views/drafts/uikit/MenuDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'Menu' }]
                }
            },
            {
                path: '/uikit/charts',
                name: 'charts',
                component: () => import('@/views/drafts/uikit/ChartDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'Charts' }]
                }
            },
            {
                path: '/uikit/misc',
                name: 'misc',
                component: () => import('@/views/drafts/uikit/MiscDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'Misc' }]
                }
            },
            {
                path: '/uikit/timeline',
                name: 'timeline',
                component: () => import('@/views/drafts/uikit/TimelineDoc.vue'),
                meta: {
                    breadcrumb: [{ label: 'Timeline' }]
                }
            },
            {
                path: '/pages/crud',
                name: 'crud',
                component: () => import('@/views/drafts/pages/Crud.vue'),
                meta: {
                    breadcrumb: [{ label: 'Crud' }]
                }
            },
            {
                path: '/pages/notfound',
                name: 'notfound',
                component: () => import('@/views/drafts/pages/NotFound.vue'),
                meta: {
                    breadcrumb: [{ label: 'Not Found' }]
                }
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
