import type { ComponentType, ReactNode } from "react";

let Text: ComponentType<{ children?: ReactNode }> = ({ children }) => (
  <>{children}</>
);

// Attempt to load React Native if it's a dependency so that it is wrapped there
const globalReq =
  typeof (globalThis as Record<string, unknown>).require === "function"
    ? ((globalThis as Record<string, unknown>).require as (
        id: string,
      ) => Record<string, unknown>)
    : null;
if (globalReq) {
  try {
    Text = globalReq("react-native").Text as ComponentType<{
      children?: ReactNode;
    }>;
  } catch (error) {}
}

export default Text;
