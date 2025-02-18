<template>
  <ContainerBase>
    <div class="authWrapper">
      <section class="authSection">
        <AuthComponent />
      </section>
    </div>
  </ContainerBase>
</template>

<script setup lang="ts">
import AuthComponent from '@/components/auth/AuthComponent.vue';
import { useUserStore } from '@/stores/userStore';
import { onBeforeRouteUpdate } from 'vue-router';

const userStore = useUserStore();
</script>

<style lang="scss">
.authWrapper {
  align-content: center;
  min-height: 100%;
}

.authSection {
  padding: 40px 16px;
  border-radius: 12px;
  background-color: var(--bg-cl-base, $bg-cl-base);
  border: 1px solid var(--bor-cl-base, $bor-cl-base);
  display: grid;
  row-gap: 16px;
  box-shadow: $shadow-auth-block;

  @include mq(medium) {
    padding: 48px 32px;
  }

  @include mq(large) {
    & {
      padding: 48px 48px;
    }
  }
}
</style>
