import React from 'react';
import ReactDOM from 'react-dom';
import Text from './Text';

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
  <Text language="es" dictionary={dictionary}>
    <h2>Plain case</h2>
    <p><Text greetings /></p>
    <p><Text farewell name="Francisco" /></p>

    <h2>Render and component</h2>
    <Text greetings render={text => <img alt={text} />} />
    <Text en component={<p>🇬🇧</p>} />
    <Text es component={<p>🇪🇸</p>} />
    <Text ja component={<p>🇯🇵</p>} />

    <h2>Sub classing</h2>
    <Text language="ja">
      <p><Text farewell name="Francisco" /></p>
    </Text>

    <h2>Extending the dictionary</h2>
    <Text language="ja" dictionary={{ farewell: { en: 'Bye', es: 'Xao', ja: 'バイバイ' } }}>
      <p><Text farewell /></p>
    </Text>
  </Text>
), document.getElementById('root'));
