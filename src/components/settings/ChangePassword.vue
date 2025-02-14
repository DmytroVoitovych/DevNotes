<template>
  <div class="settingPasswordContainer">
    <HeadingComponent>Change Password</HeadingComponent>

    <div class="inputBox">
      <el-form-item
        label="Old Password"
        prop="oldPass"
        :label-position="itemLabelPosition"
        @click="confirmMeth.showPassword"
      >
        <el-input v-model="oldPass" type="password" autocomplete="off" show-password required>
          <template #suffix v-if="oldPass">
            <component :is="confirmComput.currentComponent"></component>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        class="formLabel"
        label="New Password"
        prop="pass"
        :label-position="itemLabelPosition"
        @click="methods.showPassword"
        :rules="formPasswordRules"
      >
        <el-input
          v-model="formLabelAlignItems.pass.value"
          show-password
          type="password"
          min="8"
          required
          autocomplete="off"
        >
          <template #suffix v-if="formLabelAlignItems.pass.value">
            <component :is="computes.currentComponent"></component>
          </template>
        </el-input>
        <p v-if="!formLabelAlignItems.pass.value" class="info">At least 8 characters</p>
      </el-form-item>
      <el-form-item
        label="Confirm New Password"
        prop="checkPass"
        :label-position="itemLabelPosition"
        @click="confirmMeth.showPassword"
        :rules="[
          {
            validator: compareTwoPass,
            min: 8,
            trigger: 'blur',
            message: `Two inputs don't match!`,
          },
        ]"
      >
        <el-input
          :disabled="inputDisabled"
          v-model="formLabelAlignItems.checkPass.value"
          type="password"
          autocomplete="off"
          show-password
          required
        >
          <template #suffix v-if="formLabelAlignItems.checkPass.value">
            <component :is="confirmComput.currentComponent"></component>
          </template>
        </el-input>
      </el-form-item>
    </div>

    <el-button v-loading="loading" :disabled="btnDisabled">Save Password</el-button>
  </div>
</template>

<script lang="ts" setup>
import type { FormItemRule } from 'element-plus';
import { useCustomFormHandler, useElementsUiForm } from '../auth/formHandler';
import { formPasswordRules } from '../auth/helpers';
import { computed, ref } from 'vue';
import HeadingComponent from '../shared/HeadingComponent.vue';

const { methods: confirmMeth, computes: confirmComput } = useCustomFormHandler();
const { methods, computes, loading } = useCustomFormHandler();
const { formLabelAlignItems, itemLabelPosition } = useElementsUiForm();

const oldPass = ref('');

const inputDisabled = computed(() => formLabelAlignItems?.pass?.value?.length < 8);
const btnDisabled = computed(
  () =>
    formLabelAlignItems?.checkPass?.value &&
    formLabelAlignItems?.checkPass?.value !== formLabelAlignItems?.pass?.value,
);

const compareTwoPass = (rule: FormItemRule, value: string, callback: (error?: Error) => void) => {
  if (value !== formLabelAlignItems.pass.value) {
    callback(new Error(rule.message as string));
  } else {
    callback();
  }
};
</script>
<style lang="scss" scoped>
.settingPasswordContainer {
  display: grid;
  row-gap: 20px;
  @include mq(large) {
    max-width: 528px;
  }

  :deep(.el-button) {
    font-family: getInter(Medium);
    line-height: 1.2;
    letter-spacing: -0.2px;
    padding: 12px 16px;
    border-radius: 8px;
    background-color: $btn-bg-base;
    color: $btn-cl-base;
    height: auto;
    margin-left: auto;
    transition: background-color 250ms;

    @media (hover: hover) {
      &:hover {
        background-color: $hover-btn-cl;
      }
    }
  }

  .inputBox {
    display: grid;
    row-gap: 24px;
  }

  :deep(.el-form-item) {
    margin-bottom: 0;
  }

  :deep(.el-form-item) .el-form-item {
    position: relative;
    margin-bottom: 0;

    &__label {
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

  :deep(.el-input__wrapper) {
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
}
</style>
