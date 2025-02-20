import { defineStore } from "pinia";
import type { NoteData, UserNotesState } from "./types";
import type { CreateNoteForm } from "@/components/notes/types";
import { getDatabase, push, ref, remove, set, update } from "firebase/database";
import { noteAdded, noteChanged, noteDeleted, noteUpdated } from "./helpers";
import { getAuth } from "firebase/auth";

export const userNotesStore = defineStore("userNotes", {
  state(): UserNotesState {
    return {
      notesList: [],
      searchQuery: "",
      listLoading: false,
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
      state.notesList.filter((e) =>
        JSON.stringify(e).toLowerCase().includes(state.searchQuery.toLocaleLowerCase()),
      ),
    getNotesById: (state) => (id: string) => state.notesList.find((e) => e.id === id),
    getIndexOfNoteById: (state) => (id: string) => state.notesList.findIndex((e) => e.id === id),
  },
  actions: {
    setListLoading(flag: boolean) {
      this.listLoading = flag;
    },
    createObject({ title, tags, text, lastEdited, isArchived }: CreateNoteForm, id: string) {
      return { title, tags, content: text, lastEdited, isArchived, id };
    },
    syncStorageAndDatabase(data?: NoteData[]) {
      if (data) this.notesList = data.map((e: NoteData) => e).toReversed();
      else this.notesList.length = 0;
    },
    addNote(body: CreateNoteForm) {
      const db = getDatabase();
      const uid = getAuth().currentUser?.uid;

      const newNoteRef = push(ref(db, `notes/${uid}`));
      const noteId = newNoteRef.key;
      const data = this.createObject(body, noteId as string);

      return set(newNoteRef, data)
        .then(() => this.notesList.unshift(data))
        .then(noteAdded)
        .catch((e) => console.log(e, "err"));
    },
    changeExistedNote(body: CreateNoteForm, id: string) {
      const db = getDatabase();
      const uid = getAuth().currentUser?.uid;
      const index = this.getIndexOfNoteById(id);
      const data = this.createObject(body, id);
      this.notesList.splice(index, 1, data);

      return update(ref(db, `notes/${uid}/${id}`), data)
        .then(noteChanged)
        .catch((e) => console.log("Error with changing note", e));
    },
    archiveOrRestoreNote(id: string, date: string) {
      const db = getDatabase();
      const uid = getAuth().currentUser?.uid;
      const index = this.getIndexOfNoteById(id);
      const updatedNote = this.notesList[index];
      updatedNote.isArchived = !updatedNote.isArchived;
      updatedNote.lastEdited = date;

      const updates = {
        [`/notes/${uid}/${id}/isArchived`]: updatedNote.isArchived,
        [`/notes/${uid}/${id}/lastEdited`]: date,
      };

      return update(ref(db), updates)
        .then(() => noteUpdated(this.notesList[index].isArchived))
        .catch((e) => console.log(e));
    },
    deleteNote(id: string) {
      const db = getDatabase();
      const uid = getAuth().currentUser?.uid;
      const index = this.getIndexOfNoteById(id);
      this.notesList.splice(index, 1);
      const noteRef = ref(db, `notes/${uid}/${id}`);

      return remove(noteRef)
        .then(noteDeleted)
        .catch((error) => {
          console.error("Error with deleting", error);
        });
    },
  },
});
