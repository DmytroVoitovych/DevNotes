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
    font-family: getInter('Bold');
    font-size: 24px;
    line-height: 1.2;
    letter-spacing: -0.5px;
    color: $txt-cl-h;
  }

  p {
    font-family: getInter();
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: -0.2px;
    color: $txt-cl-description;
  }
}
</style>
