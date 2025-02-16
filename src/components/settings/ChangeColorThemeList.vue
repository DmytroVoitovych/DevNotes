<template>
  <RadioSharedStyle>
    <el-form-item label="Color theme">
      <p class="radioDescription">Choose your color theme:</p>
      <el-radio-group v-model="theme">
        <el-radio
          border
          value="light"
          tabindex="1"
          @keydown.enter="() => pickBtnByKey('light')"
          @keydown.space="() => pickBtnByKey('light')"
          ><div class="radioAditionalContent">
            <SunIco />
            <div class="textRadioContent">
              <b>Light Mode</b>
              <p>Pick a clean and classic light theme</p>
            </div>
          </div></el-radio
        >
        <el-radio
          border
          value="dark"
          tabindex="1"
          @keydown.enter="() => pickBtnByKey('dark')"
          @keydown.space="() => pickBtnByKey('dark')"
          ><div class="radioAditionalContent fill">
            <DarkIco />
            <div class="textRadioContent">
              <b>Dark Mode</b>
              <p>Select a sleek and modern dark theme</p>
            </div>
          </div></el-radio
        >
        <el-radio
          border
          value="system"
          tabindex="1"
          @keydown.enter="() => pickBtnByKey('system')"
          @keydown.space="() => pickBtnByKey('system')"
          ><div class="radioAditionalContent fill">
            <SystemIco />
            <div class="textRadioContent">
              <b>System</b>
              <p>Adapts to your device’s theme</p>
            </div>
          </div></el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button native-type="button" @click="() => setTheme(theme)">Apply Changes</el-button>
    </el-form-item>
  </RadioSharedStyle>
</template>
<script lang="ts" setup>
import SunIco from '@/assets/images/icon-sun.svg';
import DarkIco from '@/assets/images/icon-moon.svg';
import SystemIco from '@/assets/images/icon-system-theme.svg';
import { computed, onMounted, ref } from 'vue';
import type { ThemeChoise } from './type';
import RadioSharedStyle from './RadioSharedStyle.vue';

const isThemeInLocalStorage = computed<null | string>(() => window?.localStorage?.getItem('theme'));
const theme = ref<ThemeChoise>((isThemeInLocalStorage.value as ThemeChoise) ?? 'system');

const pickBtnByKey = (val: ThemeChoise) => (theme.value = val);

const setTheme = (themeType: ThemeChoise) => {
  if (themeType === 'dark' || themeType === 'light') {
    window.localStorage.setItem('theme', themeType);
    document.documentElement.className = themeType;
    return;
  } else {
    if (window?.localStorage?.getItem('theme') !== null) {
      window.localStorage.removeItem('theme');
    }
    document.documentElement.removeAttribute('class');
    return;
  }
};
</script>
