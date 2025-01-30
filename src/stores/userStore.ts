import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
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
import {
  useRoute,
  type RouteLocationNormalizedLoaded,
  type RouteLocationNormalizedLoadedGeneric,
} from 'vue-router';

import router from '@/router';

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
      return sendPasswordResetEmail(getAuth(), email, actionCodeSettings)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    },
    confirmNewUserPassword(newPass: string, route: RouteLocationNormalizedLoadedGeneric) {
      const oobCode = (route.query.oobCode as string) || '';

      return confirmPasswordReset(getAuth(), oobCode, newPass)
        .then((e) => {
          router.push({ name: 'login' });
        })
        .catch((e) => console.log(e));
    },
  },
});
