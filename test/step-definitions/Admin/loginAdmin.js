const AdminLogin = require('../../../src/ui/admin/adminLogin.page');
const config = require('../../../src/core/helpers/envHelper');

const { Given, When, Then } = require('@wdio/cucumber-framework');

Given(/^I navigate to the admin dashboard$/, async () => {
  await AdminLogin.open();
});

When(/^I login with valid credentials$/, async () => {
  await AdminLogin.login(config.test_email, config.test_pwd);
});

Then(/^I should see login page$/, async () => {
  expect(await AdminLogin.isLoginDisplayed()).toBeTruthy();
});
