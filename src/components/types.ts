import type { Component } from "vue";

type HomeRoutes = "home" | "notes" | "archivednotes" | "tags" | "tag" | "search" | "settings";
type DialogTriggerName = "archive" | "delete";

type ModalInnerContent = { title: string; content: string; buttonContent: string };

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

export type { HomeRoutes, HomePageContent, DialogTriggerName, ModalInnerContent };
