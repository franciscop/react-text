import React, { createContext, createElement } from 'react';
import normal from './normalize';
import find from './find';
const { Provider, Consumer } = createContext({});

let Text = ({ children }) => children;
// Attempt to load React Native if it's a dependency so that it is wrapped there
if (typeof require !== 'undefined') {
  try {
    Text = require('react-native').Text;
  } catch (error) {}
}

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
      if (component) return (
        <Text>{props[value.language] === true ? component : null}</Text>
      );

      // The render prop was passed, render into the children instead
      if (render) return (
        <Text>{render(find({ ...value, ...props }))}</Text>
      );

      // Normal id value
      return <Text>{find({ ...value, ...props })}</Text>;
    }}
  </Consumer>
);
