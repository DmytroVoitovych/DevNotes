<template>
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
  <el-form-item>
    <el-input type="submit" value="Reset Password" v-loading="loading" :disabled="btnDisabled" />
  </el-form-item>
</template>

<script lang="ts" setup>
import type { FormItemRule } from "element-plus";
import { useCustomFormHandler, useElementsUiForm } from "./formHandler";
import { formPasswordRules } from "./helpers";
import { computed } from "vue";

const { methods: confirmMeth, computes: confirmComput } = useCustomFormHandler();
const { methods, computes, loading } = useCustomFormHandler();
const { formLabelAlignItems, itemLabelPosition } = useElementsUiForm();

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
