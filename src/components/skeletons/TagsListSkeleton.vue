<template>
  <el-skeleton animated :loading="notesStore.listLoading" style="margin-top: 16px">
    <template #template>
      <el-skeleton-item variant="h1" style="width: 40%; height: 20px; margin-bottom: 16px" />

      <div style="width: 85%">
        <div v-for="i in 5" :key="i">
          <el-skeleton-item
            variant="p"
            style="
              display: flex;
              align-items: center;
              padding: 10px 12px;
              gap: 8px;
              margin-bottom: 12px;
            "
          >
            <el-skeleton-item
              variant="text"
              style="width: 16px; height: 16px; border-radius: 12px"
            />

            <el-skeleton-item variant="text" style="width: 80px; height: 16px" />
          </el-skeleton-item>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script lang="ts" setup>
import { userNotesStore } from '@/stores/userNotesStore';

const notesStore = userNotesStore();
</script>
