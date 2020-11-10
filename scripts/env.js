const Util = require("./util");

const prod = "prod";
const dev = "dev";

console.info("NODE_ENV:", process.env.NODE_ENV);
const setEnv = (env) => {
  if (env === dev) {
    setEnvToDev();
  } else {
    setEnvToProd();
  }
  Util.showBuildLog("设置环境:", process.env.foo);
};
const setEnvToDev = () => {
  process.env.foo = dev;
};
const setEnvToProd = () => {
  process.env.foo = prod;
};
const isDevEnv = () => {
  return process.env.foo === dev;
};
const isProdEnv = () => {
  return process.env.foo === prod;
};
const getEnv = () => {
  return process.env.foo;
};

module.exports = {
  setEnv,
  getEnv,
  isDevEnv,
  isProdEnv,
};
