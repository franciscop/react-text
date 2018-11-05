import normalize from './normalize';

describe('normalize', () => {
  it('returns the original for normalized ones', () => {
    const dict = {};
    expect(normalize(dict)).toEqual(dict);
  });

  it('works with a simple dictionary', () => {
    const dict = normalize({
      greetings: {
        en: 'Hello world',
        es: 'Hola mundo'
      }
    });
    expect(dict.greetings('en')).toEqual('Hello world');
  });

  it('does nothing for a normalized one', () => {
    const dict = normalize({
      greetings: {
        en: 'Hello world',
        es: 'Hola mundo'
      },
      farewell: {
        en: 'Bye world',
        es: 'Adiós mundo'
      }
    });
    expect(dict.greetings('en')).toEqual('Hello world');
    expect(dict.farewell('en')).toEqual('Bye world');
    expect(dict.greetings('es')).toEqual('Hola mundo');
    expect(dict.farewell('es')).toEqual('Adiós mundo');
  });

  it('can use options', () => {
    const dict = normalize({
      greetings: {
        en: ({ name }) => `Hello ${name}`,
        es: ({ name }) => `Hola ${name}`
      },
      farewell: {
        en: ({ name = 'World' }) => `Bye ${name}`,
        es: ({ name = 'Mundo' }) => `Adiós ${name}`
      }
    });

    expect(dict.greetings('en')).toEqual('Hello undefined');
    expect(dict.greetings('es')).toEqual('Hola undefined');
    expect(dict.greetings('en', { name: 'Francisco' })).toEqual('Hello Francisco');
    expect(dict.greetings('es', { name: 'Francisco' })).toEqual('Hola Francisco');

    expect(dict.farewell('en')).toEqual('Bye World');
    expect(dict.farewell('es')).toEqual('Adiós Mundo');
    expect(dict.farewell('en', { name: 'Francisco' })).toEqual('Bye Francisco');
    expect(dict.farewell('es', { name: 'Francisco' })).toEqual('Adiós Francisco');
  });

  it('throws with inconsistent languages', () => {
    const thrower = () => {
      dict({
        greetings: {
          en: 'Hello world',
          es: 'Hola mundo'
        },
        farewell: {
          en: 'Bye world',
          ja: 'Adiós mundo'
        }
      });
    };
    expect(thrower).toThrow();
  });
});
