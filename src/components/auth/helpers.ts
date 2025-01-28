import MainFormElements from './MainFormElements.vue';
import type { PageContent } from './types';
import ForgotPassword from './ForgotPassword.vue';

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

export { currentContent, formEmailRules, formPasswordRules };
