import type { Component } from 'vue';

type AuthRoutes = 'login' | 'signup' | 'forgot' | 'reset';
type HomeRoutes = 'home' | 'notes' | 'archivednotes' | 'createnote';
type PageContent = Record<AuthRoutes, Record<string, string | Component>>;

export type { AuthRoutes, PageContent };
