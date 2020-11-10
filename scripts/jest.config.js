// https://github.com/cnlinge/jest-js-ts-start
// https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs

const fs = require("fs");
const path = require("path");

const createPkgConfigs = () => {
  const moduleNameMapper = {};
  const packages = fs
    .readdirSync(path.resolve(__dirname, "../packages/"))
    .filter((item) => /^([^.]+)$/.test(item));
  packages.forEach((item) => {
    const pkgPath = path.resolve(__dirname, "../packages/", item);
    const { name } = require(path.resolve(pkgPath, "package.json"));
    const pkgRootPath = `<rootDir>/${item}`;
    moduleNameMapper[`^${name}$`] = `${pkgRootPath}/src`;
  });
  return {
    moduleNameMapper,
  };
};

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-node",
  verbose: true,
  testMatch: ["**/test/?(*.)+(spec).[jt]s?(x)"],
  rootDir: "../packages",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: path.resolve(__dirname, "../coverage"),
  collectCoverageFrom: [
    "**/src/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  globals: {
    "ts-jest": {
      babelConfig: {
        plugins: ["@babel/plugin-transform-modules-commonjs"],
      },
    },
  },
  ...createPkgConfigs(),
};
