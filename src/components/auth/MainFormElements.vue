<template>
  <el-form-item
    class="formLabel"
    label="Email Adress"
    prop="email"
    :label-position="itemLabelPosition"
    :rules="formEmailRules"
  >
    <el-input
      placeholder="email@example.com"
      v-model="formLabelAlignItems.email.value"
      type="email"
      required
    />
  </el-form-item>
  <el-form-item
    class="formLabel"
    label="Password"
    prop="pass"
    :label-position="itemLabelPosition"
    @click="methods.showPassword"
    :rules="formPasswordRules"
  >
    <slot name="forgot"></slot>
    <el-input
      v-model="formLabelAlignItems.pass.value"
      show-password
      type="password"
      min="8"
      required
    >
      <template #suffix v-if="formLabelAlignItems.pass.value">
        <component :is="computes.currentComponent"></component>
      </template>
    </el-input>
    <p v-if="!formLabelAlignItems.pass.value && !$slots.forgot" class="info">
      At least 8 characters
    </p>
  </el-form-item>
  <el-form-item>
    <el-input type="submit" :value="submitValue" />
  </el-form-item>
</template>
<script lang="ts" setup>
import { onUpdated, ref } from 'vue';
import { useCustomFormHandler, useElementsUiForm } from './formHandler';

const { methods, computes } = useCustomFormHandler();
const { formLabelAlignItems, itemLabelPosition } = useElementsUiForm();
import { useSlots } from 'vue';
import { formEmailRules, formPasswordRules } from './helpers';

const slots = useSlots();
const submitValue = ref<'Login' | 'Sign Up'>('Login');

onUpdated(() => {
  submitValue.value = slots.forgot ? 'Login' : 'Sign Up';
});
</script>
<style lang="scss">
.el-form-item {
  & .info {
    color: $txt-cl-description;
    font-family: getInter();
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    line-height: 1.4;

    &::before {
      content: '';
      display: block;
      width: 12px;
      height: 12px;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url(@/assets/images/icon-info.svg);
      filter: brightness(0) saturate(100%) invert(39%) sepia(9%) saturate(1413%) hue-rotate(185deg)
        brightness(91%) contrast(86%);
    }

    &:has(+ .el-form-item__error) {
      display: none;
    }
  }
}
</style>
