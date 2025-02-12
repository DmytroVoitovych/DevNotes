<template>
  <el-dialog v-model="showDialog" align-center :show-close="false">
    <div class="dialogHeaderBlock">
      <slot name="dialogIco"></slot><b class="dialogTitle"><slot name="dialogTitle"></slot></b>
      <span><slot name="dialogContent"></slot></span>
    </div>
    <el-divider />
    <template #footer>
      <div class="dialog-footer">
        <el-button class="dialogCancel" @click="switchDialogState">Cancel</el-button>
        <el-button class="dialogAction" @click="$emit('actionEvent')" v-loading="loading">
          <slot name="dialogButtonContent"></slot>
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const { deleteStyle, loading } = defineProps<{ deleteStyle: boolean; loading: boolean }>();

const showDialog = ref<boolean>(false);
const styleByType = computed<string>(() => (deleteStyle ? '#fb3748' : '#335cff'));
const styleByTypeHover = computed<string>(() => (deleteStyle ? '#d82e3e' : '#2547d0'));

const switchDialogState = () => (showDialog.value = !showDialog.value);

defineExpose({ switchDialogState });
</script>

<style lang="scss">
.el-dialog__header {
  display: none;
}
.el-dialog.is-align-center {
  padding: 20px 20px 16px 20px;
  width: 100%;
  max-width: 440px;
  border-radius: 12px;
  background-color: $bg-cl-base;

  @media screen and (max-width: 472px) {
    width: calc(100% - 32px);
  }

  .dialogHeaderBlock {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: 20px;
    column-gap: 16px;
    row-gap: 6px;

    & > svg {
      padding: 8px;
      background-color: $bg-cl-icon;
      border-radius: 8px;
      stroke: $txt-cl-h;
    }

    .dialogTitle {
      font-family: getInter(SemiBold);
      font-size: 16px;
      line-height: 1.2;
      letter-spacing: -0.3px;
      color: $txt-cl-h;
    }

    span {
      font-family: getInter();
      line-height: 1.2;
      letter-spacing: -0.3px;
      color: $txt-cl-description-notes;
      grid-column: 2/-1;
    }
  }

  .el-divider {
    width: calc(100% + 40px);
    margin: 20px -20px 16px -20px;
    border-color: $bor-cl-base;
  }

  .el-dialog__footer {
    padding: 0;
  }

  .dialog-footer {
    .el-button {
      height: auto;

      &:focus-visible {
        outline: 2px solid;
        outline-offset: 2px;
        outline-color: $focus-cl-btn-dialog;
      }
    }

    .el-button.dialogCancel {
      padding: 12px 16px !important;
      border-radius: 8px;
      background-color: $btn-bg-cancel;
      font-family: getInter(Medium);
      line-height: 1.2;
      letter-spacing: -0.2px;
      color: $txt-cl-description;
    }

    .el-button.dialogAction {
      padding: 12px 16px !important;
      border-radius: 8px;
      background-color: v-bind(styleByType);
      font-family: getInter(Medium);
      line-height: 1.2;
      letter-spacing: -0.2px;
      color: $btn-cl-base;
      transition: background-color 250ms;

      @media (hover: hover) {
        &:hover {
          background-color: v-bind(styleByTypeHover);
        }
      }
    }
  }
}
</style>
