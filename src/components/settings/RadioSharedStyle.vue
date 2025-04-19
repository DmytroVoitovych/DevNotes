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
      font-family: var(--family-dynamic);
      font-weight: bold;
      font-size: 24px;
      line-height: 1.2;
      letter-spacing: -0.5px;
      color: var(--txt-cl-h, $txt-cl-h);
      margin-bottom: 8px;
      padding: 0;
      border-color: var(--bor-cl-base, $bor-cl-base);
      border-radius: 12px;
    }

    .el-form-item__content > p {
      font-family: var(--family-dynamic);
      font-weight: normal;
      line-height: 1.3;
      letter-spacing: -0.2px;
      color: var(
        --txt-cl-description-notes,
        var(--txt-cl-description-notes, $txt-cl-description-notes)
      );
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
        fill: var(--txt-cl-h, $txt-cl-h);
      }

      svg {
        padding: 8px;
        stroke: var(--txt-cl-h, $txt-cl-h);
        fill: none;
        border-radius: 12px;
        border: 1px solid var(--bor-cl-base, $bor-cl-base);
        background-color: var(--bg-cl-base, $bg-cl-base);
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
        font-family: var(--family-dynamic);
        font-weight: 500;
        line-height: 1.2;
        letter-spacing: -0.2px;
      }

      .textRadioContent p {
        font-family: var(--family-dynamic);
        font-weight: normal;
        font-size: 12px;
        line-height: 1.2;
        letter-spacing: -0.2px;
        color: var(--txt-radio-content, $txt-radio-content);
        text-wrap: auto;
      }

      @media (hover: hover) {
        label:not(.is-checked):hover :where(.textRadioContent b, .textRadioContent p) {
          text-decoration: underline;
          text-decoration-color: #335cff;
          text-decoration-skip-ink: none;
        }
      }

      .el-radio__inner {
        width: 16px;
        height: 16px;
        border-color: var(--bor-cl-base, $bor-cl-base);
        border-width: 2px;
        background-color: transparent;
      }

      .el-radio.is-bordered.is-checked {
        border-color: var(--bor-cl-base, $bor-cl-base);
        background-color: var(--bg-cl-radio, $bg-cl-radio);
      }

      .el-radio__input.is-checked + .el-radio__label {
        color: unset;
      }

      .el-radio__input.is-checked .el-radio__inner {
        border-color: $bor-cl-radio;
        background: $btn-bg-base;

        &::after {
          background-color: var(--bg-cl-radio, $bg-cl-radio);
        }
      }
    }
  }

  :deep(.el-button) {
    font-family: var(--family-dynamic);
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.2px;
    padding: 12px 16px;
    border-radius: 8px;
    background-color: $btn-bg-base;
    color: $btn-cl-base;
    height: auto;
    margin-left: auto;
    border: none;
    transition: background-color 250ms;

    @media (hover: hover) {
      &:hover {
        background-color: $hover-btn-cl;
      }
    }
  }
}
</style>
