import type { Ref, ToRefs } from "vue";
import type { CommaHandler, CreateNoteForm } from "./types";
import type { NoteData } from "@/stores/types";

export const enterEvent = () =>
  new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    which: 13,
  });

const optionsDate: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

const chars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

export const uniqueTagsControl = (newArr: string[], prevArr: string[]) => {
  const isExist = newArr.length > prevArr.length && prevArr.includes(newArr.at(-1) as string);
  if (isExist) {
    newArr.length = newArr.length - 1;
  }
  return;
};

export const handleCommaCode: CommaHandler = (event, commaTrigger, commaFlag) => {
  if (event.code === "Comma") {
    commaTrigger(true);
    const input = event.target as HTMLInputElement;
    const handeledValue = input.value.trim();

    input.value = "";
    event.preventDefault();
    if (handeledValue) {
      input.dispatchEvent(enterEvent());
    }

    return;
  }
  if (event.code === "Enter" || event.code === "NumpadEnter") {
    if (!commaFlag) return event.stopImmediatePropagation();
    commaTrigger(false);
    return;
  }
};

export const getLocalDate = (): string => new Date().toLocaleDateString(undefined, optionsDate);

const randomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

const createId = (arr: string[], n: number) => {
  let str = "";

  return function createStr(): string {
    str += arr[randomInteger(0, arr.length - 1)];
    if (str.length !== n) {
      return createStr();
    } else {
      const id: string = str;
      str = "";
      return id;
    }
  };
};

export const idCustom = createId(chars, 10);

export const setupNoteFormData = (
  form: ToRefs<CreateNoteForm>,
  activenote: NoteData | undefined,
  reset: (e?: MouseEvent) => void,
) => {
  if (activenote) {
    form.title.value = activenote?.title || "No data";
    form.text.value = activenote?.content || "No data";
    form.isArchived.value = !!activenote?.isArchived;
    form.lastEdited.value = activenote?.lastEdited || "No data";
    form.tags.value = activenote?.tags || [];
    return;
  } else {
    reset();
  }
};
