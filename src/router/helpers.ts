import { userNotesStore } from '@/stores/userNotesStore';
import { useUserStore } from '@/stores/userStore';
import type { RouteLocationNormalized } from 'vue-router';

export const paramCreateControl = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  if (from.params?.create && !to.params?.create)
    return { name: to.name, path: to.path, params: { create: 'create' } };
};
