export default (...args) => {
  // Allow for an array of arguments that are all objects
  const dictionary = Object.assign({}, ...args);

  let languages;

  return Object.keys(dictionary).reduce((dict, key) => {
    // Retrieve a list of the languages, that must be the same in every entry
    const langs = Object.keys(dictionary[key]);
    if (!languages) languages = langs;
    if (JSON.stringify(languages.sort()) !== JSON.stringify(langs.sort())) {
      throw new Error(`Wrong amount of languages, expected '${languages}' but got '${langs}'`);
    }

    return {
      ...dict,
      [key]: languages.reduce((obj, lang) => {
        const value = dictionary[key][lang];
        if (value && value.normalized) {
          return { ...obj, [lang]: value };
        }
        if (typeof value === 'function') {
          const fn = (props = {}) => value(props);
          fn.normalized = true;
          return { ...obj, [lang]: fn };
        }
        if (typeof value === 'string') {
          const fn = () => value;
          fn.normalized = true;
          return { ...obj, [lang]: fn };
        }
        throw new Error(`Value cannot be of type "${typeof value}"`);
      }, {})
    };
  }, {});
};
