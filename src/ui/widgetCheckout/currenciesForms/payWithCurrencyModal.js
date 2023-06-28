const BasePage = require('../../page');
const timeUtils = require('../../../core/helpers/TimeUtils');

class DestinationSourceModal extends BasePage {
  get searchTextField() {
    return $("//div[@class='CurrencyDialog__search']/input");
  }

  async selectCurrencyCountry(country) {
    await $(
      `//div[@class='CurrencyDialog__label' and contains(., '${country}')]`
    ).click();
    await timeUtils.sleep(3000);
  }

  async searchForCurrency(currency) {
    await this.searchTextField.setValue(currency);
  }

  async isCurrencyDisplayed(currency) {
    return await $(
      `//div[@class='CurrencyDialog__label' and contains(., '${currency}')]`
    ).isDisplayed();
  }
}

module.exports = new DestinationSourceModal();
