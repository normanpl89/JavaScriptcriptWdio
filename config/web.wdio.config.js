const config = require('../wdio.conf').config;

config.specs = ['./test/features/ui/*.feature'];

const drivers = {
  chrome: { version: 'latest' },
  chromiumedge: { version: '102.0.1245.44' }
};

const chromeCapabilities = {
  maxInstances: 5,
  browserName: 'chrome',
  acceptInsecureCerts: true,
  'goog:chromeOptions': {
    args: ['--headless']
  }
};

const safariCapabilities = {
  browserName: 'safari',
  maxInstances: 1 //Safari does not allow headless mode
};

const edgeCapabilities = {
  browserName: 'MicrosoftEdge',
  maxInstances: 1,
  'ms:edgeOptions': {
    args: ['--headless']
  }
};

const webCapabilities = [];

console.log(process.platform);

if ((process.platform !== 'win32') & (process.platform !== 'linux')) {
  webCapabilities.push(safariCapabilities);
}

webCapabilities.push(edgeCapabilities);
webCapabilities.push(chromeCapabilities);

config.capabilities = webCapabilities;

config.services = [
  [
    'selenium-standalone',
    {
      logPath: './drivers.log',
      installArgs: { drivers },
      args: { drivers }
    }
  ]
];

exports.config = config;
