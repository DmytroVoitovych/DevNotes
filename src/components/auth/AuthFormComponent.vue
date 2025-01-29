<template>
  <el-form
    @submit.prevent="() => methods.submitForm(currentRoute, formLabelAlign)"
    :label-position="labelPosition"
    label-width="auto"
    :model="formLabelAlign"
    style="max-width: auto"
    class="authForm"
  >
    <component :is="currentContent[currentRoute]['component']">
      <template #forgot v-if="isLoginPage">
        <RouterLink :to="{ name: 'forgot' }" class="linkForgot">Forgot</RouterLink>
      </template>
    </component>
  </el-form>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useCustomFormHandler, useElementsUiForm } from './formHandler';
import { currentContent } from './helpers';
import { type AuthRoutes } from './types';

const { methods } = useCustomFormHandler();
const { formLabelAlign, labelPosition } = useElementsUiForm();

const { currentRoute = 'login' } = defineProps<{ currentRoute: AuthRoutes }>();
const isLoginPage = computed(() => currentRoute === 'login');
</script>
<style lang="scss">
.el-form {
  display: grid;
  row-gap: 16px;

  &:has(.el-form-item__error) {
    row-gap: 20px;
    transition: row-gap 250ms;
  }
}

.el-form-item {
  position: relative;
  margin-bottom: 0;

  &--label-top &__label {
    font-family: getInter('Medium');
    line-height: 1.2;
    letter-spacing: -0.2px;
    color: $txt-cl-h;
    padding: 0;
    margin-bottom: 6px;
  }

  &__error {
    color: $error-cl;
    font-family: getInter();
    display: flex;
    gap: 8px;

    &::before {
      content: '';
      display: block;
      width: 12px;
      height: 12px;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url(@/assets/images/icon-info.svg);
      filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%)
        contrast(97%);
    }
  }
}

.el-input__wrapper {
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px $bor-cl-input inset;
  cursor: pointer;

  &.is-focus {
    box-shadow: 0 0 0 1px $focus-cl-base inset;
    outline: 2px solid $bor-cl-input;
    outline-offset: 3px;
  }

  & .el-input__inner {
    font-family: getInter();
    color: $txt-cl-input;
    cursor: pointer;
  }

  & .el-input__password {
    position: absolute;
    opacity: 0;
  }

  &:has([type='submit']) {
    box-shadow: none;
    background-color: $btn-bg-base;
    transition: background-color 250ms;

    & input {
      font-family: getInter('SemiBold');
      font-size: 16px;
      line-height: 1.2;
      letter-spacing: -0.3px;
      color: $btn-cl-base;
    }

    @media (hover: hover) {
      &:hover {
        background-color: $hover-btn-cl;
      }
    }
  }
}
.el-form-item__content:has(.linkForgot) {
  display: contents;
}

.linkForgot {
  float: right;
  font-family: getInter();
  font-size: 12px;
  line-height: 1.4;
  text-decoration-skip-ink: none;
  color: $link-cl-grey;
  transition: color 250ms;

  &:hover {
    color: $hover-link-cl;
  }

  &:visited {
    font-family: getInter();
    font-size: 12px;
    line-height: 1.4;
    text-decoration-skip-ink: none;
  }
}
</style>
