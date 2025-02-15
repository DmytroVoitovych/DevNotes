<template>
  <div class="desktopHeaderWrapper">
    <HeadingComponent :param :query><slot name="heading"></slot></HeadingComponent>
    <div class="rightSearchWrapper">
      <SearchComponent />
      <el-button tag="router-link" :to="{ name: 'settings' }">
        <SettingIco />
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import SettingIco from '@/assets/images/icon-settings.svg';
import HeadingComponent from '../shared/HeadingComponent.vue';
import { useRoute } from 'vue-router';
import SearchComponent from '../shared/SearchComponent.vue';
const route = useRoute();

const param = ref<string | undefined>(route.params.tag as string | undefined);
const query = ref<string | undefined>(route.query.q as string | undefined);

watch(
  () => route.params,
  (params) => {
    param.value = params.tag as string;
  },
);
watch(
  () => route.query,
  (strquery) => {
    query.value = strquery.q as string;
  },
);
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
    fill: var(--link-cl-grey, $link-cl-grey);
    background-color: transparent;
  }
}
</style>
