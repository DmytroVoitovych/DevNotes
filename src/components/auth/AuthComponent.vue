<template>
  <LogoComponent class="authLogo" />
  <TextBlock>
    <template #h-text>Welcome to Note</template>
    <template #p-description>Please log in to continue</template>
  </TextBlock>
  <AuthFormComponent> </AuthFormComponent>
  <GoogleBlock
    ><template #link>
      <RouterLink :to="{ name: 'signup' }">Sign Up</RouterLink>
    </template></GoogleBlock
  >
</template>

<script lang="ts" setup>
import AuthFormComponent from './AuthFormComponent.vue'
import LogoComponent from '@/components/shared/LogoComponent.vue'
import TextBlock from '../shared/TextBlock.vue'
</script>

<style lang="scss" scoped>
.authLogo {
  justify-self: center;
}
</style>
