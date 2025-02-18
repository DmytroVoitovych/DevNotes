<template>
  <div class="notesWrapper">
    <el-button class="backCreateLink" text @click="router.back()" v-show="current === 'tag'">
      <LeftArrowIco width="18" height="18" /> Go back</el-button
    >
    <HeadingComponent :param>{{ notesContent[current].title }}</HeadingComponent>
    <SearchComponent v-show="current === 'search'" />

    <NotesInformBlock :current="current" :paramCreate="isParamCreateActive">
      <template #noteDescribBlock v-if="notesContent[current].description.show">
        {{ conditionalDescription }}
      </template>
      <template #noteButton>
        <el-button
          class="createNoteButton"
          tag="router-link"
          :to="{ params: { create: 'create' }, name: 'notes' }"
        >
          + Create New Note
        </el-button>
      </template>
      <template #noteInformBlock
        >{{ depensOnLinkContent }}
        <router-link
          v-if="notesContent[current].info.link"
          class="linkCreate"
          :to="{ params: { create: 'create' }, name: 'notes' }"
          >create a new note.</router-link
        >
      </template>
    </NotesInformBlock>
    <NoteListSkeleton />
    <ListNotesComponent
      v-if="!notesStore.isNotesListEmpty"
      :paramCreate="isParamCreateActive"
      :param
      :current
    />

    <el-button
      class="mobCreateNote"
      tag="router-link"
      :to="{ params: { create: 'create' }, name: 'notes' }"
      ><Plus
    /></el-button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import HeadingComponent from '../shared/HeadingComponent.vue';
import type { HomeRoutes } from '../types';
import NotesInformBlock from './NotesInformBlock.vue';
import LeftArrowIco from '@/assets/images/icon-arrow-left.svg';
import Plus from '@/assets/images/icon-plus.svg';
import { notesContent } from '../staticContent';
import { useRoute, useRouter } from 'vue-router';
import ListNotesComponent from './ListNotesComponent.vue';
import { userNotesStore } from '@/stores/userNotesStore';
import SearchComponent from '../shared/SearchComponent.vue';
import NoteListSkeleton from '../skeletons/NoteListSkeleton.vue';

const route = useRoute();
const router = useRouter();
const notesStore = userNotesStore();
const { current, param = '' } = defineProps<{ current: HomeRoutes; param?: string }>();

const isParamCreateActive = ref<boolean>(!!route.params?.create);

const depensOnLinkContent = computed<string>(() => {
  const info = notesContent[current].info;
  return info.link ? info.content.split(',')[0] + ', or' : info.content;
});

const conditionalDescription = computed<string>(() =>
  notesStore.searchQuery || param
    ? notesContent[current].description.content.replace(
        '[]',
        `"${param || notesStore.searchQuery}"`,
      )
    : notesContent[current].description.content,
);

watch(
  () => route.params,
  (param) => {
    isParamCreateActive.value = !!param.create;
  },
);
</script>

<style lang="scss" scoped>
.mobCreateNote {
  position: sticky;
  bottom: 0;
  width: 48px;
  height: 48px;
  padding: 8px;
  fill: $btn-cl-base;
  background-color: $btn-bg-base;
  border-radius: 999px;
  box-shadow: var(--mob-btn-shadow, $mob-btn-shadow);
  margin-top: auto;
  align-self: end;

  &:focus-visible {
    outline-offset: 2px;
    outline-color: $focus-cl-btn;
  }

  @include mq(medium) {
    width: 64px;
    height: 64px;
    border-radius: 50%;
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
    overflow-y: auto;
    .searchInput {
      display: none;
    }
  }

  :deep(.el-button.is-text.backCreateLink) {
    display: flex;
    justify-content: flex-start;
    padding: 0;
    margin-bottom: 16px;
    height: auto;

    @include mq(large) {
      display: none;
    }

    span {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: var(--family-dynamic);
      font-weight: normal;
      line-height: 1.3;
      letter-spacing: -0.2px;
      fill: var(--link-cl-grey, $link-cl-grey);
      color: var(--link-cl-grey, $link-cl-grey);
    }
  }

  &:has(~ form) {
    display: none;
    @include mq(large) {
      display: flex;
    }
  }

  @include mq(large) {
    min-width: 290px;
    max-width: 21%;
    padding: 20px 16px 20px 32px;
    border-right: 1px solid var(--bor-cl-base, $bor-cl-base);
    height: auto;
  }

  .createNoteButton {
    display: none;
    font-family: var(--family-dynamic);
    font-weight: 500;
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
      border: none;
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
