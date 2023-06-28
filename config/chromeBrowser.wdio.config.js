const myLogger = require('../src/core/helpers/LoggerUtils');

const config = require('../wdio.conf').config;

const drivers = {
  chrome: { version: '105.0.5195.52' }
};

config.specs = [['./test/features/ui/**/*.feature']];

let chromeCaps = {
  maxInstances: 1,
  browserName: 'chrome',
  acceptInsecureCerts: true,
  'goog:chromeOptions': {
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--headless']
  }
};

let headlessModeArg = process.argv.find((option) =>
  option.includes('headless')
);
if (headlessModeArg !== undefined && headlessModeArg.includes('false')) {
  myLogger.info('Headles mode disabled');
  chromeCaps['goog:chromeOptions'] = {
    args: []
  };
  myLogger.info(JSON.stringify(chromeCaps));
}

config.capabilities = [chromeCaps];

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
