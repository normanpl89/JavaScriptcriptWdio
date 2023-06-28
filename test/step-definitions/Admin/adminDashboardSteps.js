const { Then } = require('@wdio/cucumber-framework');
let accountServiceSteps = require('../Admin/AccountServiceSteps');
const AdminDashboardPage = require('../../../src/ui/admin/adminDasbard.page');

Then(/^I search for the new account created on the Dashboard$/, async () => {
  let user_id = await accountServiceSteps.userId();
  await AdminDashboardPage.searchByAccountID(user_id);
});
Then(/^I click on Manage Button$/, async () => {
  await AdminDashboardPage.clickManageBtn();
});
Then(/^I click on the result Account from the search$/, async () => {
  let user_id = await accountServiceSteps.userId();
  await AdminDashboardPage.selectSearchAccount(user_id);
});
Then(/^I click on approve Email$/, async () => {
  await AdminDashboardPage.verifyEmailOpt();
});
