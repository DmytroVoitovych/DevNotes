<template>
  <el-form
    :label-position="labelPosition"
    label-width="auto"
    :model="formLabelAlign"
    style="max-width: auto"
    class="authForm"
  >
    <el-form-item
      class="formLabel"
      label="Email Adress"
      prop="email"
      :label-position="itemLabelPosition"
    >
      <el-input placeholder="email@example.com" v-model="formLabelAlign.email" type="email" />
    </el-form-item>
    <el-form-item
      class="formLabel"
      label="Password"
      prop="pass"
      :label-position="itemLabelPosition"
      @click="showPassword"
    >
      <RouterLink :to="{ name: 'forgot' }" class="linkForgot">Forgot</RouterLink>
      <el-input v-model="formLabelAlign.pass" show-password>
        <template #suffix v-if="formLabelAlign.pass">
          <component :is="currentComponent"></component>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="submit" value="Login" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import PasswordEyeHidden from '@/assets/images/icon-hide-password.svg'
import PasswordEyeShow from '@/assets/images/icon-show-password.svg'
import type { FormItemProps, FormProps } from 'element-plus'

const labelPosition = ref<FormProps['labelPosition']>('top')
const itemLabelPosition = ref<FormItemProps['labelPosition']>('')
const formLabelAlign = reactive({
  email: '',
  pass: '',
})

const show = ref<boolean>(false)
const currentComponent = computed(() => (show.value ? PasswordEyeShow : PasswordEyeHidden))

const showPassword = (e: MouseEvent): void => {
  const target = e.target as HTMLElement
  const trackedElements = ['path', 'svg']

  if (trackedElements.includes(target.nodeName)) show.value = !show.value
  return
}
</script>
<style lang="scss">
.el-form {
  display: grid;
  row-gap: 16px;
}

.el-form-item {
  margin-bottom: 0;

  &--label-top &__label {
    font-family: getInter('Medium');
    line-height: 1.2;
    letter-spacing: -0.2px;
    color: $txt-cl-h;
    padding: 0;
    margin-bottom: 6px;
  }
}

.el-input__wrapper {
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px $bor-cl-input inset;
  cursor: pointer;

  &.is-focus {
    box-shadow: 0 0 0 1px $focus-cl-base inset;
    outline: 2px solid $bor-cl-input;
    outline-offset: 3px;
  }

  & .el-input__inner {
    font-family: getInter();
    color: $txt-cl-input;
    cursor: pointer;
  }

  & .el-input__password {
    position: absolute;
    opacity: 0;
  }

  &:has([type='submit']) {
    box-shadow: none;
    background-color: $btn-bg-base;

    & input {
      font-family: getInter('SemiBold');
      font-size: 16px;
      line-height: 1.2;
      letter-spacing: -0.3px;
      color: $btn-cl-base;
    }
  }
}
.el-form-item__content:has(.linkForgot) {
  display: contents;
}

.linkForgot {
  float: right;
  font-family: getInter();
  font-size: 12px;
  line-height: 1.4;
  text-decoration-skip-ink: none;
  color: $link-cl-grey;
  transition: color 250ms;

  &:hover {
    color: $hover-link-cl;
  }

  &:visited {
    font-family: getInter();
    font-size: 12px;
    line-height: 1.4;
    text-decoration-skip-ink: none;
  }
}
</style>
