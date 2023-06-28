const BasePage = require('../../../../src/ui/page');
const timeUtils = require('../../../core/helpers/TimeUtils');
const elementHelper = require('../../../../utils/elementHelper');

class AccountVerificationPage extends BasePage {
  /**
   * define selectors using getter methods
   */
  get bankContinueButton() {
    return $('//div[@class="btn btn-primary" and contains(., "Continue")]');
  }

  get bankConnectAccount() {
    return $('div.btn');
  }

  get plaidCheckingCheckBox() {
    return $(
      '//div[@class="UserSelectionPane-module__row" and contains (., "Plaid Checking")]'
    );
  }

  get plaidContinueBtn() {
    return $(
      '//span[@class="Button-module_text__38wV0" and contains (., "Continue")]'
    );
  }

  get successPayment() {
    return $('//h6[contains (., "Payment method succes")]');
  }

  get connectAccount() {
    return $('//div[@class="btn btn-primary float-right mr-3 mt-4 mb-5"]');
  }

  get iframe1() {
    return $('#plaid-link-iframe-1');
  }

  async bankLocationApproval() {
    await elementHelper.clickElement(this.bankContinueButton);
    await timeUtils.sleep(3000);
    await elementHelper.clickElement(this.connectAccount);
  }

  async bankLastApproval() {
    //await elementHelper.clickElement(this.bankContinueButton);
    await browser.switchToFrame(await this.iframe1);
    await elementHelper.clickElement(this.plaidCheckingCheckBox);
    await elementHelper.clickElement(this.plaidContinueBtn);
    await elementHelper.clickElement(this.plaidContinueBtn);
    await timeUtils.sleep(3000);
    await browser.switchToParentFrame();
  }

  async getSuccessBankConfirmation() {
    return this.successPayment.getText();
  }
}

module.exports = new AccountVerificationPage();
