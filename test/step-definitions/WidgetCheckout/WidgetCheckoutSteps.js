const { Then, When } = require('@wdio/cucumber-framework');
const timeUtils = require('../../../src/core/helpers/TimeUtils');

let accountServiceSteps = require('../Admin/AccountServiceSteps');
const WidgetCheckout = require('../../../src/ui/widgetCheckout/widgetCheckout.page');
const SelectPaymentMethodPage = require('../../../src/ui/widgetCheckout/selectPaymentMethod.page');
const SetupBankForAch = require('../../../src/ui/widgetCheckout/setupBankForACH.page');
const myLogger = require('../../../src/core/helpers/LoggerUtils');
const widgetCheckoutPage = require('../../../src/ui/widgetCheckout/widgetCheckout.page');
const TimeUtils = require('../../../src/core/helpers/TimeUtils');

When(/^I navigate to widget checkout for WOR$/, async () => {
  let context = await accountServiceSteps.apiContext();
  await WidgetCheckout.open(context.url);
  //Added sleep due to widget checkout takes around 20 seconds to load
  await timeUtils.sleep(10000);
});

When(
  /^I set (.*) amount in amount field in widget checkout page$/,
  async (amount) => {
    await WidgetCheckout.amountFieldValidator(amount);
  }
);

When(/^I click on select payment method$/, async () => {
  await WidgetCheckout.clickSelectPaymentMethod();
});

When(
  /^I validate the field amount entering the two following numbers (.*)$/,
  async (numbers) => {
    await WidgetCheckout.amountFieldValidator(numbers);
  }
);

When(/^Validate the red error message (.*)$/, async (errorMessage) => {
  expect(await WidgetCheckout.checkErrorAmountField()).toBe(errorMessage);
});

When(
  /^If I enter the amount of (.*) should be replaced by (.*)$/,
  async (amount, expected) => {
    await WidgetCheckout.amountFieldValidator(amount);
    expect(await WidgetCheckout.getAmountField()).toBe(expected);
  }
);

When(
  /^I validate that the amount field does not allow special characters like (.*) just (.*)$/,
  async (amount, valid) => {
    await WidgetCheckout.amountFieldValidator(amount);
    expect(await WidgetCheckout.getAmountField()).toEqual('1');
    await WidgetCheckout.amountFieldValidator(valid);
    expect(await WidgetCheckout.getAmountField()).toEqual('0.');
  }
);

When(
  /^I validate that the amount does not allow to enter (.*) or (.*)$/,
  async (lower, upper) => {
    await WidgetCheckout.amountFieldValidator(lower);
    expect(await WidgetCheckout.getAmountField()).toEqual('0.');
    await WidgetCheckout.amountFieldValidator(upper);
    expect(await WidgetCheckout.getAmountField()).toEqual('0.');
  }
);

When(
  /^I validate the error message (.*) from the amount field when is empty$/,
  async (message) => {
    await WidgetCheckout.amountCleanValue();
    expect(await WidgetCheckout.getAmountEmptyError()).toEqual(message);
  }
);

When(/^I click on ach payment method Card$/, async () => {
  await SelectPaymentMethodPage.clickOnAchTransferCard();
});

When(/^I click on credit\/debit payment method Card$/, async () => {
  await SelectPaymentMethodPage.clickOnCreditDebitTransferCard();
});

When(/^I click on back home button on setup back for ach$/, async () => {
  await SetupBankForAch.clickBackHomeButton();
});

When(/^I set "(.*)" wallet on widget checkout page$/, async (wallet) => {
  await WidgetCheckout.setWalletAddress(wallet);
});

When(
  /^I click on currency description on {2}widget checkout page$/,
  async () => {
    await WidgetCheckout.clickOnCurrencyDescription();
  }
);

When(
  /^I select crypto currency (.*) as destination source$/,
  async (destinationSource) => {
    await WidgetCheckout.setCryptoCurrencyAsDestinationSource(
      destinationSource
    );
  }
);

When(
  /^I should see (.*) as a destination source$/,
  async (destinationSource) => {
    expect(
      await WidgetCheckout.checkDestinationCurrencyIsSelected(destinationSource)
    ).toBeTruthy();
  }
);

When(/^I accept term on widget checkout page$/, async () => {
  await WidgetCheckout.acceptTerms();
});

When(/^I click on Next button on widget checkout page$/, async () => {
  await WidgetCheckout.clickNextButton();
});

When(/^I click on close button on widget checkout$/, async () => {
  await WidgetCheckout.clickCloseButton();
});

Then(/^I Validate Next Button is Disable$/, async () => {
  await WidgetCheckout.isNextButtonDisable();
});

Then(/^I Validate Next Button is Enable$/, async () => {
  await WidgetCheckout.isNextButtonEnable();
});

