<template>
  <el-form label-width="auto" label-position="top">
    <el-button class="backCreateLink" text @click="router.push({ name: 'settings' })">
      <LeftArrowIco width="18" height="18" />Settings</el-button
    >
    <Transition name="fade" mode="out-in">
      <KeepAlive>
        <component :is="conditionalList"></component>
      </KeepAlive>
    </Transition>
  </el-form>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ChangeColorThemeList from "./ChangeColorThemeList.vue";
import ChangeFontView from "./ChangeFontView.vue";
import ChangePassword from "./ChangePassword.vue";
import type { SettingParams } from "./type";
import { useRouter } from "vue-router";
import { LeftArrowIco } from "@/assets/iconImport";

const router = useRouter();

const { param } = defineProps<{
  param: SettingParams;
}>();

const conditionalList = computed(() => {
  switch (param) {
    case "change-password":
      return ChangePassword;
    case "font-theme":
      return ChangeFontView;

    default:
      return ChangeColorThemeList;
  }
});
</script>

<style lang="scss" scoped>
.el-form {
  width: 100%;
  grid-auto-rows: max-content;
  @include mq(large) {
    padding-top: 32px;
    padding-left: 32px;
  }

  :deep(.el-button.backCreateLink) {
    display: flex;
    justify-content: flex-start;
    padding: 0;

    @include mq(large) {
      display: none;
    }

    & > span {
      display: flex;

      align-items: center;
      gap: 4px;
      font-family: var(--family-dynamic);
      font-weight: normal;
      line-height: 1.3;
      letter-spacing: -0.2px;
      fill: var(--link-cl-grey, $link-cl-grey);
      color: var(--link-cl-grey, $link-cl-grey);
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 250ms ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: translate(300px, 0);
    opacity: 0;
  }
}
</style>
