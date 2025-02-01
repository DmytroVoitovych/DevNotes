<template>
  <div class="commonLayout">
    <el-container>
      <el-aside class="asideLeft">
        <AsideNavComponent />
      </el-aside>
      <el-container>
        <el-header :sticky="false"><HeaderChildren /></el-header>
        <el-main> <RouterView /> <RouterView name="createnote" /> </el-main>
        <el-footer><MenuBar /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts" scoped>
import AsideNavComponent from '@/components/aside/AsideNavComponent.vue';
import HeaderChildren from '@/components/header/HeaderChildren.vue';
import MenuBar from '@/components/notes/MenuBar.vue';
</script>
<style lang="scss">
.commonLayout {
  display: flex;
  min-height: 100vh;

  .asideLeft {
    display: none;
    min-width: 272px;
    max-width: 19%;
    border-right: 1px solid $bor-cl-base;
    padding: 12px 16px;
    padding-top: 28.5px;

    @include mq(large) {
      display: block;
    }
  }
}

.el-header {
  padding: 12px 16px;
  height: auto;
  background-color: $bg-cl-header;

  @include mq(medium) {
    padding: 16px 32px;
  }

  @include mq(large) {
    padding: 18.5px 32px;
    background-color: $bg-cl-base;
    border-bottom: 1px solid $bor-cl-base;
  }
}

.el-footer {
  padding: 12px 16px;
  height: auto;
  border-top: 1px solid $bor-cl-base;
  overflow-x: auto;

  @include mq(medium) {
    padding-right: 32px;
    padding-left: 32px;
  }

  @include mq(large) {
    display: none;
  }
}

.el-main {
  padding-left: 16px;
  padding-right: 16px;

  @include mq(medium) {
    padding: 24px 32px;
  }

  @include mq(large) {
    display: flex;
    padding: 0;
  }
}
</style>
