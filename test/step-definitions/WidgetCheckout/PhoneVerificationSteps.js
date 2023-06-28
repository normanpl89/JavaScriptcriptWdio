const { Then, When } = require('@wdio/cucumber-framework');
const phoneCodeVerificationPage = require('../../../src/ui/widgetCheckout/phoneCodeVerification.page');

When(/^I insert (.*) phone code$/, async (phoneCode) => {
  await phoneCodeVerificationPage.insertPhoneCodeVerification(phoneCode);
});

When(
  /^I click on authorize transaction on phone code verification page$/,
  async () => {
    await phoneCodeVerificationPage.clickAuthorizeTransactionButton();
  }
);

Then(/^I see phone code verification page$/, async () => {
  expect(
    await phoneCodeVerificationPage.isPhoneCodeVerificationPageDisplayed()
  ).toBe(true);
});
