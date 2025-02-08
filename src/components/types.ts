import type { Component } from 'vue';

type HomeRoutes = 'home' | 'notes' | 'archivednotes' | 'tags' | 'tag' | 'search';

type HomePageContent = {
  title: string;
  description: {
    content: string;
    show: boolean;
  };
  info: {
    content: string;
    link: boolean;
  };
};

export type { HomeRoutes, HomePageContent };
