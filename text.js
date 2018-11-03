import { createContext, createElement } from 'react';

const { Provider, Consumer } = createContext({ language: 'en' });

const find = ({ dictionary, language, ...props }) => {
  const keys = Object.entries(props).filter(([k, v]) => typeof v === 'boolean').map(([k]) => k);
  if (!keys.length) throw new Error('Please make sure to pass a key');
  if (!keys.length > 1) throw new Error(`Please only pass one key/boolean, detected '${keys}'`);
  const key = keys[0];
  if (!dictionary[key]) throw new Error(`Couldn't find the key '${key}' in the dictionary`);
  const text = dictionary[key][language];
  if (!text) throw new Error(`Could not find the translation in '${language}' for the key '${key}'`);
  if (typeof text === 'string') return text;
  return text(props);
};

export default ({ children, dictionary, language = 'en', ...props }) => {
  if (children) return createElement(Provider, { value: { language, dictionary }}, children);
  return createElement(Consumer, {}, value => find({ ...value, ...props }));
}
