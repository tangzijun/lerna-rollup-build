// https://babeljs.io/docs/en/babel-plugin-transform-runtime#corejs
// https://www.babeljs.cn/docs/babel-preset-typescript
// https://www.babeljs.cn/docs/babel-preset-react

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: [],
};