const BasePage = require('../../page');

class DestinationSourceModal extends BasePage {
  get closeButton() {
    return $('.Modal.position-fixed .Modal__close-btn svg');
  }

  get destinationLabel() {
    return $('.Modal.position-fixed .CurrencyDialog__header');
  }

  get searchInput() {
    return $('.Modal.position-fixed .CurrencyDialog__search > input');
  }

  async selectDestinationCurrency(destinationCurrency) {
    let element = await $(
      `//div[@class='Modal position-fixed']//div[@class='CurrencyDialog__item']//div[@class='CurrencyDialog__label' and text()='${destinationCurrency}']`
    );
    await element.scrollIntoView();
    await element.click();
  }

  async isCurrencyDisplayed(currency) {
    return await $(
      `//div[@class='CurrencyDialog__label' and contains(., '${currency}')]`
    ).isDisplayed();
  }
}

module.exports = new DestinationSourceModal();
