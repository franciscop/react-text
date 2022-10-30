import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: { file: "index.min.js", format: "esm" },
  external: ["react"],
  plugins: [
    babel({
      exclude: "node_modules/**",
      presets: [
        ["@babel/env", { targets: { node: 12 } }],
        "@babel/preset-react",
      ],
    }),
    terser(),
  ],
};
