<template>
  <LogoComponent class="logoShow" />
  <DesktopHeader />
</template>

<script setup lang="ts">
import LogoComponent from '../shared/LogoComponent.vue';
import DesktopHeader from './DesktopHeader.vue';
</script>

<style lang="scss" scoped>
.logoShow {
  display: block;
  @include mq(large) {
    display: none;
  }
}
</style>
