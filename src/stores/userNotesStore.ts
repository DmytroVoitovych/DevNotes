import { defineStore } from 'pinia';
import type { NoteData, UserNotesState } from './types';
import type { CreateNoteForm } from '@/components/notes/types';
import { getDatabase, push, ref, set } from 'firebase/database';
import { noteAdded } from './helpers';

export const userNotesStore = defineStore('userNotes', {
  state(): UserNotesState {
    return {
      notesList: [],
    };
  },
  getters: {
    isNotesListEmpty: (state): boolean => state.notesList.length === 0,
  },
  actions: {
    createJsonObject({ title, tags, text, lastEdited, isArchived }: CreateNoteForm, id: string) {
      return JSON.stringify({ title, tags, content: text, lastEdited, isArchived, id });
    },
    addNote(body: CreateNoteForm, id: string) {
      const db = getDatabase();
      const jsonBody = this.createJsonObject(body, id);
      const newNoteRef = push(ref(db, 'notes'));

      return set(newNoteRef, jsonBody)
        .then(() => this.notesList.unshift(JSON.parse(jsonBody)))
        .then(noteAdded)
        .catch((e) => console.log(e, 'err'));
    },
  },
});
