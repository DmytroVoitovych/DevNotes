<template>
  <RadioSharedStyle>
    <el-form-item label="Font theme">
      <p class="radioDescription">Choose your font theme:</p>
      <el-radio-group v-model="font">
        <el-radio
          border
          value="Inter"
          tabindex="1"
          @keydown.enter="() => pickBtnByKey('Inter')"
          @keydown.space="() => pickBtnByKey('Inter')"
          ><div class="radioAditionalContent fill">
            <SansSerifIco />
            <div class="textRadioContent">
              <b>Sans-serif</b>
              <p>Clean and modern, easy to read.</p>
            </div>
          </div></el-radio
        >
        <el-radio
          border
          value="NotoSerif"
          tabindex="1"
          @keydown.enter="() => pickBtnByKey('NotoSerif')"
          @keydown.space="() => pickBtnByKey('NotoSerif')"
          ><div class="radioAditionalContent fill">
            <SerifIco />
            <div class="textRadioContent">
              <b>Serif</b>
              <p>Classic and elegant for a timeless feel.</p>
            </div>
          </div></el-radio
        >
        <el-radio
          border
          value="SourceCodePro"
          tabindex="1"
          @keydown.enter="() => pickBtnByKey('SourceCodePro')"
          @keydown.space="() => pickBtnByKey('SourceCodePro')"
          ><div class="radioAditionalContent fill">
            <MonospaceIco />
            <div class="textRadioContent">
              <b>Monospace</b>
              <p>Code-like, great for a technical vibe.</p>
            </div>
          </div></el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button native-type="button" @click="() => setFont(font)">Apply Changes</el-button>
    </el-form-item>
  </RadioSharedStyle>
</template>
<script lang="ts" setup>
import SansSerifIco from '@/assets/images/icon-font-sans-serif.svg';
import SerifIco from '@/assets/images/icon-font-serif.svg';
import MonospaceIco from '@/assets/images/icon-font-monospace.svg';
import { ref } from 'vue';
import type { FontChoise } from './type';
import RadioSharedStyle from './RadioSharedStyle.vue';

const font = ref<FontChoise>((window?.localStorage?.getItem('font') as FontChoise) || 'Inter');

const setFont = (fontFamily: FontChoise) => {
  window.localStorage.setItem('font', fontFamily);
  document.documentElement.style.setProperty('--family-dynamic', fontFamily);
};

const pickBtnByKey = (val: FontChoise) => (font.value = val);
</script>
