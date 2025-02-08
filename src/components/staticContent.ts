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
  tags: {
    title: 'Tags',
    description: {
      content: '',
      show: false,
    },
    info: {
      content: '',
      link: false,
    },
  },
  tag: {
    title: 'Notes Tagged:',
    description: {
      content: 'All notes with the [] tag are shown here.',
      show: true,
    },
    info: {
      content: '',
      link: false,
    },
  },
  search: {
    title: 'Search',
    description: {
      content: 'All notes matching [] are displayed below.',
      show: true,
    },
    info: {
      content: 'No notes match your search. Try a different keyword or create a new note.',
      link: true,
    },
  },
};