When(
  /^I search for (.*) currency in (.*) form$/,
  async (currency, currencyForm) => {
    if (currencyForm.toLowerCase().includes('pay with')) {
      await WidgetCheckout.clickCurrencyFrom();
      await WidgetCheckout.searchForCurrencyInPayWithForm(currency);
    }

    if (currencyForm.toLowerCase().includes('destination')) {
      await WidgetCheckout.clickDestinationForm();
      await WidgetCheckout.seachForCurrencyInDestinationForm(currency);
    }
  }
);

Then(/^I see widget checkout page$/, async () => {
  TimeUtils.sleep(10000);
  await expect(await WidgetCheckout.isWidgetCheckoutDisplayed()).toBe(true);
});

Then(/^I should not see widget checkout page$/, async () => {
  await expect(await WidgetCheckout.isWidgetCheckoutDisplayed()).toBe(false);
});

Then(/^I select the currency "(.*)" and select the following currencies$/, async (source, data) => {
    const myData = data.rows();
    for (const element of myData) {
      if (source.toLowerCase().includes('pay with')) {
        await WidgetCheckout.selectCurrencyCountry(element);
        continue;
      }
      if (source.toLowerCase().includes('destination')) {
        await WidgetCheckout.setCryptoCurrencyAsDestinationSource(element);
      }
    }
});

Then(/I validate all the valid <currency>$/, async (currency) => {
  await WidgetCheckout.selectCurrencyCountry(currency);
});

Then(/^I see select payment method page$/, async () => {
  await expect(
    await SelectPaymentMethodPage.isPaymentMethodPageDisplayed()
  ).toBe(true);
});

Then(/^I see "(.*)" as payment method$/, async (paymentMethod) => {
  myLogger.info('verifying text');
  await expect(
    await WidgetCheckout.checkThatPaymentMethodIsSelected(paymentMethod)
  ).toBe(true);
});

Then(
  /^I see error "(.*)" message for invalid wallet on widget checkout page$/,
  async (errorMessage) => {
    await expect(
      await WidgetCheckout.isErrorMessageDisplayed(errorMessage)
    ).toBe(true);
  }
);

Then(
  /^I don't see error "(.*)" message for invalid wallet on widget checkout page$/,
  async (errorMessage) => {
    await expect(
      await WidgetCheckout.isErrorMessageDisplayed(errorMessage)
    ).toBe(false);
  }
);

Then(/^I validate all the valid currencies on the pay from$/, async (data) => {
  await WidgetCheckout.clickCurrencyFrom();
  const myData = data.rows();
  for (const element of myData) {
    await expect(await WidgetCheckout.checkAllValidCurrencies(element)).toBe(
      true
    );
  }
});

Then(
  /^I validate all the valid currencies on the destination form$/,
  async (data) => {
    await WidgetCheckout.clickDestinationForm();
    const myData = data.rows();
    for (const element of myData) {
      await expect(
        await WidgetCheckout.checkAllValidDestinationCurrencies(element)
      ).toBe(true);
    }
  }
);

Then(
  /^I validate that (.*) is displayed in (.*) form$/,
  async (currency, currencyForm) => {
    if (currencyForm.toLowerCase().includes('pay with')) {
      await expect(
        await WidgetCheckout.isCurrencyCountryDisplayed(currency)
      ).toBe(true);
    }
    if (currencyForm.toLowerCase().includes('destination')) {
      await expect(
        await WidgetCheckout.isCurrencyDestinationDisplayed(currency)
      ).toBe(true);
    }
  }
);

Then(
  /^I see (.*) amount in amount field in widget checkout page$/,
  async (amount) => {
    expect(await WidgetCheckout.getAmountField()).toBe(amount);
  }
);

Then(/^I see accept term checkbox is not selected$/, async () => {
  expect(JSON.parse(await WidgetCheckout.acceptTermsIsSelected())).toBe(false);
});

Then(/^I see "(.*)" text in accept terms$/, async (description) => {
  expect(await WidgetCheckout.getAcceptTermDescription()).toBe(description);
});

Then(/^I see next button is not enabled$/, async () => {
  expect(await WidgetCheckout.isNextButtonEnabled()).toBe(false);
});

Then(/^I see next button is enabled$/, async () => {
  expect(await WidgetCheckout.isNextButtonEnabled()).toBe(true);
});

Then(/^I validate fee summary in widget checkout page$/, async (table) => {
  await timeUtils.sleep(2000);
  const myData = table.rows();
  for (const raw of myData) {
    myLogger.info(raw);
    myLogger.info(raw[0]);
    myLogger.info(raw[1]);

    expect(await WidgetCheckout.getFeeSummary(raw[0])).toBe(raw[1]);
  }
});

When(/^I validate Alert "(.*)"$/, async (MessageAlert) => {
  await widgetCheckoutPage.validateAlertThisBrowserDoesNotSupportApplePay(
    MessageAlert
  );
  expect(
    await WidgetCheckout.validateAlertThisBrowserDoesNotSupportApplePay()
  ).toBe(MessageAlert);
});
