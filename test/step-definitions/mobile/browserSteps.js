const { Given } = require('@wdio/cucumber-framework');

Given(/^I navigate to wyre$/, async () => {
  await browser.url('https://www.sendwyre.com/');
});
