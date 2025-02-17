<template>
  <el-form :model="form" label-width="auto" ref="formRef" class="createNoteForm">
    <div class="operateContainer">
      <div class="formOperateBlock">
        <el-button class="backCreateLink" text @click="router.back()">
          <LeftArrowIco width="18" height="18" /> Go back</el-button
        >
        <ul class="actionList">
          <li v-show="id">
            <NotesMoveList />
          </li>
          <li>
            <el-button class="cancelCreateBtn" text @click.prevent="resetForm">Cancel</el-button>
          </li>
          <li>
            <el-button
              :disabled
              class="saveNote"
              text
              native-type="button"
              @click="isWritable ? allowEdit() : submitNote(currentTrigger)"
              v-loading="loading"
              >{{ !isWritable ? 'Save note' : 'Edit' }}</el-button
            >
          </li>
        </ul>
      </div>
      <el-divider />
    </div>

    <div class="inputsContainer">
      <div class="inputBox">
        <el-input
          :readonly="isWritable"
          class="inputTitle"
          v-model="form.title"
          placeholder="Enter a title…"
          aria-label="Notes title"
        />
        <div class="inputWithLabels">
          <el-form-item label="Tags" class="tagInput" label-position="left">
            <template #label> <TagIco /> Tags </template>

            <el-input-tag
              :readonly="isWritable"
              :max="5"
              v-model="form.tags"
              @keydown.stop="
                (e: KeyboardEvent) => handleCommaCode(e, switchCommaTrigger, commaTrigger)
              "
              placeholder="Add tags separated by commas (e.g. Work, Planning)"
              aria-label="Please click the Comma key after input"
            />
          </el-form-item>
          <el-form-item
            label="Status"
            label-position="left"
            class="noteStatus el-form-item--label-left"
            v-if="form.isArchived"
          >
            <template #label> <StatusIco /> Status </template>
            <el-input readonly value="Archived" />
          </el-form-item>
          <el-form-item label="Last edited" class="timeEdit">
            <template #label> <TimeIco /> Last edited </template>
            <el-input readonly placeholder="Not saved yet" v-model="form.lastEdited" />
          </el-form-item>
        </div>
      </div>
      <el-divider />
      <el-input
        v-model="form.text"
        :readonly="isWritable"
        type="textarea"
        resize="none"
        placeholder="Start typing your note here…"
      />
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import LeftArrowIco from '@/assets/images/icon-arrow-left.svg';
import TagIco from '@/assets/images/icon-tag.svg';
import TimeIco from '@/assets/images/icon-clock.svg';
import StatusIco from '@/assets/images/icon-status.svg';
import { type FormInstance, type NotificationHandle } from 'element-plus';
import { ref, watch } from 'vue';
import { reactive, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getLocalDate, handleCommaCode, idCustom, uniqueTagsControl } from './helpers';
import type { CreateNoteForm } from './types';
import { computed } from 'vue';
import { userNotesStore } from '@/stores/userNotesStore';
import NotesMoveList from '../shared/NotesMoveList.vue';

const noteStore = userNotesStore();
const router = useRouter();
const route = useRoute();

const { id } = defineProps<{
  id?: string;
}>();

const formRef = useTemplateRef<FormInstance | null>('formRef');
const commaTrigger = ref(false);
const loading = ref<boolean>(false);
const isWritable = ref<boolean>(!!id);
const form = reactive<CreateNoteForm>({
  title: '',
  tags: [],
  text: '',
  lastEdited: '',
  isArchived: false,
});

const switchCommaTrigger = (flag: boolean) => (commaTrigger.value = flag);
const disabled = computed<boolean>(() => !form.title || !form.text);
const currentTrigger = computed<'addNote' | 'changeExistedNote'>(() =>
  !id ? 'addNote' : 'changeExistedNote',
);

const allowEdit = (): void => {
  isWritable.value = false;
};

const resetForm = (e?: MouseEvent) => {
  if (e) router.push({ name: route.name, query: route.query });
  else {
    form.title = '';
    form.tags = [];
    form.text = '';
    form.lastEdited = '';
    form.isArchived = false;
  }
};

const submitNote = (trigerName: 'addNote' | 'changeExistedNote') => {
  loading.value = true;
  form.lastEdited = getLocalDate();
  noteStore[trigerName](form, id as string).finally(() => {
    loading.value = false;
    if (!id) router.push({ name: 'notes' });
    else {
      isWritable.value = true;
    }
  });
  console.log('submit!');
};

