const BasePage = require('../page');
const timeUtils = require('../../../src/core/helpers/TimeUtils');
const elementHelper = require('../../../utils/elementHelper');

class AdminDasbardPage extends BasePage {
  get searchBar() {
    return $("input[ng-model='searchField']");
  }

  get manageBtn() {
    return $('a=Manage');
  }

  get emailVerifyBtn() {
    return $('button=Mark as verified');
  }

    async searchByAccountID(account_id) {
        await this.searchBar.setValue(account_id);
    }

    async clickManageBtn() {
        await elementHelper.clickElement(this.manageBtn);
    }

    async selectSearchAccount(account_id) {
        await elementHelper.clickElement($(`a=${account_id}`));
    }

    async verifyEmailOpt() {
        await elementHelper.clickElement(this.emailVerifyBtn);
        await timeUtils.sleep(8000);
        await browser.acceptAlert();
    }

}

module.exports = new AdminDasbardPage();
