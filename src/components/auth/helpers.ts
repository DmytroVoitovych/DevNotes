import MainFormElements from './MainFormElements.vue';
import type { PageContent } from './types';
import ForgotPassword from './ForgotPassword.vue';
import { ElNotification } from 'element-plus';

import ResetPassword from './ResetPassword.vue';

const currentContent: PageContent = {
  login: {
    'h-text': 'Welcome to Note',
    'p-description': 'Please log in to continue',
    'tip-content': 'No account yet?',
    component: MainFormElements,
  },
  signup: {
    'h-text': 'Create Your Account',
    'p-description': 'Sign up to start organizing your notes and boost your productivity.',
    'tip-content': 'Already have an account?',
    component: MainFormElements,
  },
  forgot: {
    'h-text': 'Forgotten your password?',
    'p-description': 'Enter your email below, and we’ll send you a link to reset it.',
    component: ForgotPassword,
  },
  reset: {
    'h-text': 'Reset Your Password',
    'p-description': 'Choose a new password to secure your account.',
    component: ResetPassword,
  },
};

const formEmailRules = [
  {
    type: 'email',
    message: 'Please enter a valid email address.',
    trigger: 'blur',
  },
];

const formPasswordRules = [
  {
    min: 8,
    trigger: 'blur',
    message: 'Password must be at least 8 characters',
  },
];

const firebaseCode: { email: string; password: string; account: string } = {
  email: 'auth/invalid-credential',
  password: 'auth/wrong-password',
  account: 'auth/user-not-found',
};

const registrationFirebaseCode: { email: string; weak: string; exists: string } = {
  email: 'auth/invalid-email',
  weak: 'auth/weak-password',
  exists: 'auth/email-already-in-use',
};

const googleAuthFirebaseCode: { popup: string; cancelled: string; network: string } = {
  popup: 'auth/popup-blocked',
  cancelled: 'auth/cancelled-popup-request',
  network: 'auth/network-request-failed',
};

const authErrorHandler = (errorCode: string) => {
  console.log('err', errorCode);
  switch (errorCode) {
    case firebaseCode.email:
      console.log('invalid-credential');
      ElNotification({
        title: 'Login error',
        message: 'invalid-credential',
        type: 'error',
      });
      break;
    case firebaseCode.password:
      console.log('incorect password');
      ElNotification({
        title: 'Login error',
        message: 'incorect password',
        type: 'error',
      });
      break;
    case firebaseCode.account:
      console.log('Account does not exist');
      ElNotification({
        title: 'Login error',
        message: 'Account does not exist',
        type: 'error',
      });
      break;
    default:
      console.log('wrong password or email');
      ElNotification({
        title: 'Login error',
        message: 'wrong password or email',
        type: 'error',
      });
      break;
  }
};

const registrationErrorHandler = (errorCode: string) => {
  console.log('err', errorCode);
  switch (errorCode) {
    case registrationFirebaseCode.email:
      console.log('Invalid email format');
      ElNotification({
        title: 'Registration error',
        message: 'Please enter a valid email address',
        type: 'error',
      });
      break;
    case registrationFirebaseCode.weak:
      console.log('Password is too weak');
      ElNotification({
        title: 'Registration error',
        message: 'Password should be at least 6 characters long',
        type: 'error',
      });
      break;
    case registrationFirebaseCode.exists:
      console.log('Email already in use');
      ElNotification({
        title: 'Registration error',
        message: 'An account with this email already exists',
        type: 'error',
      });
      break;
    default:
      console.log('Registration failed');
      ElNotification({
        title: 'Registration error',
        message: 'Registration failed. Please try again',
        type: 'error',
      });
      break;
  }
};

const googleAuthErrorHandler = (errorCode: string) => {
  console.log('err', errorCode);
  switch (errorCode) {
    case googleAuthFirebaseCode.popup:
      console.log('Popup blocked by browser');
      ElNotification({
        title: 'Google Login Error',
        message: 'Please allow popups for this site to login with Google',
        type: 'error',
      });
      break;
    case googleAuthFirebaseCode.cancelled:
      console.log('Login cancelled by user');
      ElNotification({
        title: 'Google Login Cancelled',
        message: 'Google sign in was cancelled',
        type: 'error',
      });
      break;
    case googleAuthFirebaseCode.network:
      console.log('Network error');
      ElNotification({
        title: 'Network Error',
        message: 'Please check your internet connection and try again',
        type: 'error',
      });
      break;
    default:
      console.log('Google sign in failed');
      ElNotification({
        title: 'Login Error',
        message: 'Google sign in failed. Please try again',
        type: 'error',
      });
      break;
  }
};

export {
  currentContent,
  formEmailRules,
  formPasswordRules,
  authErrorHandler,
  registrationErrorHandler,
  googleAuthErrorHandler,
};
