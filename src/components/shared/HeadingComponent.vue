<template>
  <slot name="addition"></slot>
  <h1 class="notesHeading"><slot></slot></h1>
</template>

<style lang="scss" scoped>
.notesHeading {
  font-family: getInter(Bold);
  font-size: 24px;
  line-height: 1.2;
  letter-spacing: -0.5px;
  color: $txt-cl-h;

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
</style>
