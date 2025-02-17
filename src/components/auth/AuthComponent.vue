<template>
  <LogoComponent class="authLogo" />
  <TextBlock>
    <template #h-text>{{ currentContent[currentRoute]['h-text'] }}</template>
    <template #p-description>{{ currentContent[currentRoute]['p-description'] }}</template>
  </TextBlock>
  <AuthFormComponent :currentRoute="currentRoute" />
  <GoogleBlock v-if="showGoogleBlock" :tip="currentContent[currentRoute]['tip-content']">
    <template #link>
      <RouterLink :to="{ name: nextAuthPage ? 'login' : 'signup' }">
        {{ nextAuthPage ? 'Login' : 'Sign up' }}</RouterLink
      >
    </template>
  </GoogleBlock>
</template>

<script lang="ts" setup>
import AuthFormComponent from './AuthFormComponent.vue';
import LogoComponent from '@/components/shared/LogoComponent.vue';
import TextBlock from '../shared/TextBlock.vue';
import { useRoute } from 'vue-router';
import { computed, ref, watch, type Component } from 'vue';
import type { AuthRoutes } from './types';
import { currentContent } from './helpers';

const route = useRoute();
const currentRoute = ref<AuthRoutes>((route?.name as AuthRoutes) ?? 'login');
const nextAuthPage = computed<boolean>(() => currentRoute.value === 'signup');
const showGoogleBlock = computed<boolean>(
  () => currentRoute.value === 'login' || currentRoute.value === 'signup',
);

watch(
  () => route.name as AuthRoutes | undefined,
  (newName) => {
    const trackedRoutes: AuthRoutes[] = ['login', 'signup', 'forgot'];

    if (newName && trackedRoutes.includes(newName)) {
      currentRoute.value = newName;
    }
  },
);
</script>

<style lang="scss" scoped>
.authLogo {
  justify-self: center;
  fill: var(--txt-cl-h, $txt-cl-h);
}
</style>
