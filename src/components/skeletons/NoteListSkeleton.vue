<template>
  <el-skeleton
    animated
    :loading="notesStore.listLoading"
    v-for="i of 3"
    :key="i"
    style="margin-bottom: 12px"
  >
    <template #template>
      <el-skeleton-item variant="p" style="width: 60%; height: 20px; margin-bottom: 16px" />

      <div style="display: flex; gap: 4px; margin-bottom: 12px">
        <el-skeleton-item variant="text" style="width: 60px; height: 20px; border-radius: 4px" />
        <el-skeleton-item variant="text" style="width: 60px; height: 20px; border-radius: 4px" />
        <el-skeleton-item variant="text" style="width: 60px; height: 20px; border-radius: 4px" />
      </div>

      <el-skeleton-item variant="text" style="width: 30%; height: 16px" />
    </template>
  </el-skeleton>
</template>
<script lang="ts" setup>
import { userNotesStore } from '@/stores/userNotesStore';

const notesStore = userNotesStore();
</script>
