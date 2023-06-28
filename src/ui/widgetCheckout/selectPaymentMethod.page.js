const BasePage = require('../page');
const timeUtils = require('../../core/helpers/TimeUtils');
const myLogger = require('../../core/helpers/LoggerUtils');

class SelectPaymentMethod extends BasePage {
  get backButton() {
    return $('.BackBtn__dark svg');
  }

  get paymentMethodTitle() {
    return $('.PaymentMethods__content h4');
  }

  get creditDebitCardLabel() {
    return $('//div[@class="PaymentMethods__methods"]//div[text()="Credit / Debit"]');  
   }

  get achTransferCardLabel() {
    return $(
     '//div[@class="PaymentMethods__methods"]//div[text()="ACH Transfer"]'
    );
  }

  async isPaymentMethodPageDisplayed() {
    await this.paymentMethodTitle.waitForDisplayed();
    return (
      ((await this.creditDebitCardLabel.isExisting()) ||
        (await this.achTransferCardLabel.isExisting())) &&
      (await this.paymentMethodTitle.isExisting())
    );
  }

  async clickOnAchTransferCard() {
    await this.achTransferCardLabel.click();
    await timeUtils.sleep('10000');
  }

  async clickOnCreditDebitTransferCard() {
    if (
      await $(
        '//div[@class="PaymentMethods__method--selected "]/div[text()="Credit / Debit"]'
      ).isDisplayed()
    ) {
      myLogger.info('Credit / Debit payment method already selected');
      await this.backButton.click();
    } else {
      await this.creditDebitCardLabel.click();
    }
    await timeUtils.sleep('10000');
  }
}

module.exports = new SelectPaymentMethod();
