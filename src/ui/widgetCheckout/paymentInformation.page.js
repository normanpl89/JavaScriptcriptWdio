/* eslint-disable no-undef */
const BasePage = require('../page');
const timeUtils = require('../../core/helpers/TimeUtils');
const myLogger = require('../../core/helpers/LoggerUtils');
const TimeUtils = require('../../core/helpers/TimeUtils');
const elementHelper = require('../../../utils/elementHelper');

class PaymentInformation extends BasePage {
  get enterPaymentInformationTitle() {
    return $('.FormSecondStep .FormSecondStep__title');
  }

  get enterPaymentInformationDescription() {
    return $('.FormSecondStep .FormSecondStep__sub-title');
  }

  get cardInfoSectionLabel() {
    return $('//div[@class="FormSecondStep  "]//span[text()="Card info"]');
  }

  get billingAddressSectionLabel() {
    return $(
      '//div[@class="FormSecondStep  "]//span[text()="Billing Address"]'
    );
  }

  get firstNameTextBox() {
    return $('//div[@class="FormSecondStep  "]//input[@name="firstName"]');
  }

  get lastNameTextBox() {
    return $('//div[@class="FormSecondStep  "]//input[@name="lastName"]');
  }

  get cardNumberTextBox() {
    return $('//div[@class="FormSecondStep  "]//input[@name="card.number"]');
  }

  get cardExpirationTextBox() {
    return $(
      '//div[@class="FormSecondStep  "]//input[@name="card.expiration"]'
    );
  }

  get cardCVVTextBox() {
    return $('//div[@class="FormSecondStep  "]//input[@name="card.cvv"]');
  }

  get country() {
    return $(
      '//div[@class="FormSecondStep  "]//input[@id="react-select-3-input"]'
    );
    // return $(
    //   '//div[@class="FormSecondStep  "]//span[text()="Billing Address"]/following::div[@class="row"][1]/div[1]'
    // );
  }

  get state() {
    return $(
      '//div[@class="FormSecondStep  "]//input[@id="react-select-4-input"]'
    );
  }

  get address() {
    return $(
      '//div[@class="FormSecondStep  "]//input[@name="address.street1"]'
    );
  }

  get postalCode() {
    return $(
      '//div[@class="FormSecondStep  "]//input[@name="address.postalCode"]'
    );
  }
  get city() {
    return $('//div[@class="FormSecondStep  "]//input[@name="address.city"]');
  }

  get email() {
    return $('//div[@class="FormSecondStep  "]//input[@name="email"]');
  }

  get phone() {
    return $(
      '//div[@class="FormSecondStep  "]//input[@placeholder="(123) 456-7890"]'
    );
  }

  get submitButton() {
    return $('.MultiStep__button button');
  }

  async getCountry() {
    if (
      await $(
        '//input[@id="react-select-3-input"]/ancestor::div[3]/div[1]'
      ).isDisplayed()
    ) {
      return await $(
        '//input[@id="react-select-3-input"]/ancestor::div[3]/div[1]'
      ).getText();
    }

    if (
      await $(
        '//input[@id="react-select-5-input"]/ancestor::div[3]/div[1]'
      ).isDisplayed()
    ) {
      return await $(
        '//input[@id="react-select-5-input"]/ancestor::div[3]/div[1]'
      ).getText();
    }
  }

  async setCountry(country) {
    await this.country.setValue(country);
    // await this.country.click();
    // await browser.keys(country.split())

    await browser.keys('\uE007');
    await timeUtils.sleep(5000);
  }

  async searchAndSetCountry(country) {
    await this.setCountry(country);
  }

  async getState() {
    if (
      await $(
        '//div[@class="FormSecondStep  "]//input[@id="react-select-4-input"]/ancestor::div[3]/div[1]'
      ).isDisplayed()
    ) {
      return await $(
        '//div[@class="FormSecondStep  "]//input[@id="react-select-4-input"]/ancestor::div[3]/div[1]'
      ).getText();
    }

    if (
      await $(
        '//input[@id="react-select-7-input"]/ancestor::div[3]/div[1]'
      ).isDisplayed()
    ) {
      return await $(
        '//input[@id="react-select-7-input"]/ancestor::div[3]/div[1]'
      ).getText();
    }
  }

  async setState(state) {
    await this.state.click();
    await this.state.setValue(state);
    await browser.keys('\uE007');
    await TimeUtils.sleep(2000);
  }

