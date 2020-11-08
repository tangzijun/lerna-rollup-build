const showBuildLog = (type, ...arg) => {
  console.log(`[ build ] ${type} `, ...arg);
};

module.exports = {
  showBuildLog,
};
