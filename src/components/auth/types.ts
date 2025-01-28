import type { Component } from 'vue';

type AuthRoutes = 'login' | 'signup' | 'forgot';
type PageContent = Record<AuthRoutes, Record<string, string | Component>>;

export type { AuthRoutes, PageContent };
