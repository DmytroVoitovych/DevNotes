<template>
  <ul>
    <li>
      <el-button>
        <DeleteIco />
        <slot name="delete"></slot>
      </el-button>
    </li>
    <li>
      <el-button>
        <ArchiveIco />
        <slot name="archive"></slot>
      </el-button>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import DeleteIco from '@/assets/images/icon-delete.svg';
import ArchiveIco from '@/assets/images/icon-archive.svg';
</script>
<style lang="scss" scoped>
@include mq(large) {
  .el-button {
    font-family: getInter(Medium);
    line-height: 1.2;
    letter-spacing: -0.2px;
    color: $txt-cl-h;
    border: 1px solid $bor-cl-input;
    justify-content: flex-start;
    width: 100%;
    padding: 12px 16px;
    height: auto;
    :deep(span) {
      gap: 8px;
    }
  }
}
</style>
