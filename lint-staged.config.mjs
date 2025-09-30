import path from "node:path";
import process from "node:process";

const buildNextLintCommand = (files) =>
  `eslint --fix ${files
    .map((file) => path.relative(process.cwd(), file))
    .join(" ")}`;

/** @type {import("lint-staged").Config} */
const config = {
  "*.{js,jsx,ts,tsx}": [buildNextLintCommand, "prettier --write"],
  "*.{css,md,mdx,json}": "prettier --write",
};

export default config;
