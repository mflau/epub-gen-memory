import ow, { ObjectPredicate, Predicate } from 'ow';
import type { Chapter, Font, LogFn, Options } from './validate';

const name = ow.optional.any(ow.string, ow.array.ofType(ow.string), ow.undefined);
const filename = ow.optional.string.is(s => (s.indexOf('/') === -1 && s.indexOf('\\') === -1) || `Filename must not include slashes, got \`${s}\``);
const filenameReq = ow.string.is(s => (s.indexOf('/') === -1 && s.indexOf('\\') === -1) || `Filename must not include slashes, got \`${s}\``);

const chapterPredicate: ObjectPredicate<Chapter> = ow.object.partialShape({
  title: ow.optional.string,
  author: name,
  content: ow.string,
  excludeFromToc: ow.optional.boolean,
  beforeToc: ow.optional.boolean,
  filename,
  url: ow.optional.string,
});

const fontPredicate: ObjectPredicate<Font> = ow.object.partialShape({
  filename: filenameReq,
  url: ow.string,
});

const optionsPredicate: ObjectPredicate<Options> = ow.object.partialShape({
  title: ow.string,
  author: name,
  publisher: ow.optional.string,
  description: ow.optional.string,
  cover: ow.optional.any(ow.string, ow.object.instanceOf(File) as ObjectPredicate<File>, ow.undefined),
  tocTitle: ow.optional.string,
  tocInTOC: ow.optional.boolean,
  numberChaptersInTOC: ow.optional.boolean,
  prependChapterTitles: ow.optional.boolean,
  date: ow.optional.string,
  lang: ow.optional.string,
  css: ow.optional.string,
  chapterXHTML: ow.optional.string,
  contentOPF: ow.optional.string,
  tocNCX: ow.optional.string,
  tocXHTML: ow.optional.string,
  fonts: ow.optional.any(ow.array.ofType(fontPredicate), ow.undefined),
  version: ow.optional.number.is(x => x === 3 || x === 2 ||
    `Expected version to be 3 or 2, got \`${x}\``),
  fetchTimeout: ow.optional.number.positive,
  retryTimes: ow.optional.number.positive,
  batchSize: ow.optional.number.positive,
  ignoreFailedDownloads: ow.optional.boolean,
  verbose: ow.optional.any(ow.boolean, ow.function as Predicate<LogFn>),
});

export function isString(str: unknown): str is string {
  return ow.isValid(str, ow.string);
}

export function validateIsOptions(options: unknown): asserts options is Options {
  ow(options, 'options', optionsPredicate);
}

export function validateIsOptionsOrTitle(optionsOrTitle: unknown): asserts optionsOrTitle is Options | string {
  ow(optionsOrTitle, ow.any(optionsPredicate, ow.string));
}

export function validateIsChapters(chapters: unknown): asserts chapters is readonly Chapter[] {
  ow(chapters, 'content', ow.array.ofType(chapterPredicate));
}

export function validateIsVarargArray(args: unknown): asserts args is (number | boolean)[] {
  ow(args, ow.array.ofType(ow.any(ow.boolean, ow.number)));
}