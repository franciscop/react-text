export default (...args) => {
  // Allow for an array of arguments that are all objects
  const dictionary = Object.assign({}, ...args);

  let languages;

  Object.keys(dictionary).forEach(key => {
    const entry = dictionary[key];

    // Already parsed
    if (typeof entry === 'function') return;

    // Retrieve a list of the languages, that must be the same in every entry
    const langs = Object.keys(entry);
    if (!languages) languages = langs;
    if (JSON.stringify(languages) !== JSON.stringify(langs)) {
      throw new Error(`Wrong amount of languages, expected '${languages}' but got '${langs}'`);
    }

    for (let lang of languages) {
      const value = dictionary[key][lang];
      if (typeof value === 'string') {
        entry[lang] = (() => value);
      }
    }

    dictionary[key] = (lang, ...args) => {
      const fn = entry[lang] || Object.values(entry)[0];
      return fn(Object.assign({}, ...args));
    };
  });

  return dictionary;
};
