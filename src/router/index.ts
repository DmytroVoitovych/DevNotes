import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/auth',
      name: 'auth',
      redirect: 'auth/login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      children: [
        { path: 'login', name: 'login', component: () => import('../views/AuthPage.vue') },
        { path: 'forgot', name: 'forgot', component: () => import('../views/AuthPage.vue') },
        { path: 'signup', name: 'signup', component: () => import('../views/AuthPage.vue') },
      ],
    },
  ],
});

export default router;
