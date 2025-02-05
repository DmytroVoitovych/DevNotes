import { defineStore } from 'pinia';

const userNotesStore = defineStore('userNotes', {
  state() {
    return {
      notesList: [],
    };
  },
  getters: {
    isNotesListEmpty: (state): boolean => state.notesList.length === 0,
  },
});