  async setAddress(address) {
    await elementHelper.clearInputField(this.address);
    await this.address.setValue(address);
  }
  async setEmail(email) {
    await elementHelper.clearInputField(this.email);
    await this.email.setValue(email);
  }

  async getAddress() {
    return this.address.getValue();
  }

  async setPostalCode(postalCode) {
    await elementHelper.clearInputField(this.postalCode);
    await this.postalCode.setValue(postalCode);
  }

  async getPostalCode() {
    return await this.postalCode.getValue();
  }

  async setCity(city) {
    await elementHelper.clearInputField(this.city);
    await this.city.setValue(city);
  }

  async getCity() {
    return await this.city.getValue();
  }

  async setPhone(phone) {
    await this.phone.setValue(phone);
    await browser.keys('\uE007');
    await TimeUtils.sleep(2000);
  }
  async setCardCode(cardCode) {
    await elementHelper.clearInputField(this.cardCVVTextBox);
    await this.cardCVVTextBox.setValue(cardCode);
    await browser.keys('\uE007');
    await TimeUtils.sleep(2000);
  }
  async getPhoneErrorMessage() {
    await $('//div[text()="Please enter cell phone number"]').getText();
  }

  get InputFieldWarningMessage() {
    return $("//div[contains(text(),'Enter a valid CVV')]");
  }

  async fillPaymentInformation(paymentInformation) {
    myLogger.info(
      'Fill payment information with data\n' +
        JSON.stringify(paymentInformation)
    );
    await this.firstNameTextBox.setValue(paymentInformation.firstName);
    await this.lastNameTextBox.setValue(paymentInformation.lastName);
    await this.cardNumberTextBox.setValue(paymentInformation.cardNumber);
    await this.cardExpirationTextBox.setValue(
      paymentInformation.cardExpiration
    );

    await this.setCardCode(paymentInformation.cardCvv);
    await this.setCountry(paymentInformation.country);

    await this.setAddress(paymentInformation.address);

    await this.setState(paymentInformation.state);

    await this.setPostalCode(paymentInformation.postalCode);
    await this.setCity(paymentInformation.city);
    await this.setEmail(paymentInformation.email);
    await this.setPhone(paymentInformation.phone);
    // await browser.keys('\uE007');
    // await timeUtils.sleep(2000);
  }

  async fillPaymentInformationPredifinedUser(paymentInformation) {
    myLogger.info(
      'Fill payment information with data\n' +
        JSON.stringify(paymentInformation)
    );
    await this.firstNameTextBox.setValue(paymentInformation.firstName);
    await this.lastNameTextBox.setValue(paymentInformation.lastName);
    await this.cardNumberTextBox.setValue(paymentInformation.cardNumber);
    await this.cardExpirationTextBox.setValue(
      paymentInformation.cardExpiration
    );
    await this.setCardCode(paymentInformation.cardCvv);
    await this.setPhone(paymentInformation.phone);
  }

  async isPaymentInformationDisplayed() {
    return (
      (await this.enterPaymentInformationTitle.isDisplayed()) &&
      (await this.cardNumberTextBox.isDisplayed())
    );
  }

  async clickSubmitButton() {
    await browser.execute(() => window.scrollBy(250, 350));
    myLogger.info('about to scroll');
    await browser.waitUntil(async () => await this.submitButton.isClickable());
    await this.submitButton.click();
    await timeUtils.sleep(5000);
  }

  async SubmitButtonisEnabled() {
    await this.submitButton.isClickable();
  }

  async validateErrorMessage() {
    return await $(`//div[@class="ErrorLabel text-left"]`).getText();
  }

  async changePhoneFlag(countrySet, country) {
    await $('//div[@class="flag ' + countrySet.toLowerCase() + '"]').click();
    await $(
      '//ul[@class="country-list "]/li[@data-country-code="' +
        country.toLowerCase().substring(0, 2) +
        '"]'
    ).click();
    await timeUtils.sleep(5000);
  }

  async isFlagDisplayed(country) {
    return await $(
      '//div[@class="flag ' + country.toLowerCase() + '"]'
    ).isDisplayed();
  }

  async isSubmitButtonClickable() {
    return await this.submitButton.isEnabled();
  }

  async clickBackButton() {
    await $("//div[@class='ArrowBack position-absolute']").click();
    await timeUtils.sleep(3000);
  }

  async clickCloseButton() {
    await $("//div[@class='Close']").click();
  }
}

module.exports = new PaymentInformation();
