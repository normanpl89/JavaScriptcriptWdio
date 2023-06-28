const { Then } = require('@wdio/cucumber-framework');
const successTransactionPage = require('../../../src/ui/widgetCheckout/successTransaction.page');

Then(/^I success wor transaction page$/, async () => {
  await successTransactionPage.waitUntiltransctionCompletePage();
  expect(await successTransactionPage.isTransactionCompleteDisplayed()).toBe(
    true
  );
});
