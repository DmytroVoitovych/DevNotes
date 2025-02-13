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
          path: 'all-notes/:create(create)?/:name([^/]+)?/:id(.*)?',
          name: 'notes',
          components: {
            default: NotesPart,
            createnote: () => import('../components/notes/CreateNoteComponent.vue'),
            action: () => import('../components/shared/NotesMoveList.vue'),
          },
          props: {
            default: { current: 'notes' },
            createnote: (route) => ({ id: route.params.id }),
            action: (route) => ({ id: route.params.id }),
          },
          beforeEnter: paramCreateControl,
        },
        {
          path: 'archived-notes/:name?/:id?',
          name: 'archivednotes',
          components: {
            default: NotesPart,
            createnote: () => import('../components/notes/CreateNoteComponent.vue'),
            action: () => import('../components/shared/NotesMoveList.vue'),
          },
          props: {
            default: { current: 'archivednotes' },
            createnote: (route) => ({ id: route.params.id }),
            action: (route) => ({ id: route.params.id }),
          },

          // beforeEnter: paramCreateControl,
        },
        {
          path: 'settings/:settingname([^/]+)?',
          name: 'settings',
          components: {
            default: () => import('../components/settings/SettingsVariations.vue'),
            pickedsetting: () => import('../components/settings/StyleList.vue'),
          },
          props: {
            default: { current: 'settings' },
            pickedsetting: (route) => ({ param: route.params.settingname }),
          },
        },
        {
          path: 'tags',
          name: 'tags',
          component: () => import('../components/shared/TagsList.vue'),
          props: { current: 'tags' },
          beforeEnter: (to, from, next) => {
            if (window.innerWidth >= 1440) next('/');
            else next();
          },
        },
        {
          path: ':tag/:name?/:id?',
          name: 'tag',
          components: {
            default: () => import('../components/notes/NotesPart.vue'),
            createnote: () => import('../components/notes/CreateNoteComponent.vue'),
            action: () => import('../components/shared/NotesMoveList.vue'),
          },
          props: {
            default: (route) => ({ current: 'tag', param: route.params.tag }),
            createnote: (route) => ({ id: route.params.id }),
            action: (route) => ({ id: route.params.id }),
          },
        },
        {
          path: 'search/:name?/:id?',
          name: 'search',
          components: {
            default: () => import('../components/notes/NotesPart.vue'),
            createnote: () => import('../components/notes/CreateNoteComponent.vue'),
            action: () => import('../components/shared/NotesMoveList.vue'),
          },
          props: {
            default: (route) => ({ query: route.query.q, current: 'search' }),
            createnote: (route) => ({ id: route.params.id }),
            action: (route) => ({ id: route.params.id }),
          },
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
