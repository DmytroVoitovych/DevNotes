<template>
  <div class="desktopHeaderWrapper">
    <HeadingComponent><slot name="heading"></slot></HeadingComponent>
    <div class="rightSearchWrapper">
      <el-input
        class="searchInput"
        v-model.trim.lazy="search"
        style="width: 300px"
        placeholder="Search by title, content, or tags…"
        type="search"
      >
        <template #prefix>
          <SearchIco class="searchIco" />
        </template>
      </el-input>
      <el-button tag="router-link" to="/setting">
        <SettingIco />
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchIco from '@/assets/images/icon-search.svg';
import SettingIco from '@/assets/images/icon-settings.svg';
import HeadingComponent from '../shared/HeadingComponent.vue';
const search = ref('');
</script>

<style lang="scss" scoped>
.desktopHeaderWrapper {
  display: none;
  justify-content: space-between;
  align-items: center;

  @include mq(large) {
    display: flex;
  }

  .rightSearchWrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .el-button {
    padding: 0;
    border: none;
    fill: $link-cl-grey;
  }
}

.searchInput {
  :deep(.el-input__wrapper) {
    padding: 13px 16px;
    border-radius: 8px;
    border-color: $bor-cl-input;

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