watch(() => form.tags, uniqueTagsControl, { deep: true });
watch(
  () => noteStore.getArchivedNotes,
  () => {
    console.log(id, 'create');
    if (!id) return;
    const archiveEffect = noteStore.getArchivedNotes.some((e) => e.id === id);
    if (archiveEffect !== form.isArchived) form.isArchived = archiveEffect;
  },
);
watch(
  () => [noteStore.notesList, id],
  () => {
    //не забыть вынести функцию
    isWritable.value = !!id;
    const activeNote = noteStore.getNotesById(id || '');

    if (activeNote) {
      form.title = activeNote?.title || 'No data';
      form.text = activeNote?.content || 'No data';
      form.isArchived = !!activeNote?.isArchived;
      form.lastEdited = activeNote?.lastEdited || 'No data';
      form.tags = activeNote?.tags || [];
      return;
    } else {
      resetForm();
    }
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.inputsContainer {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.operateContainer {
  @include mq(large) {
    display: flex;
    flex-direction: column-reverse;
    margin-top: auto;
    flex-grow: 0;
    z-index: 1;
  }
}

.el-form.createNoteForm {
  @include mq(large) {
    flex-direction: column-reverse;
    justify-content: flex-end;
    min-width: 46%;
    padding: 20px 24px;
    height: auto;
    border-right: 1px solid var(--bor-cl-base, $bor-cl-base);
  }
}

.el-form-item {
  gap: 39px;
}

.el-form-item.timeEdit:has(.el-input),
.el-form-item.noteStatus:has(.el-input) {
  font-family: var(--family-dynamic);
  font-weight: normal;
  margin-bottom: 0;

  :deep(.el-input .el-input__inner) {
    color: var(
      --txt-cl-description-notes,
      var(--txt-cl-description-notes, $txt-cl-description-notes)
    );
    -webkit-text-fill-color: var(
      --txt-cl-description-notes,
      var(--txt-cl-description-notes, $txt-cl-description-notes)
    );
  }

  :deep(.el-form-item__label) {
    padding: 0;
    align-items: center;
    gap: 6px;
    font-family: var(--family-dynamic);
    font-weight: normal;
    font-size: 12px;
    line-height: 1.2;
    letter-spacing: -0.2px;
    color: var(
      --txt-cl-description-notes,
      var(--txt-cl-description-notes, $txt-cl-description-notes)
    );
    fill: var(
      --txt-cl-description-notes,
      var(--txt-cl-description-notes, $txt-cl-description-notes)
    );

    @include mq(medium) {
      font-size: 14px;
    }
  }

  :deep(.el-input__inner::placeholder) {
    font-size: 12px;
    line-height: 1.2;
    letter-spacing: -0.2px;
    color: $placeholder-input-cl;
    -webkit-text-fill-color: $placeholder-input-cl;

    @include mq(medium) {
      font-size: 14px;
    }
  }

  :deep(.el-input__wrapper) {
    padding-right: 0;
    padding-left: 8px;
    background-color: transparent;
    box-shadow: unset;
  }
}

:deep(.el-form-item__label-wrap) {
  margin-right: 0;
}

.inputWithLabels {
  .tagInput.el-form-item {
    display: flex;

    :deep(.el-input-tag__input::placeholder) {
      font-family: var(--family-dynamic);
      font-weight: normal;
      font-size: 12px;
      line-height: 1.2;
      letter-spacing: -0.2px;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      word-wrap: break-word;
      color: $placeholder-input-cl;
      align-self: self-end;

      @include mq(medium) {
        font-size: 14px;
      }
    }

    :deep(.el-input-tag__wrapper) {
      box-shadow: unset;
      padding: 0;
      background-color: var(--bg-cl-base, $bg-cl-base);

      .el-input-tag__input {
        color: var(--txt-cl-h, $txt-cl-h);
      }

      .el-input-tag__inner:has(input[readonly]) {
        gap: 0;

        .el-tag {
          background-color: transparent;
          padding: 0;
          color: var(--txt-cl-h, $txt-cl-h);
        }

        .el-tag:not(:last-of-type) .el-tag__content::after {
          content: ', ';
        }
      }

      .is-right-space {
        margin-right: 0;
      }
      @media (max-width: 434px) {
        &:not(.is-focused) input {
          padding-bottom: 11px;
        }
      }
    }

    .el-form-item__label-wrap {
      margin-right: 0;
    }

    :deep(.el-form-item__label) {
      padding: 0;
      align-items: center;
      gap: 6px;
      font-family: var(--family-dynamic);
      font-weight: normal;
      font-size: 12px;
      line-height: 1.2;
      letter-spacing: -0.2px;
      color: var(
        --txt-cl-description-notes,
        var(--txt-cl-description-notes, $txt-cl-description-notes)
      );
      fill: none;
      stroke: var(
        --txt-cl-description-notes,
        var(--txt-cl-description-notes, $txt-cl-description-notes)
      );

      @include mq(medium) {
        font-size: 14px;
      }
    }

    label {
      display: flex;
      margin-right: 0;
    }

    & + .noteStatus {
      margin-bottom: 18px;
    }
  }
}

.el-form {
  height: 100%;
  display: flex;
  flex-direction: column;

  .formOperateBlock {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .actionList {
      display: flex;
      gap: 16px;

      & > li:first-child {
        @include mq(large) {
          display: none;
        }
      }

      > li:first-child > ul {
        display: flex;
        gap: 16px;
        stroke: currentColor;
        fill: none;

        :deep(li.stroke) {
          stroke: none;
          fill: currentColor;
        }

        :deep(.el-button) {
          padding: 0;
          border: none;
          background-color: transparent;
        }
      }

      @include mq(large) {
        flex-direction: row-reverse;
      }

      .el-button.cancelCreateBtn {
        @include mq(large) {
          background-color: var(--btn-bg-cancel, $btn-bg-cancel);
        }
      }

      .el-button.saveNote {
        color: $btn-cl-text;

        &.is-disabled {
          background-color: $btn-bg-base !important;
          color: $btn-cl-base;
          pointer-events: none;
          filter: grayscale(1);
        }

        @include mq(large) {
          background-color: $btn-bg-base;
          color: $btn-cl-base;
          transition: background-color 250ms;
        }

        @media (hover: hover) {
          &:hover {
            background-color: $hover-btn-cl;
          }
        }
      }

      .el-button {
        padding: 0;
        font-family: var(--family-dynamic);
        font-weight: normal;
        line-height: 1.3;
        letter-spacing: -0.2px;
        color: var(--link-cl-grey, $link-cl-grey);

        @include mq(large) {
          padding: 12px 16px;
          border-radius: 8px;
        }
      }
    }
  }

  .el-textarea {
    height: 100%;

    :deep(.el-textarea__inner) {
      font-family: var(--family-dynamic);
      font-weight: normal;
      font-size: 12px;
      line-height: 1.2;
      letter-spacing: -0.2px;
      height: inherit;
      box-shadow: unset;
      padding: 0;
      color: var(--txt-cl-h, $txt-cl-h);
      background-color: var(--bg-cl-base, $bg-cl-base);

      @include mq(medium) {
        font-size: 14px;
      }

      &::placeholder {
        font-family: var(--family-dynamic);
        font-weight: normal;
        font-size: 12px;
        line-height: 1.2;
        letter-spacing: -0.2px;
        color: var(
          --txt-cl-description-notes,
          var(--txt-cl-description-notes, $txt-cl-description-notes)
        );

        @include mq(medium) {
          font-size: 14px;
        }
      }
    }
  }
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

:deep(.el-input.inputTitle) {
  margin-bottom: 12px;
  @include mq(medium) {
    margin-bottom: 16px;
  }

  .el-input__inner {
    font-family: var(--family-dynamic);
    font-weight: bold;
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.3px;
    color: var(--txt-cl-h, $txt-cl-h);
    background-color: var(--bg-cl-base, $bg-cl-base);

    @include mq(medium) {
      font-size: 24px;
    }
  }

  .el-input__wrapper {
    box-shadow: unset;
    padding: 0;
  }

  .el-input__inner::placeholder {
    font-family: var(--family-dynamic);
    font-weight: bold;
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.3px;
    color: var(--txt-cl-h, $txt-cl-h);
  }
}

.el-divider {
  border-color: var(--bor-cl-base, $bor-cl-base);
  margin: 12px 0;
  @include mq(medium) {
    margin: 16px 0;
  }
}
</style>
