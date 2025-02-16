<template>
  <div class="googleBlock">
    <el-divider />
    <p class="logWith">Or log in with:</p>
    <el-button type="primary" @click="logIn"> Google<GoogleIco /></el-button>
    <el-divider />
    <p class="googleTip">{{ tip }} <slot name="link"></slot></p>
  </div>
</template>

<script setup lang="ts">
import GoogleIco from '@/assets/images/icon-google.svg';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';

const userStore = useUserStore();
const loading = ref<boolean>(false);

const logIn = (): void => {
  loading.value = true;
  userStore.loginUserByGoogle().finally(() => (loading.value = false));
  return;
};

const { tip = '' } = defineProps<{
  tip: string;
}>();
</script>
<style lang="scss">
.googleBlock {
  text-align: center;

  & .el-divider--horizontal {
    border-top: 1px solid var(--bor-cl-base, $bor-cl-base);
  }

  & > .el-divider:first-child {
    margin-top: 0;
  }

  & > .el-divider:last-of-type {
    &.el-divider--horizontal {
      margin-bottom: 16px;
    }
  }

  .logWith {
    font-family: var(--family-dynamic);
    font-weight: normal;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: -0.2px;
    color: var(--txt-cl-description, $txt-cl-description);
    margin-bottom: 16px;
  }

  .el-button {
    padding: 12px 16px;
    border-radius: 16px;
    background-color: transparent;
    border: 1px solid var(--bor-cl-input, $bor-cl-input);
    height: auto;
    width: 100%;

    & > span {
      gap: 16px;
      flex-direction: row-reverse;
      font-family: getInter('Medium');
      font-size: 16px;
      line-height: 1;
      letter-spacing: 0.5px;
      color: var(--txt-cl-h, $txt-cl-h);
    }
  }

  .googleTip {
    font-family: var(--family-dynamic);
    font-weight: normal;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: -0.2px;
    color: var(--txt-cl-description, $txt-cl-description);

    & > a {
      color: var(--txt-cl-h, $txt-cl-h);
      text-decoration: none;
      transition: color 250ms;
      @media (hover: hover) {
        &:hover {
          color: $hover-link-cl;
        }
      }
    }
  }
}
</style>
