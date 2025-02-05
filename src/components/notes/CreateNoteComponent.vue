<template>
  <el-form :model="form" label-width="auto" ref="formRef">
    <div class="formOperateBlock">
      <el-button class="backCreateLink" text @click="router.back()">
        <LeftArrowIco width="18" height="18" /> Go back</el-button
      >
      <ul class="actionList">
        <li><el-button text @click.prevent="resetForm">Cancel</el-button></li>
        <li>
          <el-button class="saveNote" text native-type="button" @submit.prevent="submit"
            >Save note</el-button
          >
        </li>
      </ul>
    </div>
    <el-divider />
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
            v-model="form.tags"
            @keydown.stop="
              (e: KeyboardEvent) => handleCommaCode(e, switchCommaTrigger, commaTrigger)
            "
            placeholder="Add tags separated by commas (e.g. Work, Planning)"
            aria-label="Please click the Comma key after input"
          />
        </el-form-item>
        <el-form-item label="Last edited" class="timeEdit">
          <template #label> <TimeIco /> Last edited </template>
          <el-input disabled placeholder="Not saved yet" />
        </el-form-item>
      </div>
    </div>
    <el-divider />
    <el-input v-model="form.text" type="textarea" placeholder="Start typing your note here…" />
  </el-form>
</template>

<script lang="ts" setup>
import LeftArrowIco from '@/assets/images/icon-arrow-left.svg';
import TagIco from '@/assets/images/icon-tag.svg';
import TimeIco from '@/assets/images/icon-clock.svg';
import { type FormInstance } from 'element-plus';
import { ref, watch } from 'vue';
import { reactive, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import { handleCommaCode, uniqueTagsControl } from './helpers';
import type { CreateNoteForm } from './types';

const router = useRouter();
const formRef = useTemplateRef<FormInstance | null>('formRef');
const commaTrigger = ref(false);
const form = reactive<CreateNoteForm>({
  title: '',
  tags: [],
  text: '',
});

const switchCommaTrigger = (flag: boolean) => (commaTrigger.value = flag);

const resetForm = () => {
  form.title = '';
  form.tags = [];
  form.text = '';
};

const submit = (e: Event) => {
  e.preventDefault();
  console.log('submit!');
};

watch(() => form.tags, uniqueTagsControl, { deep: true });
</script>

<style lang="scss" scoped>
.el-form-item {
  gap: 39px;
}

.el-form-item.timeEdit:has(.el-input) {
  font-family: getInter();
  margin-bottom: 0;
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
  }

  :deep(.el-input__inner::placeholder) {
    font-size: 12px;
    line-height: 1.2;
    letter-spacing: -0.2px;
    color: $placeholder-input-cl;
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

      .el-button.saveNote {
        color: $btn-cl-text;
      }

      .el-button {
        padding: 0;
        font-family: getInter();
        line-height: 1.3;
        letter-spacing: -0.2px;
        color: $link-cl-grey;
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

      &::placeholder {
        font-family: getInter();
        font-size: 12px;
        line-height: 1.2;
        letter-spacing: -0.2px;
        color: $txt-cl-description-notes;
      }
    }
  }
}

:deep(.el-button.backCreateLink) {
  display: flex;
  justify-content: flex-start;
  padding: 0;

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

  .el-input__inner {
    font-family: getInter(Bold);
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.3px;
    color: $txt-cl-h;
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
  margin: 12px 0;
}
</style>
