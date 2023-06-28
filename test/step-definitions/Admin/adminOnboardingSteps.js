const { Then } = require('@wdio/cucumber-framework');
const AdminOnboardPage = require('../../../src/ui/admin/adminOnboard.page');

Then(/^I Select the Account type on the Dropdown as Individual$/, async () => {
  await AdminOnboardPage.selectIndividualOpt();
});
Then(/^I activate manually all the compliance requirements$/, async () => {
  await AdminOnboardPage.activateComplianceReq();
});

Then(/^I approve the bank account$/, async () => {
  await AdminOnboardPage.activateBank();
});

Then(/^I validate the compliance Status is (.*)$/, async (status) => {
  await AdminOnboardPage.returnAccountOverview();
  expect(await AdminOnboardPage.getComplianceStatus()).toEqual(status);
});
