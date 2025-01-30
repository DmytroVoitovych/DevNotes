import { computed, reactive, ref, toRef, toRefs, toValue, watch } from 'vue';
import PasswordEyeHidden from '@/assets/images/icon-hide-password.svg';
import PasswordEyeShow from '@/assets/images/icon-show-password.svg';
import type { FormItemProps, FormProps } from 'element-plus';
import type { AuthRoutes } from './types';
import { useUserStore } from '@/stores/userStore';
import { useRoute } from 'vue-router';

const formMainReactObj = reactive({
  email: '',
  pass: '',
  checkPass: '',
});

const loading = ref<boolean>(false);

export const useCustomFormHandler = () => {
  const userStore = useUserStore();
  const routeInstanse = useRoute();

  const show = ref<boolean>(false);
  const currentComponent = computed(() => (show.value ? PasswordEyeShow : PasswordEyeHidden));

  const showPassword = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    const trackedElements = ['path', 'svg'];

    if (trackedElements.includes(target.nodeName)) show.value = !show.value;
    return;
  };

  const resetForm = (formObj: { email: string; pass: string }): void => {
    changeLoadState();
    formObj.email = '';
    formObj.pass = '';
  };

  const changeLoadState = () => {
    loading.value = !loading.value;
  };

  const submitForm = (
    route: AuthRoutes,
    { email, pass = '', checkPass = '' }: { email: string; pass: string; checkPass?: string },
  ) => {
    changeLoadState();
    switch (route) {
      case 'signup':
        userStore.registerUser(email, pass).finally(() => resetForm(formMainReactObj));
        break;
      case 'login':
        userStore.loginUser(email, pass).finally(() => resetForm(formMainReactObj));
        break;
      case 'forgot':
        userStore.sendResetUserLink(email).finally(() => resetForm(formMainReactObj));
        break;
      case 'reset':
        userStore
          .confirmNewUserPassword(checkPass, routeInstanse)
          .finally(() => resetForm(formMainReactObj));
        break;
      default:
        break;
    }
  };

  return {
    computes: toRef({ currentComponent }),
    methods: {
      showPassword,
      submitForm,
    },
    loading: toRef(loading),
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
