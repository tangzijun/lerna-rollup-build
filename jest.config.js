// https://github.com/cnlinge/jest-js-ts-start

const fs = require("fs");
const path = require("path");
const getPkgConfigs = () => {
  const pkgConfigs = {};
  const packages = fs
    .readdirSync(path.resolve(__dirname, "./packages/"))
    .filter((item) => /^([^.]+)$/.test(item));
  packages.forEach((item) => {
    const pkgPath = path.resolve(__dirname, "./packages/", item);
    const { name } = require(path.resolve(pkgPath, "package.json"));
    pkgConfigs[`^${name}$`] = `<rootDir>/packages/${item}/src`;
  });
  return pkgConfigs;
};

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  globals: {
    "ts-jest": {
      babelConfig: {
        presets: [["@babel/preset-env", { targets: { node: "current" } }]],
      },
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "md"],
  moduleNameMapper: getPkgConfigs(),
};
