<template>
  <div class="radioFormStyleWrapper">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.radioFormStyleWrapper {
  display: grid;
  row-gap: 20px;

  @include mq(large) {
    max-width: 528px;
    row-gap: 24px;
  }

  :deep(.el-form-item) {
    margin-bottom: 0;

    label {
      font-family: getInter(Bold);
      font-size: 24px;
      line-height: 1.2;
      letter-spacing: -0.5px;
      color: $txt-cl-h;
      margin-bottom: 8px;
      padding: 0;
    }

    .el-form-item__content > p {
      font-family: getInter();
      line-height: 1.3;
      letter-spacing: -0.2px;
      color: $txt-cl-description-notes;
      margin-bottom: 20px;

      @include mq(large) {
        margin-bottom: 24px;
      }
    }

    .el-radio-group {
      display: grid;
      row-gap: 16px;
      width: 100%;

      label {
        height: auto;
        margin: 0;
        padding: 16px;
        flex-direction: row-reverse;
        justify-content: space-between;

        &:focus-visible {
          border-color: $bor-cl-radio;
        }
      }

      .radioAditionalContent.fill svg {
        stroke: none;
        fill: $txt-cl-h;
      }

      svg {
        padding: 8px;
        stroke: $txt-cl-h;
        fill: none;
        border-radius: 12px;
        border: 1px solid $bor-cl-base;
        background-color: $bg-cl-base;
      }

      .el-radio__label {
        padding: 0;
      }

      .radioAditionalContent {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .textRadioContent {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .textRadioContent b {
        font-family: getInter(Medium);
        line-height: 1.2;
        letter-spacing: -0.2px;
      }

      .textRadioContent p {
        font-family: getInter();
        font-size: 12px;
        line-height: 1.2;
        letter-spacing: -0.2px;
      }

      .el-radio__inner {
        width: 16px;
        height: 16px;
        border-color: $bor-cl-base;
        border-width: 2px;
      }

      .el-radio.is-bordered.is-checked {
        border-color: $bor-cl-base;
        background-color: $bg-cl-radio;
      }

      .el-radio__input.is-checked + .el-radio__label {
        color: unset;
      }

      .el-radio__input.is-checked .el-radio__inner {
        border-color: $bor-cl-radio;
        background: $btn-bg-base;
      }
    }
  }

  :deep(.el-button) {
    font-family: getInter(Medium);
    line-height: 1.2;
    letter-spacing: -0.2px;
    padding: 12px 16px;
    border-radius: 8px;
    background-color: $btn-bg-base;
    color: $btn-cl-base;
    height: auto;
    margin-left: auto;
    transition: background-color 250ms;

    @media (hover: hover) {
      &:hover {
        background-color: $hover-btn-cl;
      }
    }
  }
}
</style>
