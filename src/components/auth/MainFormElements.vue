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
      autocomplete="on"
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
    <el-input type="submit" :value="submitValue" v-loading="loading" />
  </el-form-item>
</template>
<script lang="ts" setup>
import { computed, onUpdated, ref, type SetupContext } from "vue";
import { useCustomFormHandler, useElementsUiForm } from "./formHandler";
import { useSlots } from "vue";
import { formEmailRules, formPasswordRules } from "./helpers";

const { methods, computes, loading } = useCustomFormHandler();
const { formLabelAlignItems, itemLabelPosition } = useElementsUiForm();

const slots: SetupContext["slots"] = useSlots();
const mountedState = computed<"Login" | "Sign Up">(() => (slots.forgot ? "Login" : "Sign Up"));
const submitValue = ref<"Login" | "Sign Up">(mountedState.value);

onUpdated(() => {
  submitValue.value = slots.forgot ? "Login" : "Sign Up";
});
</script>
<style lang="scss">
.el-form-item {
  margin-bottom: 0;

  & .info {
    color: var(--txt-cl-description, $txt-cl-description);
    font-family: var(--family-dynamic);
    font-weight: normal;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    line-height: 1.4;

    &::before {
      content: "";
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
