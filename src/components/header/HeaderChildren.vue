<template>
  <LogoComponent class="logoShow" />
  <DesktopHeader>
    <template #heading>{{ notesContent[current].title }}</template>
  </DesktopHeader>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import LogoComponent from '../shared/LogoComponent.vue';
import { notesContent } from '../staticContent';
import type { HomeRoutes } from '../types';
import DesktopHeader from './DesktopHeader.vue';

const { current } = defineProps<{
  current: HomeRoutes;
}>();
</script>

<style lang="scss" scoped>
.logoShow {
  display: block;
  @include mq(large) {
    display: none;
  }
}
</style>
