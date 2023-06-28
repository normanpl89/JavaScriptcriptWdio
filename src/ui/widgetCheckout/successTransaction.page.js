const BasePage = require('../page');
const timeUtils = require('../../core/helpers/TimeUtils');

class SuccessTransaction extends BasePage {
  get successPurchaseTitle() {
    return $('.OrderCompleted .Completed__header h6');
  }

  get successPurchaseDescriptionCurrency() {
    return $('.OrderCompleted .Completed__header span');
  }

  get successPurchaseDescriptionDate() {
    return $('.OrderCompleted .Completed__header p');
  }

  get walletOrderId() {
    return $('.OrderCompleted .Completed__order-id');
  }

  get paymentMethodSummary() {
    return $(
      "//div[@class='OrderCompleted']//div[@class='Receipt  CompletedReceiptMain']/div/div[1]/div[2]"
    );
  }

  get sendToSummary() {
    return $(
      "//div[@class='OrderCompleted']//div[@class='Receipt  CompletedReceiptMain']/div/div[2]/div[2]"
    );
  }

  get destinationCurrencySummary() {
    return $(
      "//div[@class='OrderCompleted']//div[@class='Receipt  CompletedReceiptMain']/div/div[3]/div[2]"
    );
  }

  get currentCurrencySummary() {
    return $(
      "//div[@class='OrderCompleted']//div[@class='Receipt  CompletedReceiptMain']/div/div[5]/div[2]"
    );
  }

  get equivalentCurrencySummary() {
    return $(
      "//div[@class='OrderCompleted']//div[@class='Receipt  CompletedReceiptMain']/div/div[5]/div[1]"
    );
  }

  get feeSummary() {
    return $(
      "//div[@class='OrderCompleted']//div[@class='Receipt  CompletedReceiptMain']/div/div[6]/div[2]"
    );
  }

  get networkFeeSummary() {
    return $(
      "//div[@class='OrderCompleted']//div[@class='Receipt  CompletedReceiptMain']/div/div[7]/div[2]"
    );
  }

  get totalCurrencyPaidSummary() {
    return $(
      "//div[@class='OrderCompleted']//div[@class='Receipt  CompletedReceiptMain']/div/div[8]/div[2]"
    );
  }

  get trackTransactionStatusButton() {
    return $('.Completed__actions .CustomButton .whiteBtn');
  }

  get closeTransactionButton() {
    return $(
      '.Completed__actions .CustomButton .btn.btn-primary.btn-block.btn-lg'
    );
  }
  async waitUntiltransctionCompletePage() {
    await this.destinationCurrencySummary.waitForDisplayed({ timeout: 15000 });
    while (!(await this.isTransactionCompleteDisplayed())) {
      await timeUtils.sleep(5000);
    }
  }

  async isTransactionCompleteDisplayed() {
    return (
      (await this.destinationCurrencySummary.isDisplayed()) &&
      (await this.feeSummary.isDisplayed()) &&
      (await this.trackTransactionStatusButton.isDisplayed())
    );
  }
}

module.exports = new SuccessTransaction();
