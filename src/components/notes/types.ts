type CreateNoteForm = {
  title: string;
  tags: string[];
  text: string;
};

type CommaHandler = (
  event: KeyboardEvent,
  commaTrigger: (flag: boolean) => void,
  commaFlag: boolean,
) => void;

export type { CreateNoteForm, CommaHandler };
