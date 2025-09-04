import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Ecommerce',
      component: () => import('../views/Ecommerce.vue'),
      meta: {
        title: 'eCommerce Dashboard',
      },
    },
    {
      path: '/form-elements',
      name: 'Form Elements',
      component: () => import('../views/Forms/FormElements.vue'),
      meta: {
        title: 'Form Elements',
      },
    },
    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Auth/UserProfile.vue'),
      meta: {
        title: 'Profile',
      },
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/index.vue'),
      meta: {
        title: 'Signin',
      },
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = ` ${to.meta.title} | Delivery Order System`
  next()
})
