const BasePage = require('../../ui/page');
const timeUtils = require('../../../src/core/helpers/TimeUtils');
const logger = require('../../../src/core/helpers/LoggerUtils');
const destinationCurrencyModalPage = require('./currenciesForms/destinationCurrencyModal.page');
const payWithCurrencyModalPage = require('./currenciesForms/payWithCurrencyModal');

class WidgetCheckout extends BasePage {
  get verificationMessage() {
    return $('.VerificationBanner .VerificationBanner__text');
  }

  get amount() {
    return $('.FormFirstStep .AutoresizeInput #amount');
  }

  get fromCurrency() {
    return $(
      "//div[@class='FormFirstStep__currency-select']//div[@class='SelectCurrencyBtn'][1]"
    );
  }

  get toCurrency() {
    return $(
      "//div[@class='FormFirstStep__currency-select']//div[@class='SelectCurrencyBtn'][2]"
    );
  }

  get walletAddress() {
    return $("input[name='walletAddress']");
  }

  get paymentMethod() {
    return $('.FormFirstStep .SelectPaymentMethod');
  }

  get termsAndConditionsCheckbox() {
    return $('.FormFirstStep .AgreeTerms .CustomCheckbox input');
  }

  get termsAndConditionsText() {
    return $('.FormFirstStep .AgreeTerms .AgreeTerms__label');
  }

  get nextButton() {
    return $('//button[text()="Next"]');
  }

  get errorFieldLabel() {
    return $('small.text-muted div');
  }

  get errorCleanMessage() {
    return $('div.FormFirstStep__error');
  }

  get closeButton() {
    return $("//div[contains(@class, 'CloseBtn')]");
  }

  get alertThisBrowserDoesNotSupportApplePay() {
    return $(
      "//body/div[@id='wyre-dropin-widget-container']/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]"
    );
  }

  async validateAlertThisBrowserDoesNotSupportApplePay() {
    return this.alertThisBrowserDoesNotSupportApplePay.getText();
  }

