import type { Ref } from 'vue';
import type { CommaHandler } from './types';

export const enterEvent = new KeyboardEvent('keydown', {
  bubbles: true,
  cancelable: true,
  key: 'Enter',
  code: 'Enter',
  keyCode: 13,
  which: 13,
});

export const uniqueTagsControl = (newArr: string[], prevArr: string[]) => {
  const isExist = newArr.length > prevArr.length && prevArr.includes(newArr.at(-1) as string);
  if (isExist) {
    console.log(newArr);
    newArr.length = newArr.length - 1;
  }
  return;
};

export const handleCommaCode: CommaHandler = (event, commaTrigger, commaFlag) => {
  if (event.code === 'Comma') {
    commaTrigger(true);
    const input = event.target as HTMLInputElement;
    const handeledValue = input.value.trim();

    input.value = '';
    event.preventDefault();
    if (handeledValue) {
      input.dispatchEvent(enterEvent);
    }

    return;
  }
  if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    if (!commaFlag) return event.stopImmediatePropagation();
    commaTrigger(false);
    return;
  }
};
