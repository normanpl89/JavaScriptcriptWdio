const BasePage = require("../page");
class SetupBankForAch extends BasePage {
  get setupBankforAchHeaderLabel() {
    return $(".Verification__header h4");
  }

  get achTitleLabel() {
    return $(".Verification .Verification__title");
  }

  get achTransferDescription() {
    return $(".Verification .Verification__description");
  }

  get verifyYourIdentityTitle() {
    return $(
      "//div[@class='Verification__steps']//div/h6[text()='Verify your identity']"
    );
  }

  get verifyYourIdentityDescription() {
    return $(
      "//div[@class='Verification__steps']//div/p[text()='For your security, we’ll review & confirm your identity before you can make purchases through ACH.']"
    );
  }

  get linkYourBankTitle() {
    return $(
      "//div[@class='Verification__steps']//div[text()='Link your bank']"
    );
  }

  get linkYourBankDescription() {
    return $(
      "//div[@class='Verification__steps']//p[text()='We’ll review your banking information along with your identity to make sure you’re the right person. (A list of eligible jurisdictions can be found ']"
    );
  }

  get backHomeButton() {
    return $("//div[@class='Verification__footer']/a");
  }

  get verifyIdentityButton() {
    return $("//div[@class='Verification__footer']/div/button");
  }

  async clickBackHomeButton() {
    await this.backHomeButton.click();
  }
}

module.exports = new SetupBankForAch();
