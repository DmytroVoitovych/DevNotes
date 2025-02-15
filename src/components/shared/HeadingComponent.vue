<template>
  <slot name="addition"></slot>
  <h1 v-if="!param && !query" class="notesHeading" :class="$attrs.class"><slot></slot></h1>
  <h1 v-else class="notesHeading">
    <span class="headingWithParam"><slot></slot></span> {{ param ?? query }}
  </h1>
</template>

<script lang="ts" setup>
const { param, query } = defineProps<{
  param?: string;
  query?: string;
}>();
</script>

<style lang="scss" scoped>
.notesHeading {
  font-family: getInter(Bold);
  font-size: 24px;
  line-height: 1.2;
  letter-spacing: -0.5px;
  color: var(--txt-cl-h, $txt-cl-h);

  .headingWithParam {
    color: var(--txt-cl-description, $txt-cl-description);
  }

  &:has(+ .noteInformBlock) {
    margin-bottom: 16px;
  }

  &:has(~ .noteInformBlock) {
    margin-bottom: 16px;

    @include mq(large) {
      display: none;
    }
  }
}
.settingHeading {
  @include mq(large) {
    display: none;
  }
}
</style>
