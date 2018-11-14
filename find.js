
export default ({ id, dictionary, language, ...props }) => {
  if (!id) {
    const keys = Object.entries(props).filter(([k, v]) => typeof v === 'boolean').map(([k]) => k);
    if (!keys.length) throw new Error('Please make sure to pass an id');
    if (keys.length > 1) throw new Error(`Please only pass a single id/boolean, detected '${keys}'`);
    id = keys[0];
  }
  const ids = Object.keys(dictionary);
  if (!ids.includes(id)) {
    throw new Error(`Couldn't find '${id}' in the dictionary. Available ids: ${ids}`);
  }
  if (typeof dictionary[id][language] === 'undefined') {
    throw new Error(`The language '${language}' is not available (attempted with id '${id}')`);
  }
  return dictionary[id][language](props);
};
