<template>
  <el-form :model="form" label-width="auto">
    <component :is="conditionalList"></component>
  </el-form>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import ChangeColorThemeList from './ChangeColorThemeList.vue';
import ChangeFontView from './ChangeFontView.vue';
import ChangePassword from './ChangePassword.vue';
import type { SettingParams } from './type';

const { param } = defineProps<{
  param: SettingParams;
}>();

const conditionalList = computed(() => {
  switch (param) {
    case 'change-password':
      return ChangePassword;
    case 'font-theme':
      return ChangeFontView;

    default:
      return ChangeColorThemeList;
  }
});
</script>
