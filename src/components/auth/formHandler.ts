import { computed, reactive, ref, toRef, toRefs, toValue, watch } from 'vue';
import PasswordEyeHidden from '@/assets/images/icon-hide-password.svg';
import PasswordEyeShow from '@/assets/images/icon-show-password.svg';
import type { FormItemProps, FormProps } from 'element-plus';

const formMainReactObj = reactive({
  email: '',
  pass: '',
});

export const useCustomFormHandler = () => {
  const show = ref<boolean>(false);
  const currentComponent = computed(() => (show.value ? PasswordEyeShow : PasswordEyeHidden));

  const showPassword = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    const trackedElements = ['path', 'svg'];
    console.log('test');
    console.log(currentComponent.value);
    if (trackedElements.includes(target.nodeName)) show.value = !show.value;
    return;
  };

  const submitForm = () => {
    console.log('submit');
  };

  return {
    computes: toRef({ currentComponent }),
    methods: {
      showPassword,
      submitForm,
    },
    state: {
      show: show.value,
    },
  };
};

export const useElementsUiForm = () => {
  const labelPosition = ref<FormProps['labelPosition']>('top');
  const itemLabelPosition = ref<FormItemProps['labelPosition']>('');

  return {
    labelPosition: labelPosition.value,
    itemLabelPosition: itemLabelPosition.value,
    formLabelAlign: formMainReactObj,
    formLabelAlignItems: toRefs(formMainReactObj),
  };
};
