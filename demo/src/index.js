import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Text from 'react-text-translate';

const dictionary = {
  greetings: {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ja: 'こんにちは、世界'
  },
  farewell: {
    en: ({ name }) => `Bye ${name}!`,
    es: ({ name }) => `¡Adiós, ${name}!`,
    ja: ({ name }) => `さよなら、${name.toUpperCase()}さん！`
  }
};

ReactDOM.render((
  <Text language="ja" dictionary={dictionary}>
    <p><Text greetings /></p>
    <p><Text farewell name="Francisco" /></p>
  </Text>
), document.getElementById('root'));
