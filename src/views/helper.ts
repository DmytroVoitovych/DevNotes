import type { HomeRoutes } from "@/components/types";
import type { Router } from "vue-router";

export const navigateByResizeScreen = (router: Router, currentRoute: HomeRoutes) => {
  const isMobile = window.innerWidth < 1440;

  if (currentRoute === "tags" && !isMobile) {
    router.push("/");
  }
};
