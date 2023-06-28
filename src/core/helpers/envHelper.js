const dotenv = require('dotenv');
dotenv.config();
const env_properties = require('../../../config/properties/env.properties');
const myLogger = require('../../../src/core/helpers/LoggerUtils');

const testRailsConfig = {
  saveTestRails: process.env.saveTestRails === 'true',
  testRunId: parseInt(process.env.testRunId),
  buildVersion: process.env.buildVersion,
  url: process.env.testrailsUrl,
  userName: process.env.TestRailUser,
  userPwd: process.env.userPwd
};
const browserstack = {
  android: {
    deviceName: process.env.androidDeviceName,
    platFormVersion: process.env.androidPlatFormVersion
  }
};

const jiraConfig = {
  enableJiraReport: process.env.enableJiraReport === 'true'
};

let env_prop = null;
if (process.env.target_env.toLowerCase().match('qa')) {
  myLogger.info('Loading QA properties');
  env_prop = env_properties.qa_props;
}

if (process.env.target_env.toLowerCase().match('dev')) {
  myLogger.info('Loading DEV properties');
  env_prop = env_properties.dev_props;
}
myLogger.info('Loaded env property: ');
myLogger.info(JSON.stringify(env_prop));
module.exports = {
  wor_secret_key: env_prop.WORsecretKey,
  secret_key: env_prop.secrectKey,
  api_admin: env_prop.adminAPI,
  api_dash: env_prop.dashAPI,
  dashboard_url: env_prop.base_dashboard_url,
  version2: process.env.version2,
  version3: process.env.version3,
  api_base: env_prop.baseAPI,
  api_jira: process.env.jiraAPI,
  jira_token: process.env.jiraToken,
  test_email: process.env.test_account_email,
  test_pwd: process.env.test_account_pwd,
  admin_url: env_prop.base_admin_url,
  automation_email: process.env.automationEmail,
  automation_pwd: process.env.automationpwd,
  automation_token: process.env.automationToken,
  testRailsConfig: testRailsConfig,
  browserstack: browserstack,
  jiraConfig: jiraConfig
};
