const { Then, When } = require('@wdio/cucumber-framework');
const bankCodeVerficationPage = require('../../../src/ui/widgetCheckout/bankCodeVerfication.page');

When(/^I insert (.*) bank code$/, async (bankCode) => {
  await bankCodeVerficationPage.insertBankCodeVerification(bankCode);
});

When(
  /^I click on authorize transaction on bank code verification page$/,
  async () => {
    await bankCodeVerficationPage.clickAuthorizeTransactionButton();
  }
);

Then(/^I see bank code verification page$/, async () => {
  expect(
    await bankCodeVerficationPage.isBankCodeVerificationPageDisplayed()
  ).toBe(true);
});
