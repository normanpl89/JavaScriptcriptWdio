const { When, Then } = require('@wdio/cucumber-framework');
const AdminPanel = require('../../../src/ui/admin/adminPanel.page');

When(/^I logout from admin panel$/, async () => {
  await AdminPanel.logout();
});

Then(/^I should see account list$/, async () => {
  await expect(await AdminPanel.accountList).toBeExisting();
});
