import React from 'react';
import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Text from './text';
import { decode } from 'he';

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
  it('can render correctly', () => {
    const text = render(
      <Text language="ja" dictionary={dictionary}>
        <p><Text greetings /></p>
        <p><Text farewell name="Francisco" /></p>
      </Text>
    ).text();
    expect(text).toBe('こんにちは、世界！さよなら、FRANCISCOさん！');
  });

  it('can render correctly with id', () => {
    const text = render(
      <Text language="ja" dictionary={dictionary}>
        <p><Text id="greetings" /></p>
      </Text>
    ).text();
    expect(text).toBe('こんにちは、世界！');
  });

  it('renders with default props', () => {
    const text = render(
      <Text language="ja" dictionary={dictionary}>
        <p><Text farewell /></p>
      </Text>
    ).text();
    expect(text).toBe('さよなら、世界さん！');
  });

  it('renders with the passed props', () => {
    const text = render(
      <Text language="ja" dictionary={dictionary}>
        <p><Text farewell name="Francisco" /></p>
      </Text>
    ).text();
    expect(text).toBe('さよなら、FRANCISCOさん！');
  });
})
