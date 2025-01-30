import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import {
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
    resetUserPassword(email: string) {
      sendPasswordResetEmail(getAuth(), email);
    },
  },
});
