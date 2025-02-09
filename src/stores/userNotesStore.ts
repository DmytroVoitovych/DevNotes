import { defineStore } from 'pinia';
import type { NoteData, UserNotesState } from './types';
import type { CreateNoteForm } from '@/components/notes/types';
import { getDatabase, push, ref, set } from 'firebase/database';
import { noteAdded } from './helpers';

export const userNotesStore = defineStore('userNotes', {
  state(): UserNotesState {
    return {
      notesList: [],
      searchQuery: '',
    };
  },
  getters: {
    isNotesListEmpty: (state): boolean => state.notesList.length === 0,
    getAllNotes: (state) => state.notesList.filter((e) => !e.isArchived),
    getArchivedNotes: (state) => state.notesList.filter((e) => e.isArchived),
    getUniqueTags: (state) => Array.from(new Set(state.notesList.flatMap((e) => e.tags))),
    getNotesByTagParametr: (state) => (tag: string) =>
      state.notesList.filter((e) => e.tags.includes(tag)),
    getNotesByQuery: (state) =>
      state.notesList.filter((e) => JSON.stringify(e).includes(state.searchQuery)),
    getNotesById: (state) => (id: string) => state.notesList.find((e) => e.id === id),
  },
  actions: {
    createJsonObject({ title, tags, text, lastEdited, isArchived }: CreateNoteForm, id: string) {
      return JSON.stringify({ title, tags, content: text, lastEdited, isArchived, id });
    },
    syncStorageAndDatabase(data: string[]) {
      console.log('sinc');
      this.notesList = data.map((e: string) => JSON.parse(e)).toReversed();
    },
    addNote(body: CreateNoteForm) {
      const db = getDatabase();

      const newNoteRef = push(ref(db, 'notes'));
      const noteId = newNoteRef.key;
      const jsonBody = this.createJsonObject(body, noteId as string);

      return set(newNoteRef, jsonBody)
        .then(() => this.notesList.unshift(JSON.parse(jsonBody)))
        .then(noteAdded)
        .catch((e) => console.log(e, 'err'));
    },
  },
});
