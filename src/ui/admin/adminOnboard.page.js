const BasePage = require('../page');
const timeUtils = require('../../../src/core/helpers/TimeUtils');
const elementHelper = require('../../../utils/elementHelper');


class AdminOnboardPage extends BasePage {
  get dropdownBtn() {
    return $('#accountTypeDropdown');
  }

  get individualOpt() {
    return $('a=Individual');
  }

  async searchByAccountID(account_id) {
    await this.searchBar.setValue(account_id);
    await timeUtils.sleep(5000);
  }

  get personalDetails() {
    return $('a=Personal Details');
  }

  get personalIdentification() {
    return $('a=Personal Identification');
  }

  get electronicSignature() {
    return $('a=Electronic Signature');
  }

  get bankStatement() {
    return $('a=Bank Statement');
  }

  get approveRecord() {
    return $('a=Approve Record');
  }

  get complianceReq() {
    return $('a=Compliance Requirements');
  }

  get overviewTab() {
    return $('//a[@class="ng-binding" and contains (., "account")]');
  }

  get complianceStatus() {
    return $('span.text-success b');
  }

    async activateComplianceReq() {
        /**
         * enable personal details for compliance req.
         */
        await elementHelper.clickElement(this.personalDetails);
        await elementHelper.clickElement(this.approveRecord);
        await elementHelper.clickElement(this.complianceReq)

        /**
         * enable personal identification for compliance req.
         */
        await elementHelper.clickElement(this.personalIdentification);
        await elementHelper.clickElement(this.approveRecord);
        await elementHelper.clickElement(this.complianceReq);

        /**
         * enable electronic signature for compliance req.
         */
        await elementHelper.clickElement(this.electronicSignature);
        await elementHelper.clickElement(this.approveRecord);
        await elementHelper.clickElement(this.complianceReq);
    }

    async activateBank() {
        /**
         * enable bank statement for compliance req.
         */
        await elementHelper.clickElement(this.bankStatement);
        await elementHelper.clickElement(this.approveRecord);
        await elementHelper.clickElement(this.complianceReq);
    }

    async returnAccountOverview() {
        await elementHelper.clickElement(this.overviewTab);
    }

    async getComplianceStatus() {
        await browser.refresh();
        await this.complianceStatus.waitForDisplayed({ timeout: 18000 });
        return this.complianceStatus.getText();
    }


    async selectIndividualOpt() {
        await elementHelper.clickElement(this.dropdownBtn);
        await elementHelper.clickElement(this.individualOpt);
        await timeUtils.sleep(3000);
        await browser.keys('\uE007');
        await timeUtils.sleep(40000);
    }

}

module.exports = new AdminOnboardPage();
