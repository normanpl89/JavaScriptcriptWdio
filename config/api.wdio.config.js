const config = require('../wdio.conf').config;

config.specs = ['./test/features/api/*.feature'];

const drivers = {
  chrome: { version: 'latest' }
};
//Setting due wdio requires a webservice to enable a worker runner
config.capabilities = [
  {
    maxInstances: 1,
    browserName: 'chrome',
    acceptInsecureCerts: true,
    'goog:chromeOptions': {
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--headless']
    }
  }
];
config.services = [
  [
    'selenium-standalone',
    {
      logPath: 'logs',
      installArgs: { drivers },
      args: { drivers }
    }
  ]
];

exports.config = config;
