const myLogger = require('./LoggerUtils');

const sleep = async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
  myLogger.info('waited for ' + ms);
};

module.exports = {
  sleep: sleep
};
