type NoteData = {
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
  id: string;
};

type UserNotesState = { notesList: NoteData[]; searchQuery: string; listLoading: boolean };

export type { NoteData, UserNotesState };
