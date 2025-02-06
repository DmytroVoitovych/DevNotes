type CreateNoteForm = {
  title: string;
  tags: string[];
  text: string;
  lastEdited: string;
  isArchived: boolean;
};

type CommaHandler = (
  event: KeyboardEvent,
  commaTrigger: (flag: boolean) => void,
  commaFlag: boolean,
) => void;

export type { CreateNoteForm, CommaHandler };
