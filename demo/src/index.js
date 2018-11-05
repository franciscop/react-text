import React from 'react';
import ReactDOM from 'react-dom';
import Text from 'react-text-translate';

const dictionary = {
  greetings: {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ja: 'こんにちは、世界'
  },
  lang: {
    en: '🇬🇧',
    es: '🇪🇸',
    ja: '🇯🇵'
  },
  farewell: {
    en: ({ name }) => `Bye ${name}!`,
    es: ({ name }) => `¡Adiós, ${name}!`,
    ja: ({ name }) => `さよなら、${name.toUpperCase()}さん！`
  }
};

ReactDOM.render((
  <Text language="es" dictionary={dictionary}>
    <h2>Plain case <Text lang /></h2>
    <p><Text greetings /></p>
    <p><Text farewell name="Francisco" /></p>

    <h2>Render <Text lang /></h2>
    <Text greetings render={text => <img alt={text} />} />

    <h2>Component <Text lang /></h2>
    <Text en component={<p>🇬🇧</p>} />
    <Text es component={<p>🇪🇸</p>} />
    <Text ja component={<p>🇯🇵</p>} />

    <Text language="ja">
      <h2>Children (sub classing) <Text lang /></h2>
      <p><Text farewell name="Francisco" /></p>
    </Text>

    <Text language="ja" dictionary={{ farewell: { en: 'Bye', es: 'Xao', ja: 'バイバイ' } }}>
      <h2>Extending the dictionary <Text lang /></h2>
      <p><Text farewell /></p>
    </Text>
  </Text>
), document.getElementById('root'));
