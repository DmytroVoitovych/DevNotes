<template>
  <el-container class="baseContainer">
    <slot></slot>
  </el-container>
</template>
<style lang="scss" scoped>
.baseContainer {
  display: block;
  margin: 0 auto;
  padding: 10px 16px;

  @include mq(small) {
    max-width: 480px;
  }
  @include mq(medium) {
    max-width: 522px;
  }
  @include mq(large) {
    max-width: 540px;
  }
}
</style>
