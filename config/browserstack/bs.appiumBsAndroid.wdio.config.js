const AndroidInfo = require('../androidInfo');
const config = require('../../wdio.conf').config;

// ============
// Specs
// ============
config.specs = [
    './test/features/mobile/*.feature',
];


// =============================
// Browserstack specific config
// =============================
// User configuration
config.user = process.env.BROWSERSTACK_USER;
config.key = process.env.BROWSERSTACK_ACCESS_KEY;

console.log(config.user)
console.log(config.key)

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
        "browserstack.user": config.user,
        "browserstack.key": config.key,

        // Set URL of the application under test
        //  app: process.env.BROWSERSTACK_APP_ID || 'BROWSERSTACK_APP_ID',

        // Specify device and os_version for testing
        device: AndroidInfo.deviceName,
        os_version: AndroidInfo.platFormVersion,

        platformName: 'Android',
        browserName: 'chrome',
        maxInstances: 1,
        automationName: 'uiautomator2',
        platformVersion: AndroidInfo.platFormVersion,

        // Set other BrowserStack capabilities
        project: 'wyre',
        build: 'android',
        name: 'wdio-test',

        'browserstack.appiumLogs': 'true',
        "real_mobile" : "true",
        "browserstack.local" : "false",
    },
];
config.path = "/wd/hub"
//config.host = "hub-cloud.browserstack.com"

exports.config = config;