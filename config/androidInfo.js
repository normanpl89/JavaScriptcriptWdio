const envConfig = require("../src/core/helpers/envHelper")
const AndroidInfo = {
    deviceName: envConfig.browserstack.android.deviceName,
    platFormVersion: envConfig.browserstack.android.platFormVersion,
}

module.exports = AndroidInfo;