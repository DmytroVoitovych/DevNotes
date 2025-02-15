<template>
  <slot name="noteButton"></slot>
  <p class="noteDescribBlock" v-show="showDescription">
    <slot name="noteDescribBlock"></slot>
  </p>
  <p class="noteInformBlock" v-show="!paramCreate && !currentNotes">
    <slot name="noteInformBlock"></slot>
  </p>
  <el-divider v-if="current === 'notes'" />
</template>
<script lang="ts" setup>
import { userNotesStore } from '@/stores/userNotesStore';
import type { HomeRoutes } from '../types';
import { computed } from 'vue';
const notesStore = userNotesStore();
const { current, paramCreate } = defineProps<{ current: HomeRoutes; paramCreate: boolean }>();

const showDescription = computed<boolean>(() => {
  if (current !== 'notes' && current !== 'search') return true;
  return !!notesStore.searchQuery && current === 'search';
});

const currentNotes = computed<number>(() => {
  switch (current) {
    case 'home':
    case 'notes':
      return notesStore.getAllNotes.length;
    case 'archivednotes':
      return notesStore.getArchivedNotes.length;
    case 'search':
      return notesStore.getNotesByQuery.length;
    default:
      return notesStore.getAllNotes.length;
  }
});
</script>
<style lang="scss" scoped>
.noteDescribBlock {
  font-family: getInter();
  font-size: 14px;
  margin-bottom: 16px;
  line-height: 1.3;
  letter-spacing: -0.2px;
  color: var(
    --txt-cl-description-notes,
    var(--txt-cl-description-notes, $txt-cl-description-notes)
  );
}
.noteInformBlock {
  font-family: getInter();
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: -0.2px;
  color: var(--txt-cl-h, $txt-cl-h);
  background-color: var(--bg-cl-header, $bg-cl-header);
  padding: 8px;
  border: 1px solid var(--bor-cl-base, $bor-cl-base);
  border-radius: 8px;

  @include mq(medium) {
    & + .el-divider {
      display: block;

      @include mq(large) {
        display: none;
      }
    }
  }

  &:has(+ .el-divider) {
    margin-bottom: 16px;

    @include mq(large) {
      margin-bottom: 0;
    }
  }
}
.el-divider {
  display: none;
  margin: 0;
  border-color: var(--bor-cl-base, $bor-cl-base);

  /* :not(& + .notesList) {
    display: none;
  } */
}
</style>
