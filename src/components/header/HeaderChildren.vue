<template>
  <LogoComponent class="logoShow" />
  <DesktopHeader>
    <template #heading>{{
      current === "search" && notesStore.searchQuery
        ? "Showing results for: "
        : notesContent[current].title
    }}</template>
  </DesktopHeader>
</template>

<script setup lang="ts">
import LogoComponent from "../shared/LogoComponent.vue";
import { notesContent } from "../staticContent";
import type { HomeRoutes } from "../types";
import DesktopHeader from "./DesktopHeader.vue";
import { userNotesStore } from "@/stores/userNotesStore";

const notesStore = userNotesStore();

const { current } = defineProps<{
  current: HomeRoutes;
}>();
</script>

<style lang="scss" scoped>
.logoShow {
  display: block;
  fill: var(--txt-cl-h, $txt-cl-h);
  @include mq(large) {
    display: none;
  }
}
</style>
