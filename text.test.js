import React from 'react';
import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Text from './text';

configure({ adapter: new Adapter() });

const dictionary = {
  greetings: {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ja: 'こんにちは、世界！'
  },
  farewell: {
    en: ({ name = 'World' }) => `Hello ${name}!`,
    es: ({ name = 'Mundo'}) => `¡Adiós ${name}!`,
    ja: ({ name = '世界' }) => `さよなら、${name.toUpperCase()}さん！`
  }
};

describe('text', () => {
  it('is defined', () => {
    const text = render(
      <Text language="ja" dictionary={dictionary}>
        <p><Text greetings /></p>
        <p><Text farewell name="Francisco" /></p>
      </Text>
    ).text();
    expect(text).toBe('こんにちは、世界！さよなら、FRANCISCOさん！');
  });
})
