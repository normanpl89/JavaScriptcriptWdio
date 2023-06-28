const { When } = require('@wdio/cucumber-framework');
const TimeUtils = require('../../../src/core/helpers/TimeUtils');
const processingLoader = require('../../../src/ui/widgetCheckout/loaders/processingLoader.page');

When(/^I wait for processing loader to disapear$/, async () => {
  await processingLoader.orderProcessingLoaderTitle.waitForDisplayed({
    timeout: 15000
  });
  while (await processingLoader.isProcessingLoaderDisplayed()) {
    await TimeUtils.sleep(5000);
  }
});
