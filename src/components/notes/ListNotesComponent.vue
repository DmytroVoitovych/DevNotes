<template>
  <p v-if="paramCreate" class="notesUntitled">Untitled Note</p>

  <ul class="notesListContainer">
    <li v-for="note of currentNotes" :key="note.id">
      <RouterLink
        class="notesList"
        :to="{
          name: current,
          params: { id: note.id, name: note.title },
          query: current === 'search' ? { q: notesStore.searchQuery } : {},
        }"
      >
        <h1>{{ note.title || 'No title' }}</h1>
        <ul>
          <li v-for="(tag, i) of note.tags" :key="i">{{ tag || 'No tag' }}</li>
        </ul>
        <span>{{ note.lastEdited }}</span>
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { userNotesStore } from '@/stores/userNotesStore';
import type { HomeRoutes } from '../types';
import { computed } from 'vue';

const notesStore = userNotesStore();
const currentNotes = computed(() => {
  switch (current) {
    case 'home':
    case 'notes':
      console.log(param);
      return notesStore.getAllNotes;
    case 'archivednotes':
      return notesStore.getArchivedNotes;
    case 'tag':
      return notesStore.getNotesByTagParametr(param || '');
    case 'search':
      return notesStore.getNotesByQuery;
    default:
      return notesStore.getAllNotes;
  }
});

const { paramCreate, param, current } = defineProps<{
  paramCreate: boolean;
  current: HomeRoutes;
  param?: string;
}>();
</script>

<style lang="scss" scoped>
.notesUntitled {
  font-family: var(--family-dynamic);
  font-weight: 600;
  font-size: 16px;
  line-height: 1.2;
  letter-spacing: -0.3px;
  background-color: var(--bg-cl-note, $bg-cl-note);
  color: var(--txt-cl-h, $txt-cl-h);
  padding: 8px;
  border-radius: 6px;
}
.notesListContainer {
  & li:not(:last-child) a {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--bor-cl-base, $bor-cl-base);
  }

  & li:not(:first-child) a {
    padding-top: 12px;
  }

  & li:has(+ li a.router-link-active) a {
    border-bottom: none;
  }

  .notesList {
    padding: 8px;
    display: inherit;

    &:focus-visible {
      outline: 1px solid #c0d5ff;
    }

    h1 {
      font-family: var(--family-dynamic);
      font-weight: 600;
      font-size: 16px;
      line-height: 1.2;
      letter-spacing: -0.3px;
      color: var(--txt-cl-h, $txt-cl-h);
      margin-bottom: 16px;
    }

    ul {
      display: flex;
      gap: 4px;
      margin-bottom: 12px;

      li {
        font-family: var(--family-dynamic);
        font-weight: normal;
        font-size: 12px;
        line-height: 1.2;
        letter-spacing: -0.2px;
        color: var(--txt-cl-h, $txt-cl-h);
        background-color: var(--bg-cl-tags, $bg-cl-tags);
        padding: 2px 6px;
        border-radius: 4px;
      }
    }

    span {
      font-family: var(--family-dynamic);
      font-weight: normal;
      font-size: 12px;
      line-height: 1.2;
      letter-spacing: -0.2px;
      color: var(
        --txt-cl-description-notes,
        var(--txt-cl-description-notes, $txt-cl-description-notes)
      );
    }

    &.router-link-active {
      background-color: var(--bg-cl-note, $bg-cl-note);
      border-radius: 6px;

      @include mq(large) {
        border-bottom: none;
      }
    }
  }
}
</style>
