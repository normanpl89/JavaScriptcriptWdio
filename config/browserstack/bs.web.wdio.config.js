const config = require('../../wdio.conf').config;

// ============
// Specs
// ============
config.specs = ['./test/features/ui/*.feature'];

// =============================
// Browserstack specific config
// =============================
// User configuration
config.user = process.env.BROWSERSTACK_USER;
config.key = process.env.BROWSERSTACK_ACCESS_KEY;

console.log(config.user);
console.log(config.key);

// Use browserstack service
config.services = ['browserstack'];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    // Set your BrowserStack config
    'browserstack.debug': true,
    'browserstack.user': config.user,
    'browserstack.key': config.key,

    // Set URL of the application under test
    //  app: process.env.BROWSERSTACK_APP_ID || 'BROWSERSTACK_APP_ID',

    // Specify device and os_version for testing
    browser: 'chrome',
    browser_version: 'latest',

    os: 'windows',
    os_version: '10',
    maxInstances: 1,

    // Set other BrowserStack capabilities
    project: 'wyre',
    build: 'windows',
    name: 'wdio-test'
  },
  {
    // Set your BrowserStack config
    'browserstack.debug': true,
    'browserstack.user': config.user,
    'browserstack.key': config.key,

    // Set URL of the application under test
    //  app: process.env.BROWSERSTACK_APP_ID || 'BROWSERSTACK_APP_ID',

    // Specify device and os_version for testing
    browser: 'safari',
    browser_version: 'latest',

    os: 'OS X',
    os_version: 'Big Sur',
    maxInstances: 1,

    // Set other BrowserStack capabilities
    project: 'wyre',
    build: 'mac',
    name: 'wdio-test'
  }
];
//config.path = "/wd/hub"
//config.host = "hub-cloud.browserstack.com"

exports.config = config;
