const { Then, When } = require('@wdio/cucumber-framework');
const dashboardLogin = require('../../../src/ui/dashboard/dashboardLogin.page');
const config = require('../../../src/core/helpers/envHelper');
let accountServiceSteps = require('../Admin/AccountServiceSteps');
let DashboardMainPage = require('../../../src/ui/dashboard/dasboardMain.page');
let AccountVerificationPage = require('../../../src/ui/dashboard/account_verification/accountVerification.page');
let BankConnectPage = require('../../../src/ui/dashboard/account_verification/bank_connect/bankConnect.page');

When(/^I navigate to dashboard$/, async () => {
  await dashboardLogin.open();
});

When(/^I login with valid credentials to dashboard$/, async () => {
  await dashboardLogin.login(config.test_email, config.test_pwd);
});

Then(/^I see login to dashboard page$/, async () => {
  expect(await dashboardLogin.isLoginPageDisplayed()).toBe(true);
});

Then(
  /^I login with the account on the Dashboard to Enter valid Bank information$/,
  { timeout: 100000 },
  async () => {
    let email = await accountServiceSteps.email();
    await dashboardLogin.openNewWindow();
    await dashboardLogin.login(email, 'wyreWYRE1234');
    await DashboardMainPage.verifyAccount();
  }
);

Then(
  /^I fill all the information to add a bank account$/,
  { timeout: 100000 },
  async () => {
    await AccountVerificationPage.bankLocationApproval();
    await BankConnectPage.verifyAccount();
    await BankConnectPage.loginBankChase();
    await AccountVerificationPage.bankLastApproval();
  }
);

Then(/^I need to see the success message (.*)$/, async (message) => {
  expect(await AccountVerificationPage.getSuccessBankConfirmation()).toEqual(
    message
  );
});

Then(/^I close the Dashboard$/, async () => {
  await dashboardLogin.changeMainWindow();
});
