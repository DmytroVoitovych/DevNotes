import type { Component } from 'vue';

type HomeRoutes = 'home' | 'notes' | 'archivednotes' | 'createnote';

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
