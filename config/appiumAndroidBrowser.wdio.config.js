const config = require('../wdio.conf').config;
const AndroidInfo = require('./androidInfo');

config.specs = [
    './test/features/mobile/*.feature',
]

// Appium capabilities
config.capabilities = [
    {
        platformName: 'Android',
        browserName: 'chrome',
        maxInstances: 1,
        automationName: 'uiautomator2',
        deviceName: AndroidInfo.deviceName,
        platformVersion: AndroidInfo.platFormVersion,
        app: ""
    }
];


config.port = 4723
config.path = '/wd/hub'

exports.config = config;