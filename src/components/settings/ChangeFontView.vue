<template>
  <RadioSharedStyle>
    <el-form-item label="Font theme">
      <p class="radioDescription">Choose your font theme:</p>
      <el-radio-group v-model="font">
        <el-radio
          border
          value="sans-serif"
          tabindex="1"
          @keydown.enter="() => pickBtnByKey('sans-serif')"
          @keydown.space="() => pickBtnByKey('sans-serif')"
          ><div class="radioAditionalContent">
            <SansSerifIco />
            <div class="textRadioContent">
              <b>Sans-serif</b>
              <p>Clean and modern, easy to read.</p>
            </div>
          </div></el-radio
        >
        <el-radio
          border
          value="serif"
          tabindex="1"
          @keydown.enter="() => pickBtnByKey('serif')"
          @keydown.space="() => pickBtnByKey('serif')"
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
          value="monospace"
          tabindex="1"
          @keydown.enter="() => pickBtnByKey('monospace')"
          @keydown.space="() => pickBtnByKey('monospace')"
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
      <el-button>Apply Changes</el-button>
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

const font = ref<FontChoise>('sans-serif');

const pickBtnByKey = (val: FontChoise) => (font.value = val);
</script>
