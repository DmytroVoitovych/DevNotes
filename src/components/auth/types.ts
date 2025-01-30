import type { Component } from 'vue';

type AuthRoutes = 'login' | 'signup' | 'forgot' | 'reset';
type PageContent = Record<AuthRoutes, Record<string, string | Component>>;

export type { AuthRoutes, PageContent };
