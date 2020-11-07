const rollup = require("rollup");
const { babel } = require("@rollup/plugin-babel");
const typescript = require("rollup-plugin-typescript2");

function getRollupConfig(config) {
  const { inputPath, outputFile, tsconfig, bundleType } = config;
  const inputOptions = {
    input: inputPath,
    plugins: [
      typescript({
        tsconfig,
        abortOnError: false,
        clean: false,
        check: false,
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
      }),
    ],
  };

  const outputOptions = {
    file: outputFile,
    format: bundleType,
  };

  const watchOptions = {
    ...inputOptions,
    output: [outputOptions],
    watch: {},
  };

  return {
    inputOptions,
    outputOptions,
    watchOptions,
  };
}

const showBuildLog = (type, ...arg) => {
  console.log(`[ build ] ${type} `, ...arg);
};

function build(configs, isWatch) {
  return new Promise((resolve) => {
    let buildSuccessNum = 0;
    let buildTotal = configs.length;

    configs.forEach((pkgConfig) => {
      const { pkgName } = pkgConfig;
      showBuildLog("准备编译", `> packageName : ${pkgName}`);
    });

    const onBuildPkgEnd = () => {
      buildSuccessNum++;
      if (buildSuccessNum >= buildTotal) {
        showBuildLog("全部编译结束");
        if (isWatch) {
          showBuildLog("已开启热更新,监听中...");
        }
        resolve();
      }
    };

    configs.forEach((pkgConfig) => {
      const rollupConfig = getRollupConfig(pkgConfig);
      buildPkg(pkgConfig, rollupConfig, isWatch, onBuildPkgEnd);
    });
  });
}

async function buildPkg(pkgConfig, rollupConfig, isWatch, onBuildPkgEnd) {
  const { pkgName } = pkgConfig;
  const { inputOptions, outputOptions, watchOptions } = rollupConfig;

  const bundle = await rollup.rollup(inputOptions);
  const watcher = rollup.watch(watchOptions);
  await bundle.write(outputOptions);
  onWatcher(watcher, isWatch, pkgName).then(() => {
    onBuildPkgEnd();
  });
}

function onWatcher(watcher, isWatch, pkgName) {
  return new Promise((resolve) => {
    watcher.on("event", (event) => {
      const { code } = event;
      if (code === "BUNDLE_START") {
        showBuildLog("开始编译", pkgName);
      } else if (code === "BUNDLE_END") {
        const { duration } = event;
        showBuildLog("编译成功", pkgName, `, 耗时: `, duration);
        resolve();
        if (!isWatch) {
          watcher.close();
        }
      } else if (code === "ERROR" || code === "FATAL") {
        showBuildLog("错误", event);
        if (!isWatch) {
          watcher.close();
        }
      }
    });
  });
}

module.exports = {
  build,
};
