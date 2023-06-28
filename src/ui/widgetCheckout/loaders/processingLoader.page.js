const BasePage = require("../../page");

class ProcessingLoader extends BasePage {
  get orderProcessingLoaderTitle() {
    return $(".OrderProcessing .Processing__info > span");
  }

  get oderProcessingLoaderDescription() {
    return $(".OrderProcessing .Processing__info > p");
  }

  async isProcessingLoaderDisplayed() {
    return (
      (await this.oderProcessingLoaderDescription.isDisplayed()) &&
      (await this.orderProcessingLoaderTitle.isDisplayed())
    );
  }
}

module.exports = new ProcessingLoader();
