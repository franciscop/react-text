import React, { createContext, createElement } from 'react';
import normal from './normalize';
import find from './find';
const { Provider, Consumer } = createContext({});

export const normalize = normal;

export default ({ language, dictionary = {}, children, render, component, ...props }) => (
  <Consumer>
    {value => {
      // We only care about language or dictionary at the same level when we have children
      if (children) {
        language = language || value.language;
        dictionary = { ...value.dictionary, ...normal(dictionary) };
        return <Provider value={{ language, dictionary }}>{children}</Provider>;
      }

      // The component prop was passed, render only for the right language
      if (component) return props[value.language] === true ? component : null;

      // The render prop was passed, render into the children instead
      if (render) return render(find({ ...value, ...props }));

      // Normal id value
      return find({ ...value, ...props });
    }}
  </Consumer>
);
