import { defineStore } from "pinia";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  validatePassword,
  type User,
} from "firebase/auth";
import {
  authErrorHandler,
  googleAuthErrorHandler,
  registrationErrorHandler,
} from "@/components/auth/helpers";
import { type RouteLocationNormalizedLoadedGeneric } from "vue-router";

import router from "@/router";
import {
  errorPasswordChangeInform,
  errorPasswordResetInform,
  errorResetLinkSendingInform,
  needToGetNewResetLink,
  successPasswordResetInform,
  successPasswordUpdateInform,
  successResetLinkSendingInform,
} from "./helpers";

export const useUserStore = defineStore("userInformation", {
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
      return;
    },
    registerUser(email: string, pass: string) {
      return createUserWithEmailAndPassword(getAuth(), email, pass).catch((error) =>
        registrationErrorHandler(error.code),
      );
    },
    loginUser(email: string, pass: string) {
      return signInWithEmailAndPassword(getAuth(), email, pass).catch((error) =>
        authErrorHandler(error.code),
      );
    },
    loginUserByGoogle() {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(getAuth(), provider).catch((error) =>
        googleAuthErrorHandler(error.code),
      );
    },
    sendResetUserLink(email: string) {
      const actionCodeSettings = {
        url: "http://localhost:5173/auth/reset-password",
        handleCodeInApp: true,
      };
      return fetchSignInMethodsForEmail(getAuth(), email)
        .then(
          (userList) => !userList.length && Promise.reject(new Error("Email was not registrated")),
        )
        .then(() => sendPasswordResetEmail(getAuth(), email, actionCodeSettings))
        .then(successResetLinkSendingInform)
        .then(() => router.push({ name: "login" }))
        .catch(errorResetLinkSendingInform);
    },
    confirmNewUserPassword(newPass: string, route: RouteLocationNormalizedLoadedGeneric) {
      const oobCode = (route.query.oobCode as string) || "";
      if (!oobCode) return needToGetNewResetLink();
      return confirmPasswordReset(getAuth(), oobCode, newPass)
        .then(successPasswordResetInform)
        .then(() => router.push({ name: "login" }))
        .catch(errorPasswordResetInform);
    },
    changeUserPassword(oldPass: string, newPass: string) {
      return validatePassword(getAuth(), oldPass)
        .then((e) => !e.isValid && Promise.reject(new Error("Old password is wrong")))
        .then(() => updatePassword(getAuth().currentUser as User, newPass))
        .then(successPasswordUpdateInform)
        .catch(errorPasswordChangeInform);
    },
    logOut() {
      return signOut(getAuth()).catch((e) => console.log(e));
    },
  },
});
