<template>
  <div class="notesWrapper">
    <HeadingComponent>{{ notesContent[current].title }}</HeadingComponent>

    <NotesInformBlock :current="current">
      <template #noteDescribBlock v-if="notesContent[current].description.show">
        {{ notesContent[current].description.content }}
      </template>
      <template #noteButton>
        <el-button class="createNoteButton" tag="router-link" to="/create-note">
          + Create New Note
        </el-button>
      </template>
      <template #noteInformBlock
        >{{ depensOnLinkContent }}
        <router-link v-if="notesContent[current].info.link" class="linkCreate" to="/create-note"
          >create a new note.</router-link
        >
      </template>
    </NotesInformBlock>
    <el-button class="mobCreateNote" tag="router-link" to="/create-note"><Plus /></el-button>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import HeadingComponent from '../shared/HeadingComponent.vue';
import type { HomeRoutes } from '../types';
import NotesInformBlock from './NotesInformBlock.vue';
import Plus from '@/assets/images/icon-plus.svg';
import { notesContent } from '../staticContent';

const depensOnLinkContent = computed<string>(() => {
  const info = notesContent[current].info;
  return info.link ? info.content.split(',')[0] + ', or' : info.content;
});
const { current } = defineProps<{ current: HomeRoutes }>();

watch(
  () => current,
  (n) => console.log(n),
);
</script>

<style lang="scss" scoped>
.mobCreateNote {
  width: 48px;
  height: 48px;
  padding: 8px;
  fill: $btn-cl-base;
  background-color: $btn-bg-base;
  border-radius: 999px;
  box-shadow: 0 7px 11px 0 rgba(202, 207, 216, 0.7);
  margin-top: auto;
  align-self: end;

  &:focus-visible {
    outline-offset: 2px;
    outline-color: $focus-cl-btn;
  }

  @include mq(medium) {
    width: 64px;
    height: 64px;
  }

  @include mq(large) {
    display: none;
  }
}

.notesWrapper {
  height: 100%;
  display: flex;
  flex-direction: column;

  @include mq(large) {
    min-width: 290px;
    max-width: 21%;
    padding: 20px 16px 20px 32px;
    border-right: 1px solid $bor-cl-base;
    height: auto;
  }

  .createNoteButton {
    display: none;
    font-family: getInter(Medium);
    padding: 12px 16px;
    border-radius: 8px;
    line-height: 1.2;
    letter-spacing: -0.2px;
    text-decoration: none;
    height: auto;
    color: $btn-cl-base;
    background-color: $btn-bg-base;
    margin-bottom: 16px;
    transition: background-color 250ms;

    &:hover {
      background-color: $hover-btn-cl;
    }

    &:focus-visible {
      outline-offset: 2px;
      outline-color: $focus-cl-btn;
    }
    @include mq(large) {
      display: block;
    }
  }

  .linkCreate {
    color: currentColor;
    text-decoration: underline;
    @include mq(large) {
      display: inline-block;
    }
  }
}
</style>
