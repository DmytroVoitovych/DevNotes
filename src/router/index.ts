import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotesPart from '@/components/notes/NotesPart.vue';
import { paramCreateControl } from './helpers';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: (to) => {
        if (to.path === '/') return { name: 'notes' };
        return to.path;
      },

      children: [
        {
          path: 'all-notes/:create?',
          name: 'notes',
          components: {
            default: NotesPart,
            createnote: () => import('../components/notes/CreateNoteComponent.vue'),
          },
          props: { default: { current: 'notes' } },
          beforeEnter: paramCreateControl,
        },
        {
          path: 'archived-notes',
          name: 'archivednotes',
          components: {
            default: NotesPart,
            // createnote: () => import('../components/notes/CreateNoteComponent.vue'),
          },
          props: {
            default: { current: 'archivednotes' },
          },
          // beforeEnter: paramCreateControl,
        },
      ],
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
        { path: 'reset-password', name: 'reset', component: () => import('../views/AuthPage.vue') },
      ],
    },
  ],
});

export default router;
