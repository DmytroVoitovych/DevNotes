<template>
  <ul>
    <li>
      <el-button @click="() => showModal('delete')">
        <DeleteIco />
        <slot name="delete"></slot>
      </el-button>
    </li>
    <li :class="btnStatus ? 'stroke' : null">
      <el-button
        @click="() => (btnStatus ? moveNote(currentAction) : showModal('archive'))"
        v-loading="loading && btnStatus"
      >
        <component :is="btnStatus ? RestoreIco : ArchiveIco"></component>
        <slot name="archive"></slot>
      </el-button>
    </li>
    <DialogComponent
      ref="dialogRef"
      v-if="iniciatorOfTrigger"
      :deleteStyle="iniciatorOfTrigger === 'delete'"
      :loading="loading"
      @actionEvent="() => moveNote(currentAction)"
    >
      <template #dialogTitle>{{ modalContent[iniciatorOfTrigger].title }}</template>
      <template #dialogContent>{{ modalContent[iniciatorOfTrigger].content }}</template>
      <template #dialogButtonContent>{{ modalContent[iniciatorOfTrigger].buttonContent }}</template>
      <template #dialogIco
        ><component :is="iniciatorOfTrigger === 'delete' ? DeleteIco : ArchiveIco"></component
      ></template>
    </DialogComponent>
  </ul>
</template>
<script lang="ts" setup>
import { userNotesStore } from "@/stores/userNotesStore";
import { getLocalDate } from "../notes/helpers";
import { computed, nextTick, ref, useTemplateRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import DialogComponent from "./DialogComponent.vue";
import type { DialogTriggerName } from "../types";
import { modalContent } from "../staticContent";
import type { NotificationHandle } from "element-plus";
import { ArchiveIco, RestoreIco, DeleteIco } from "@/assets/iconImport";

const notesStore = userNotesStore();
const route = useRoute();
const router = useRouter();

const dialogRef = useTemplateRef<InstanceType<typeof DialogComponent>>("dialogRef");
const iniciatorOfTrigger = ref<DialogTriggerName>();
const loading = ref<boolean>(false);
const btnStatus = computed<boolean>(() =>
  notesStore.getArchivedNotes.some((e) => e.id === route?.params?.id),
);

const showModal = (trigger: DialogTriggerName) => {
  iniciatorOfTrigger.value = trigger;
  nextTick(() => {
    if (dialogRef?.value) dialogRef?.value.switchDialogState();
  });
};

const currentAction = computed<Promise<void | NotificationHandle>>(() =>
  iniciatorOfTrigger.value === "delete"
    ? notesStore.deleteNote(route.params.id as string)
    : notesStore.archiveOrRestoreNote(route.params.id as string, getLocalDate()),
);

const moveNote = (mutateDataBase: Promise<void | NotificationHandle>): void => {
  if (!route?.params?.id) return;
  loading.value = true;

  mutateDataBase.finally(() => {
    loading.value = false;
    if (btnStatus.value || iniciatorOfTrigger.value === "delete") {
      dialogRef.value?.switchDialogState();
      if (iniciatorOfTrigger.value === "delete")
        router.push({ name: route.name, query: route.query });
    }
  });
};
</script>
<style lang="scss" scoped>
@include mq(large) {
  @media (hover: hover) {
    li:hover .el-button {
      background-color: var(--link-cl-aside-bg-active, $link-cl-aside-bg-active);
      stroke: $link-cl-active;
    }
    li.stroke:hover .el-button {
      fill: $link-cl-active;
      stroke: none;
    }
  }

  .el-button {
    font-family: var(--family-dynamic);
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.2px;
    color: var(--txt-cl-h, $txt-cl-h);
    border: 1px solid var(--bor-cl-input, $bor-cl-input);
    background-color: transparent;
    justify-content: flex-start;
    width: 100%;
    padding: 12px 16px;
    height: auto;
    transition:
      background-color 250ms ease-in-out,
      fill 250ms ease-in-out,
      stroke 250ms ease-in-out;

    :deep(span) {
      gap: 8px;
    }
  }
}
</style>
