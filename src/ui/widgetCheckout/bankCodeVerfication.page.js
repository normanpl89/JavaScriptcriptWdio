const BasePage = require('../page');
const timeUtils = require('../../core/helpers/TimeUtils');

class BankCodeVerification extends BasePage {
  get codeVerificationTitle() {
    return $('.OrderAuthorizing .OrderAuthorizing__header span');
  }

  get codeVerificationDescription() {
    return $('.OrderAuthorizing .Authorizing .Authorizing__text');
  }

  get codeVericationLogo() {
    return $(
      '.OrderAuthorizing .Authorizing .Authorizing__logo.Authorizing__logo-card'
    );
  }

  get smsCodeTextField() {
    return $('.OrderAuthorizing .Authorizing .Authorizing__field input');
  }

  get authorizeTransactionButton() {
    return $('.OrderAuthorizing__button .CustomButton button');
  }

  async isBankCodeVerificationPageDisplayed() {
    return (
      (await this.codeVericationLogo.isDisplayed()) &&
      (await this.codeVerificationTitle.isDisplayed()) &&
      (await this.smsCodeTextField.isDisplayed())
    );
  }

  async insertBankCodeVerification(bankCode) {
    await this.smsCodeTextField.setValue(bankCode);
  }

  async clickAuthorizeTransactionButton() {
    await browser.waitUntil(
      async () => await this.authorizeTransactionButton.isClickable()
    );
    await this.authorizeTransactionButton.click();
    await timeUtils.sleep(5000);
  }
}

module.exports = new BankCodeVerification();
