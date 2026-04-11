type NormalizedFn = {
  (props: Record<string, unknown>): string;
  normalized: true;
};

type RawValue =
  | string
  | ((props: Record<string, unknown>) => string)
  | NormalizedFn;
type RawEntry = Record<string, RawValue>;
export type Dictionary = Record<string, RawEntry>;
export type NormalizedDictionary = Record<string, Record<string, NormalizedFn>>;

export default (...args: Dictionary[]): NormalizedDictionary => {
  const dictionary: Dictionary = Object.assign({}, ...args);

  let languages: string[] | undefined;

  return Object.keys(dictionary).reduce<NormalizedDictionary>((dict, key) => {
    const langs = Object.keys(dictionary[key]);
    if (!languages) languages = langs;
    if (
      JSON.stringify([...languages].sort()) !== JSON.stringify([...langs].sort())
    ) {
      throw new Error(
        `Inconsistent languages, expected '${languages}' but got '${langs}'`,
      );
    }

    return {
      ...dict,
      [key]: languages.reduce<Record<string, NormalizedFn>>((obj, lang) => {
        const value = dictionary[key][lang];
        if (value && (value as NormalizedFn).normalized) {
          return { ...obj, [lang]: value as NormalizedFn };
        }
        if (typeof value === "function") {
          const fn = ((props: Record<string, unknown> = {}) =>
            value(props)) as NormalizedFn;
          fn.normalized = true;
          return { ...obj, [lang]: fn };
        }
        if (typeof value === "string") {
          const fn = (() => value) as unknown as NormalizedFn;
          fn.normalized = true;
          return { ...obj, [lang]: fn };
        }
        throw new Error(`Value cannot be of type "${typeof value}"`);
      }, {}),
    };
  }, {});
};
