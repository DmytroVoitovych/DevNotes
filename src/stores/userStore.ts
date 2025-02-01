import { defineStore } from 'pinia';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import {
  authErrorHandler,
  googleAuthErrorHandler,
  registrationErrorHandler,
} from '@/components/auth/helpers';
import { type RouteLocationNormalizedLoadedGeneric } from 'vue-router';

import router from '@/router';
import {
  errorPasswordResetInform,
  errorResetLinkSendingInform,
  needToGetNewResetLink,
  successPasswordResetInform,
  successResetLinkSendingInform,
} from './helpers';

export const useUserStore = defineStore('userInformation', {
  state() {
    return {
      isLogin: false,
    };
  },
  getters: {
    getUserAuthStatus: (state) => state.isLogin,
  },
  actions: {
    setLoginStatus(status: boolean) {
      this.isLogin = status;
      console.log(this.isLogin, 'status');
      return;
    },
    registerUser(email: string, pass: string) {
      return createUserWithEmailAndPassword(getAuth(), email, pass)
        .then((data) => console.log('data', data))
        .catch((error) => registrationErrorHandler(error.code));
    },
    loginUser(email: string, pass: string) {
      return signInWithEmailAndPassword(getAuth(), email, pass)
        .then((data) => console.log(data))
        .catch((error) => authErrorHandler(error.code));
    },
    loginUserByGoogle() {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(getAuth(), provider)
        .then((data) => console.log(data))
        .catch((error) => googleAuthErrorHandler(error.code));
    },
    sendResetUserLink(email: string) {
      const actionCodeSettings = {
        url: 'http://localhost:5173/auth/reset-password',
        handleCodeInApp: true,
      };
      return fetchSignInMethodsForEmail(getAuth(), email)
        .then(
          (userList) => !userList.length && Promise.reject(new Error('Email was not registrated')),
        )
        .then(() => sendPasswordResetEmail(getAuth(), email, actionCodeSettings))
        .then(successResetLinkSendingInform)
        .then(() => router.push({ name: 'login' }))
        .catch(errorResetLinkSendingInform);
    },
    confirmNewUserPassword(newPass: string, route: RouteLocationNormalizedLoadedGeneric) {
      const oobCode = (route.query.oobCode as string) || '';
      if (!oobCode) return needToGetNewResetLink();
      return confirmPasswordReset(getAuth(), oobCode, newPass)
        .then(successPasswordResetInform)
        .then(() => router.push({ name: 'login' }))
        .catch(errorPasswordResetInform);
    },
  },
});
