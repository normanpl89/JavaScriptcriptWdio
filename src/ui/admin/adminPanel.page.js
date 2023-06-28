const BasePage = require('../page');
const config = require('../../core/helpers/envHelper');
const myLogger = require('../../core/helpers/LoggerUtils');
const TimeUtils = require('../../core/helpers/TimeUtils');

class AdminPanel extends BasePage {
  get logoutBtn() {
    return $("//a[@href='#/logout']");
  }

  get accountList() {
    return $('#accountsList');
  }

  async isUserLoggedToAdmin() {
    let url = await browser.getUrl();
    myLogger.info(url);
    return url.includes('#');
  }

  async logout() {
    myLogger.info('Inside logout admin method');
    await this.logoutBtn.click();
    await TimeUtils.sleep(2000);
  }

  async open() {
    return await super.open(`${config.admin_url}`);
  }
}

module.exports = new AdminPanel();
