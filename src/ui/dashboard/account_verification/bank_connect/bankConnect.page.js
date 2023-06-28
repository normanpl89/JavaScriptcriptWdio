const BasePage = require('../../../page');
const timeUtils = require('../../../../core/helpers/TimeUtils');
const elementHelper = require('../../../../../utils/elementHelper');

class BankConnectPage extends BasePage {
  /**
   * define selectors using getter methods
   */
  get continueBtn() {
    return $(
      '//span[@class="Button-module_text__38wV0" and contains (., "Continue")]'
    );
  }

  get chaseBankAccount() {
    return $(
      '//h2[@class="SearchAndSelectPane-module__title h3" and contains(., "Chase")]'
    );
  }

  get username() {
    return $('#username');
  }

  get password() {
    return $('#password');
  }

  get submitCredentials() {
    return $('#submit-credentials');
  }

  get submitDevice() {
    return $('#submit-device');
  }

  get submitCode() {
    return $('#submit-code');
  }

  get inputChecking() {
    return $('input#checking');
  }

  get submitAccounts() {
    return $('#submit-accounts');
  }

  get acceptTermsCheck() {
    return $('#terms');
  }

  get submitConfirmation() {
    return $('#submit-confirmation');
  }

  get ifrme() {
    return $('#plaid-link-iframe-1');
  }

  /**
   * method implementation
   */
  async verifyAccount() {
    await browser.switchToFrame(await this.ifrme);
    await elementHelper.clickElement(this.continueBtn);
    await elementHelper.clickElement(this.chaseBankAccount);
    await elementHelper.clickElement(this.continueBtn);
  }

  async loginBankChase() {
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[2]);
    await this.username.setValue('user_good');
    await timeUtils.sleep(2000);
    await this.password.setValue('pass_good');
    await timeUtils.sleep(2000);
    await elementHelper.clickElement(this.submitCredentials);
    await elementHelper.clickElement(this.submitDevice);
    await elementHelper.clickElement(this.submitCode);
    await elementHelper.clickElement(this.inputChecking);
    await elementHelper.clickElement(this.submitAccounts);
    await elementHelper.clickElement(this.acceptTermsCheck);
    await elementHelper.clickElement(this.submitConfirmation);
    await browser.switchToWindow(handles[1]);
  }
}

module.exports = new BankConnectPage();
