<template>
  <div class="textBlockAuth">
    <h1><slot name="h-text"></slot></h1>
    <p><slot name="p-description"></slot></p>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.textBlockAuth {
  text-align: center;

  h1 {
    margin-bottom: 8px;
    font-family: var(--family-dynamic);
    font-weight: bold;
    font-size: 24px;
    line-height: 1.2;
    letter-spacing: -0.5px;
    color: var(--txt-cl-h, $txt-cl-h);
  }

  p {
    font-family: var(--family-dynamic);
    font-weight: normal;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: -0.2px;
    color: var(--txt-cl-description, $txt-cl-description);
  }
}
</style>
