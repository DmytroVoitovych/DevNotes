<template>
  <div class="commonLayout">
    <el-container>
      <el-aside class="asideLeft">
        <AsideNavComponent />
        <TagsList />
      </el-aside>
      <el-container>
        <el-header><HeaderChildren :current="currentRoute" /></el-header>
        <el-main>
          <RouterView /> <RouterView name="createnote" v-if="checkParams" />
          <RouterView name="pickedsetting" v-if="isSetting" />
          <div class="actionContainer" v-show="isId">
            <RouterView name="action" v-slot="{ Component }">
              <component :is="Component">
                <template #archive>
                  {{ btnStatus ? 'Restore note' : 'Archive note' }}
                </template>
                <template #delete> Delete Note </template>
              </component>
            </RouterView>
          </div>
        </el-main>
        <el-footer><MenuBar /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts" scoped>
import AsideNavComponent from '@/components/aside/AsideNavComponent.vue';
import HeaderChildren from '@/components/header/HeaderChildren.vue';
import MenuBar from '@/components/notes/MenuBar.vue';
import type { HomeRoutes } from '@/components/types';
import { computed, onMounted, onUnmounted, ref, toValue, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { navigateByResizeScreen } from './helper';
import TagsList from '@/components/shared/TagsList.vue';
import { userNotesStore } from '@/stores/userNotesStore';

const notesStore = userNotesStore();
const route = useRoute();
const router = useRouter();

const currentRoute = ref<HomeRoutes>(route.name as HomeRoutes);
const isId = computed<boolean>(() => !!route?.params?.id);
const isSetting = computed<boolean>(() => !!route?.params?.settingname);
const checkParams = computed<boolean>(() =>
  ['create', 'id', 'name'].some((e) => e in route.params && route.params[e]),
);
const btnStatus = computed<boolean>(() =>
  notesStore.getArchivedNotes.some((e) => e.id === route?.params?.id),
);

onMounted(() => {
  window.addEventListener('resize', () => navigateByResizeScreen(router, toValue(currentRoute)));
});

onUnmounted(() => {
  window.removeEventListener('resize', () => navigateByResizeScreen);
});
watch(checkParams, (n) => console.log('test', 'param', n));
watch(
  () => route.name,
  (newRoute) => {
    if (newRoute) {
      console.log(newRoute, route.params);
      currentRoute.value = newRoute as HomeRoutes;
    }
  },
);
</script>
<style lang="scss">
.commonLayout {
  display: flex;
  height: 100vh;

  .actionContainer {
    display: none;

    @include mq(large) {
      display: block;
      width: 100%;
      padding-top: 20px;
      padding-left: 16px;
      padding-right: 32px;

      ul {
        display: flex;
        gap: 16px;
        flex-direction: column-reverse;
        fill: none;
        stroke: $txt-cl-h;
        text-align: left;

        li.stroke {
          stroke: none;
          fill: $txt-cl-h;
        }
      }
    }
  }

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
  overflow-y: auto;

  @include mq(medium) {
    padding: 24px 32px;
  }

  @include mq(large) {
    overflow-y: hidden;
    display: flex;
    padding: 0;
  }
}
</style>
