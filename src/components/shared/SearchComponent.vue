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
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const notesStore = userNotesStore();

onMounted(() => route.query.q && (notesStore.searchQuery = route.query.q as string));

watch(
  () => notesStore.searchQuery,
  (newSearchReq) =>
    router.push({ name: 'search', query: { q: newSearchReq }, params: route.params }),
);
</script>

<style lang="scss" scoped>
.searchInput {
  &.el-input {
    height: auto;
    height: auto;
    --el-input-inner-height: auto;

    @include mq(large) {
      max-width: 300px;
    }
  }

  :deep(.el-input__wrapper) {
    background-color: var(--bg-cl-base, $bg-cl-base);
    border-radius: 8px;
    border-color: var(--bor-cl-input, $bor-cl-input);
    padding: 16px;
    margin-bottom: 16px;

    @include mq(large) {
      padding: 13px 16px;
      width: 300px;
      margin-bottom: 0;
    }

    @media (hover: hover) {
      &:hover {
        background-color: var(--hover-input-cl, $hover-input-cl);
      }
    }

    &.is-focus {
      box-shadow: 0 0 0 1px $focus-cl-base inset;
      outline: 2px solid var(--bor-cl-input, $bor-cl-input);
      outline-offset: 3px;
    }

    .searchIco {
      fill: var(--txt-cl-input, $txt-cl-input);
    }

    input {
      font-family: getInter();
      font-size: 14px;
      line-height: 1.3;
      letter-spacing: -0.2px;
      color: var(--txt-cl-h, $txt-cl-h);
      caret-color: var(--txt-cl-h, $txt-cl-h);
    }

    input::placeholder {
      font-family: getInter();
      font-size: 14px;
      line-height: 1.3;
      letter-spacing: -0.2px;
      color: var(--txt-cl-input, $txt-cl-input);
    }
  }
}
</style>
