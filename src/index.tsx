import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import find from "./find";
import type { Dictionary, NormalizedDictionary } from "./normalize";
import normal from "./normalize";
import Text from "./Text";

type TextContext = {
  language?: string;
  dictionary?: NormalizedDictionary;
};

const Context = createContext<TextContext>({});
const { Provider } = Context;

export type { Dictionary };

export default ({
  language: lang,
  dictionary: dict = {},
  children,
  render,
  component,
  ...props
}: {
  language?: string;
  dictionary?: Dictionary;
  children?: ReactNode;
  render?: (text: string) => ReactNode;
  component?: ReactNode;
  id?: string;
  [key: string]: unknown;
}) => {
  const value = useContext(Context);

  // We only care about language or dictionary at the same level when we have children
  if (children) {
    const language = lang || value.language;
    const dictionary = { ...value.dictionary, ...normal(dict) };
    return <Provider value={{ language, dictionary }}>{children}</Provider>;
  }

  // The component prop was passed, render only for the right language
  if (component || component === 0) {
    if (!value.language) return null;
    if (!(value.language in props)) return null;
    return component;
  }

  // Generate the string to render
  const output = find({ ...value, ...props });

  // The render prop was passed, render into the children instead
  if (render) return render(output);

  // Normal id value
  return <Text>{output}</Text>;
};
