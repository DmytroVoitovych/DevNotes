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
              @click="submitNote"
              v-loading="loading"
              >Save note</el-button
            >
          </li>
        </ul>
      </div>
      <el-divider />
    </div>

    <div class="inputsContainer">
      <div class="inputBox">
        <el-input
          class="inputTitle"
          v-model="form.title"
          placeholder="Enter a title…"
          aria-label="Notes title"
        />
        <div class="inputWithLabels">
          <el-form-item label="Tags" class="tagInput" label-position="left">
            <template #label> <TagIco /> Tags </template>

            <el-input-tag
              :max="5"
              v-model.trim="form.tags"
              @keydown.stop="
                (e: KeyboardEvent) => handleCommaCode(e, switchCommaTrigger, commaTrigger)
              "
              placeholder="Add tags separated by commas (e.g. Work, Planning)"
              aria-label="Please click the Comma key after input"
            />
          </el-form-item>
          <el-form-item label="Last edited" class="timeEdit">
            <template #label> <TimeIco /> Last edited </template>
            <el-input disabled placeholder="Not saved yet" v-model="form.lastEdited" />
          </el-form-item>
        </div>
      </div>
      <el-divider />
      <el-input
        v-model="form.text"
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
import { type FormInstance } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import { reactive, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import { getLocalDate, handleCommaCode, idCustom, uniqueTagsControl } from './helpers';
import type { CreateNoteForm } from './types';
import { computed } from 'vue';
import { userNotesStore } from '@/stores/userNotesStore';
import NotesMoveList from '../shared/NotesMoveList.vue';

const noteStore = userNotesStore();
const router = useRouter();

const { id } = defineProps<{
  id?: string;
}>();

const formRef = useTemplateRef<FormInstance | null>('formRef');
const commaTrigger = ref(false);
const loading = ref<boolean>(false);
const form = reactive<CreateNoteForm>({
  title: '',
  tags: [],
  text: '',
  lastEdited: '',
  isArchived: false,
});

const switchCommaTrigger = (flag: boolean) => (commaTrigger.value = flag);
const disabled = computed<boolean>(() => !form.title || !form.text);

const resetForm = () => {
  form.title = '';
  form.tags = [];
  form.text = '';
  form.lastEdited = '';
  router.push({ name: 'notes' });
};

const submitNote = () => {
  loading.value = true;
  form.lastEdited = getLocalDate();
  noteStore.addNote(form).finally(() => {
    loading.value = false;
    router.push({ name: 'notes' });
  });
  console.log('submit!');
};

watch(() => form.tags, uniqueTagsControl, { deep: true });
watch(
  () => [noteStore.notesList, id],
  (newId) => {
    //не забыть вынести функцию

    const activeNote = noteStore.getNotesById(id || '');

    if (activeNote) {
      form.title = activeNote?.title || 'No data';
      form.text = activeNote?.content || 'No data';
      form.isArchived = !!activeNote?.isArchived;
      form.lastEdited = activeNote?.lastEdited || 'No data';
      form.tags = activeNote?.tags || [];
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
    border-right: 1px solid $bor-cl-base;
  }
}

.el-form-item {
  gap: 39px;
}

.el-form-item.timeEdit:has(.el-input) {
  font-family: getInter();
  margin-bottom: 0;

  :deep(.el-input.is-disabled .el-input__inner) {
    color: $txt-cl-description-notes;
    -webkit-text-fill-color: $txt-cl-description-notes;
  }

  :deep(.el-form-item__label) {
    padding: 0;
    align-items: center;
    gap: 6px;
    font-family: getInter();
    font-size: 12px;
    line-height: 1.2;
    letter-spacing: -0.2px;
    color: $txt-cl-description-notes;
    fill: $txt-cl-description-notes;

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
      font-family: getInter();
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
      font-family: getInter();
      font-size: 12px;
      line-height: 1.2;
      letter-spacing: -0.2px;
      color: $txt-cl-description-notes;
      fill: none;
      stroke: $txt-cl-description-notes;

      @include mq(medium) {
        font-size: 14px;
      }
    }

    label {
      display: flex;
      margin-right: 0;
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

        :deep(.el-button) {
          padding: 0;
          border: none;
        }
      }

      @include mq(large) {
        flex-direction: row-reverse;
      }

      .el-button.cancelCreateBtn {
        @include mq(large) {
          background-color: $btn-bg-cancel;
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
        font-family: getInter();
        line-height: 1.3;
        letter-spacing: -0.2px;
        color: $link-cl-grey;

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
      font-family: getInter();
      font-size: 12px;
      line-height: 1.2;
      letter-spacing: -0.2px;
      height: inherit;
      box-shadow: unset;
      padding: 0;

      @include mq(medium) {
        font-size: 14px;
      }

      &::placeholder {
        font-family: getInter();
        font-size: 12px;
        line-height: 1.2;
        letter-spacing: -0.2px;
        color: $txt-cl-description-notes;

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
    font-family: getInter();
    line-height: 1.3;
    letter-spacing: -0.2px;
    fill: $link-cl-grey;
    color: $link-cl-grey;
  }
}

:deep(.el-input.inputTitle) {
  margin-bottom: 12px;
  @include mq(medium) {
    margin-bottom: 16px;
  }

  .el-input__inner {
    font-family: getInter(Bold);
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.3px;
    color: $txt-cl-h;

    @include mq(medium) {
      font-size: 24px;
    }
  }

  .el-input__wrapper {
    box-shadow: unset;
    padding: 0;
  }

  .el-input__inner::placeholder {
    font-family: getInter(Bold);
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.3px;
    color: $txt-cl-h;
  }
}

.el-divider {
  border-color: $bor-cl-base;
  margin: 12px 0;
  @include mq(medium) {
    margin: 16px 0;
  }
}
</style>
