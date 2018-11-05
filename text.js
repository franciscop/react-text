import normalize from './normalize';
import detect from './detect';
import { createContext, createElement } from 'react';

const { Provider, Consumer } = createContext({});

const find = ({ dictionary, language, ...props }) => {
  if (!dictionary) return false;
  const keys = Object.entries(props).filter(([k, v]) => typeof v === 'boolean').map(([k]) => k);
  if (!keys.length) throw new Error('Please make sure to pass a key');
  if (!keys.length > 1) throw new Error(`Please only pass one key/boolean, detected '${keys}'`);
  const key = keys[0];
  if (!dictionary[key]) throw new Error(`Couldn't find the key '${key}' in the dictionary`);
  return dictionary[key](language, props);
};

export default ({ children, render, component, dictionary = {}, language, ...props }) => {
  if (dictionary) dictionary = normalize(dictionary);
  if (children) {
    return createElement(Consumer, {}, ({ language: oldLang, dictionary: oldDict }) => {
      const value = {
        language: language || oldLang || detect(),
        dictionary: normalize({ ...oldDict, ...dictionary })
      };
      // return <Provider value={value}>{children}</Provider>;
      return createElement(Provider, { value }, children);
    });
  }
  if (component) {
    // return <Consumer>{value => Object.keys(props).includes(language) ? component : null}</Consumer>;
    return createElement(Consumer, {}, value => {
      return Object.keys(props).includes(value.language || language) ? component : null;
    });
  }
  if (render) {
    // return <Consumer>{value => render(find({ ...value, ...props }))}</Consumer>;
    return createElement(Consumer, {}, value => render(find({ ...value, ...props })));
  }
  // return <Consumer>{value => find({ ...value, ...props })}</Consumer>;
  return createElement(Consumer, {}, value => find({ ...value, ...props }));
}
