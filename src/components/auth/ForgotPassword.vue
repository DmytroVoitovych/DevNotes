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
  <el-form-item>
    <el-input type="submit" value="Send Reset Link" />
  </el-form-item>
</template>

<script lang="ts" setup>
import { useElementsUiForm } from './formHandler';
import { formEmailRules } from './helpers';

const { formLabelAlignItems, itemLabelPosition } = useElementsUiForm();
</script>
