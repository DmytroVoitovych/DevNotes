<template>
  <el-input
    class="searchInput"
    v-model.lazy="notesStore.searchQuery"
    placeholder="Search by title, content, or tags…"
    type="search"
  >
    <template #prefix>
      <SearchIco class="searchIco" />
    </template>
  </el-input>
</template>

<script setup lang="ts">
import SearchIco from '@/assets/images/icon-search.svg';
import { userNotesStore } from '@/stores/userNotesStore';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const notesStore = userNotesStore();

watch(
  () => notesStore.searchQuery,
  (newSearchReq) => router.push({ name: 'search', query: { q: newSearchReq } }),
);
</script>

<style lang="scss" scoped>
.searchInput {
  :deep(.el-input__wrapper) {
    border-radius: 8px;
    border-color: $bor-cl-input;
    padding: 16px;
    margin-bottom: 16px;
    width: 100%;

    @include mq(large) {
      padding: 13px 16px;
      max-width: 300px;
      margin-bottom: 0;
    }

    @media (hover: hover) {
      &:hover {
        background-color: $hover-input-cl;
      }
    }

    &.is-focus {
      box-shadow: 0 0 0 1px $focus-cl-base inset;
      outline: 2px solid $bor-cl-input;
      outline-offset: 3px;
    }

    .searchIco {
      fill: $txt-cl-input;
    }

    input {
      font-family: getInter();
      font-size: 14px;
      line-height: 1.3;
      letter-spacing: -0.2px;
    }

    input::placeholder {
      font-family: getInter();
      font-size: 14px;
      line-height: 1.3;
      letter-spacing: -0.2px;
      color: $txt-cl-input;
    }
  }
}
</style>
