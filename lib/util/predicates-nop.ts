import type { Chapter, Options } from './validate';

export function isString(str: unknown): str is string {
  return typeof str === 'string' || str instanceof String;
}

export function validateIsOptions(options: unknown): asserts options is Options {
  // do nothing
}

export function validateIsOptionsOrTitle(optionsOrTitle: unknown): asserts optionsOrTitle is Options | string {
  // do nothing
}

export function validateIsChapters(chapters: unknown): asserts chapters is readonly Chapter[] {
  // do nothing
}

export function validateIsVarargArray(args: unknown): asserts args is (number | boolean)[] {
  // do nothing
}