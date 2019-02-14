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

  it('can render a non-translated string', () => {
    // Note: need the <Text> here to match it properly
    const text = shallow(
      <Text>
        Hello world
      </Text>
    ).html();
    expect(text).toBe('Hello world');
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

  it('can be nested', () => {
    const text = render(
      <Text language="ja">
        <Text dictionary={dictionary}>
          <p><Text farewell name="Francisco" /></p>
        </Text>
      </Text>
    ).text();
    expect(text).toBe('さよなら、FRANCISCOさん！');
  });

  it('can accept empty dictionary language', () => {
    const text = render(
      <Text language="es" dictionary={{ greetings: { en: '', es: '' } }}>
        <p><Text greetings /></p>
      </Text>
    ).text();
    expect(text).toBe('');
  });

  it('rejects without dictionary', () => {
    const text = () => render(
      <Text language="ja">
        <p><Text greetings /></p>
      </Text>
    );
    expect(text).toThrow();
  });

  it('rejects without id', () => {
    const text = () => render(
      <Text language="ja" dictionary={dictionary}>
        <p><Text /></p>
      </Text>
    );
    expect(text).toThrow();
  });

  it('rejects with invalid id', () => {
    const text = () => render(
      <Text language="en" dictionary={dictionary}>
        <p><Text hasdadsadds /></p>
      </Text>
    );
    expect(text).toThrow(/Couldn't find/);
  });

  it('rejects with several ids', () => {
    const text = () => render(
      <Text language="en" dictionary={dictionary}>
        <p><Text greetings farewell /></p>
      </Text>
    );
    expect(text).toThrow(/a single id/);
  });

  it('rejects with undefined language', () => {
    const text = () => render(
      <Text language="ru" dictionary={dictionary}>
        <p><Text greetings /></p>
      </Text>
    );
    expect(text).toThrow(/The language 'ru' is not available/);
  });
});



describe('text with render', () => {
  it('can render correctly', () => {
    const text = render(
      <Text language="ja" dictionary={dictionary}>
        <Text greetings render={text => <p>{text}</p>} />
        <Text farewell name="Francisco" render={text => <p>{text}</p>} />
      </Text>
    ).text();
    expect(text).toBe('こんにちは、世界！さよなら、FRANCISCOさん！');
  });

  it('can render correctly with id', () => {
    const text = render(
      <Text language="ja" dictionary={dictionary}>
        <Text id="greetings" render={text => <p>{text}</p>} />
      </Text>
    ).text();
    expect(text).toBe('こんにちは、世界！');
  });

  it('renders with default props', () => {
    const text = render(
      <Text language="ja" dictionary={dictionary}>
        <Text farewell render={text => <p>{text}</p>} />
      </Text>
    ).text();
    expect(text).toBe('さよなら、世界さん！');
  });

  it('renders with the passed props', () => {
    const text = render(
      <Text language="ja" dictionary={dictionary}>
        <Text farewell name="Francisco" render={text => <p>{text}</p>} />
      </Text>
    ).text();
    expect(text).toBe('さよなら、FRANCISCOさん！');
  });
});



describe('text with component', () => {
  it('can do the component', () => {
    const text = render(
      <Text language="es">
        <p><Text en component={'Hello world!'} /></p>
        <p><Text es component={'¡Hola mundo!'} /></p>
        <p><Text ja component={'こんにちは、世界！'} /></p>
      </Text>
    ).text();
    expect(text).toBe('¡Hola mundo!');
  });

  it('can do the component with explicit language', () => {
    const text = render(
      <Text language="es">
        <p><Text en component={'Hello world!'} /></p>
        <p><Text es component={'¡Hola mundo!'} /></p>
        <p><Text ja component={'こんにちは、世界！'} /></p>
      </Text>
    ).text();
    expect(text).toBe('¡Hola mundo!');
  });
});
