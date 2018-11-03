# react-text-translate

React text translation with dictionaries. An easy to use and flexible library to fullfill your translation needs:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Text from 'react-text-translate';
import dictionary from './dictionary';

ReactDOM.render((
  <Text language="ja" dictionary={dictionary}>
    <p><Text greetings /></p>
    <p><Text farewell name="Francisco" /></p>
  </Text>
), document.querySelector('#root'));
```

We define our dictionary as an object of objects. The first level is the key that we pass to `Text`, the second is each of the languages:

```js
export default {
  greetings: {
    en: 'Hello world!',
    ja: 'こんにちは、世界！'
  },
  farewell: {
    en: ({ name }) => `Bye ${name}!`,
    ja: ({ name }) => `さよなら、${name.toUpperCase()}さん！`
  }
};
```

The value can be a string, a component or a function that returns any of those.



## Defining the context

You have to define first how the text will behave by injecting the dictionary and the language (defaults to `en`). Then any child of this element will use those:

```js
<Text language="en" dictionary={dictionary}>
  <p>{/* Here the language will be English */}</p>
</Text>
```

If you set the language or the dictionary again with children, then these will be defined for that part:

```js
<Text language="en" dictionary={dictionary}>
  <p>{/* Here the language will be English */}</p>
  <Text language="ja">
    <p>{/* Here the language will be Japanese */}</p>
  </Text>
</Text>
```

> Note: do not nest them unless you *really* need to. A single root is highly preferred, similar to how `react-router`'s <Router> works.



## Injecting the text

To display one of the dictionary entries, create a **self-closing tag** with the corresponding dictionary key:

```js
const dictionary = {
  greetings: {
    en: 'Hello world!',
    ja: 'こんにちは、世界！'
  }
};

// Usage; the prop 'greetings' will correspond to the dictionary key 'greetings'
export default () => (
  <Text language="ja" dictionary={dictionary}>
    <Text greetings />
  </Text>
);
```

The dictionary can also be a function, which in this case will behave in the same way:

```js
const dictionary = {
  greetings: {
    en: () => 'Hello world!',
    ja: () => 'こんにちは、世界！'
  }
};
```

The advantage of defining them as a function is that it will receive any prop that you pass to the element. You can then localize the text properly depending on the language, and even provide defaults easily:

```js
const dictionary = {
  greetings: {
    en: ({ name = 'World' }) => `Hello ${name}!`,
    ja: ({ name = '世界' }) => `こんにちは、${name.toUpperCase()}さん！`
  }
};

// The prop passed as `name` will be received in the dictionary
export default () => (
  <Text language="ja" dictionary={dictionary}>
    <Text greetings name="Francisco" />
  </Text>
);
```

The props that you can pass can be either strings or numbers, but right now you cannot pass a boolean like `<Text greetings isUser={true} />`. We might lift this limitation in the future.
