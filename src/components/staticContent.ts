import type { HomePageContent, HomeRoutes } from './types';

export const notesContent: Record<HomeRoutes, HomePageContent> = {
  home: {
    title: 'All Notes',
    description: {
      content: '',
      show: false,
    },
    info: {
      content: 'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.',
      link: false,
    },
  },
  notes: {
    title: 'All Notes',
    description: {
      content: '',
      show: false,
    },
    info: {
      content: 'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.',
      link: false,
    },
  },
  archivednotes: {
    title: 'Archived Notes',
    description: {
      content: 'All your archived notes are stored here. You can restore or delete them anytime.',
      show: true,
    },
    info: {
      content:
        'No notes have been archived yet. Move notes here for safekeeping, or create a new note.',
      link: true,
    },
  },
};
