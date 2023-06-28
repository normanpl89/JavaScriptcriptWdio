const { Then } = require('@wdio/cucumber-framework');
let DashboardMainPage = require('../../../src/ui/dashboard/dasboardMain.page');

Then(/^I should see dashboard page$/, async () => {
  expect(await DashboardMainPage.isDisplayed()).toBe(true);
});
