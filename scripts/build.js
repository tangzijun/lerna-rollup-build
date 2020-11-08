const minimist = require("minimist");
const rawArgs = process.argv.slice(2);
const args = minimist(rawArgs);
const fs = require("fs");
const path = require("path");
const { build } = require("./rollup.config");
const ENV = require("./env");

const getPkgConfigs = () => {
  const bundleType = "es";
  const packages = fs
    .readdirSync(path.resolve(__dirname, "../packages/"))
    .filter((item) => /^([^.]+)$/.test(item));
  const pkgConfigs = {};
  packages.forEach((item) => {
    const pkgPath = path.resolve(__dirname, "../packages/", item);
    const { name } = require(path.resolve(pkgPath, "package.json"));
    const inputPath = path.resolve(pkgPath, "./src");
    const inputFile = path.resolve(pkgPath, "./src/index.ts");
    const outputPath = path.resolve(pkgPath, "./dist");
    const outputFile = path.resolve(pkgPath, `./dist/index.${bundleType}.js`);
    const tsconfig = path.resolve(pkgPath, "./tsconfig.json");
    pkgConfigs[item] = {
      pkgPath,
      pkgName: name,
      inputPath,
      inputFile,
      outputPath,
      outputFile,
      tsconfig,
      bundleType,
    };
  });
  return pkgConfigs;
};

async function beginBuild(buildPkgs, isWatch) {
  await build(Object.values(buildPkgs), isWatch);
}

const pkgConfigs = getPkgConfigs();
const isWatch = !!args.watch;
const env = args.env;
ENV.setEnv(env);

if (args.p) {
  const pkgNames = args.p.split(",");
  const filterPkgs = pkgNames.filter((pkgName) => {
    return pkgConfigs[pkgName];
  });
  const buildPkgs = filterPkgs.map((pkgName) => {
    return pkgConfigs[pkgName];
  });
  if (buildPkgs.length > 0) {
    beginBuild(buildPkgs, isWatch);
  } else {
    console.error(`${args.p} 不存在!`);
  }
} else {
  beginBuild(pkgConfigs, isWatch);
}
