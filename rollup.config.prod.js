const rollup = require("rollup");
const { babel } = require("@rollup/plugin-babel");
const typescript = require("@rollup/plugin-typescript");

const inputOptions = {
  input: "src/index.ts",
  plugins: [
    typescript({
      tsconfig: `./tsconfig.json`,
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
  ],
};

const outputOptions = {
  dir: "dist",
  format: "esm",
};

const watchOptions = {
  ...inputOptions,
  output: [outputOptions],
  watch: {},
};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // const watcher = rollup.watch(watchOptions);
  // watcher.on('event', event => {});

  const { code, map } = await bundle.generate(outputOptions);
  console.info("====", code, map);
  await bundle.write(outputOptions);
}

build();