  async isWidgetCheckoutDisplayed() {
    const result =
      (await this.verificationMessage.isExisting()) &&
      (await this.paymentMethod.isExisting()) &&
      (await this.termsAndConditionsCheckbox.isExisting());
    return result;
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  async open(url) {
    logger.info('Open widget checkout for WOR: ' + url);
    return super.open(url);
  }

  async clickSelectPaymentMethod() {
    await this.paymentMethod.click();
    await timeUtils.sleep(5000);
  }

  async amountFieldValidator(numbers) {
    await this.amount.setValue(numbers);
    await timeUtils.sleep(2000);
  }

  async amountCleanValue() {
    await this.amount.clearValue();
    await timeUtils.sleep(2000);
  }

  async checkThatPaymentMethodIsSelected(paymentMethod) {
    const element = await $(
      "//div[@class='FormFirstStep']//div[@class='SelectPaymentMethod ']//span[@class='method-name']"
    );
    const paymentMethodSelected = await element.getText();
    logger.info(paymentMethodSelected + ' equals to ' + paymentMethod);
    return paymentMethodSelected.toLowerCase() === paymentMethod.toLowerCase();
  }

  async setWalletAddress(wallet) {
    await this.walletAddress.clearValue();
    const oldValue = await this.walletAddress.getValue();
    if (oldValue.length > 0) {
      const backspaces = new Array(oldValue.length).fill('Backspace');
      await this.walletAddress.setValue(backspaces);
    }
    await this.walletAddress.setValue(wallet);
  }

  async setCryptoCurrencyAsDestinationSource(destinationSource) {
    logger.info('Selecting destination currency' + destinationSource);
    await this.toCurrency.click();
    await destinationCurrencyModalPage.selectDestinationCurrency(
      destinationSource
    );
  }

  async checkDestinationCurrencyIsSelected(destinationCurrency) {
    return await $(
      `//div[@class='SelectCurrencyBtn']//span[@class='SelectCurrencyBtn__text' and text()='${destinationCurrency}']`
    ).isDisplayed();
  }

  async searchForCurrencyInPayWithForm(currency) {
    await payWithCurrencyModalPage.searchForCurrency(currency);
  }

  async seachForCurrencyInDestinationForm(currency) {
    await payWithCurrencyModalPage.searchForCurrency(currency);
  }

  async selectCurrencyCountry(country) {
    await this.clickCurrencyFrom();
    await payWithCurrencyModalPage.selectCurrencyCountry(country);
  }

  async clickCurrencyFrom() {
    await this.fromCurrency.click();
    await timeUtils.sleep(2000);
  }

  async clickDestinationForm() {
    await this.toCurrency.click();
    await timeUtils.sleep(3000);
  }

  async checkAllValidCurrencies(country) {
    return $(
      `//div[@class='CurrencyDialog__label' and text()='${country}']`
    ).isDisplayed();
  }

  async checkAllValidDestinationCurrencies(cryptoCurrenty) {
    return this.checkAllValidCurrencies(cryptoCurrenty);
  }

  async checkErrorAmountField() {
    return this.errorFieldLabel.getText();
  }

  async getAmountField() {
    return this.amount.getValue();
  }

  async getAmountEmptyError() {
    return this.errorCleanMessage.getText();
  }

  async acceptTerms() {
    const element = await this.termsAndConditionsCheckbox.getValue();
    logger.info('terms state: ' + element);
    logger.info('element == false' + element === 'false');
    logger.info('element == false ' + typeof element);
    if (element === 'false') {
      await browser.execute((webElement) => {
        webElement.click();
      }, await this.termsAndConditionsCheckbox);
      logger.info('Terms Accepted');
    }
  }

  async acceptTermsIsSelected() {
    const element = await this.termsAndConditionsCheckbox.getValue();
    return element;
  }

  async clickNextButton() {
    await this.nextButton.scrollIntoView();
    while (await this.nextButton.isDisplayed()) {
      await this.nextButton.click();
      await timeUtils.sleep(5000);
    }
  }

  async isNextButtonDisable() {
    await this.nextButton.isEnabled(false);
    await timeUtils.sleep(2000);
  }

  async isNextButtonEnable() {
    await this.nextButton.isEnabled(true);
    await timeUtils.sleep(2000);
  }

  async clickCloseButton() {
    await this.closeButton.click();
    await timeUtils.sleep(2000);
  }

  async isCurrencyCountryDisplayed(currency) {
    return await payWithCurrencyModalPage.isCurrencyDisplayed(currency);
  }

  async isCurrencyDestinationDisplayed(currency) {
    return await destinationCurrencyModalPage.isCurrencyDisplayed(currency);
  }

  async clickOnCurrencyDescription() {
    await $(
      "//div[@class='FormFirstStep__amount position-relative']/span[1]"
    ).click();

    await timeUtils.sleep(1000);
  }

  async isErrorMessageDisplayed(message) {
    return await $(`//div[text()='${message}']`).isDisplayed();
  }

  async getAcceptTermDescription() {
    return await this.termsAndConditionsText.getText();
  }

  async isNextButtonEnabled() {
    return await this.nextButton.isEnabled();
  }

  async getFeeSummary(feeField) {
    if (feeField.includes('Exchange Rate')) {
      return await $(
        "//div[@class='Receipt ReceiptMain']/div[1]/div[2]"
      ).getText();
    }
    if (feeField.includes('Transaction fee')) {
      return await $(
        "//div[@class='Receipt ReceiptMain']/div[3]/div[2]"
      ).getText();
    }
    if (feeField.includes('Network fee')) {
      return await $(
        "//div[@class='Receipt ReceiptMain']/div[4]/div[2]"
      ).getText();
    }
    if (feeField.includes('Purchase Total')) {
      return await $(
        "//div[@class='Receipt ReceiptMain']/div[6]/div[2]"
      ).getText();
    }
    return '';
  }
}

module.exports = new WidgetCheckout();
