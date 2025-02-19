import { useUserStore } from "@/stores/userStore";
import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationNormalizedLoadedGeneric,
} from "vue-router";

export const paramCreateControl = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  if (from.params?.create && !to.params?.create)
    return { name: to.name, path: to.path, params: { create: "create" } };
};

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLogin;
  if (from.fullPath.includes("oobCode")) return next();
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: "login" });
    return;
  }

  if (!to.meta.requiresAuth && isLoggedIn) {
    next({ name: "home" });
    return;
  } else next();
};
