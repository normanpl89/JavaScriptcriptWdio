const BasePage = require('../page');
const timeUtils = require('../../../src/core/helpers/TimeUtils');

class DashboardMainPage extends BasePage {
  /**
   * define selectors using getter methods
   */
  get verifyNowButton() {
    return $('//a[contains(., "Verify Now")]');
  }

  async verifyAccount() {
    await this.verifyNowButton.click();
    await timeUtils.sleep(3000);
  }

  async isDisplayed() {
    return await $("//a[text()='Your account']").isDisplayed();
  }
}

module.exports = new DashboardMainPage();
