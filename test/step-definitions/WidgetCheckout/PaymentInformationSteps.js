const PaymentInformation = require('../../../src/ui/widgetCheckout/paymentInformation.page');
const DataTestUtils = require('../../../src/core/helpers/testDataUtils');
const myLogger = require('../../../src/core/helpers/LoggerUtils');
const faker = require('faker');
const { Then, When } = require('@wdio/cucumber-framework');

When(/^I fill payment information data$/, async () => {
  const paymentInformation = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    cardNumber: DataTestUtils.creditCard.cardNumber,
    cardExpiration: DataTestUtils.creditCard.expirationDate,
    cardCvv: DataTestUtils.creditCard.cvv,
    country: 'United States',
    state: 'California',
    address: faker.address.direction(),
    postalCode: '93309',
    city: faker.address.city(),
    email: faker.internet.email(),
    phone: '3475597045'
  };

  myLogger.info('Payment information:\n' + JSON.stringify(paymentInformation));
  await PaymentInformation.fillPaymentInformation(paymentInformation);
});

When(/^I fill payment information data for a Predifined User$/, async () => {
  const paymentInformation = {
    cardNumber: DataTestUtils.creditCard.cardNumber,
    cardExpiration: DataTestUtils.creditCard.expirationDate,
    cardCvv: DataTestUtils.creditCard.cvv,
    phone: '3475597045'
  };

  myLogger.info('Payment information:\n' + JSON.stringify(paymentInformation));
  await PaymentInformation.fillPaymentInformationPredifinedUser(
    paymentInformation
  );
});

When(
  /^I fill credit card info on payment information of widget checkout$/,
  async () => {
    const paymentInformation = {
      cardNumber: DataTestUtils.creditCard.cardNumber,
      cardExpiration: DataTestUtils.creditCard.expirationDate,
      cardCvv: DataTestUtils.creditCard.cvv
    };

    myLogger.info(
      'Payment information:\n' + JSON.stringify(paymentInformation)
    );
    await PaymentInformation.fillPaymentInformationPredifinedUser(
      paymentInformation
    );
  }
);

When(
  /^I select (.*) in country of payment information in widget checkout$/,
  async (country) => {
    await PaymentInformation.setCountry(country);
  }
);

When(
  /^I search (.*) in country of payment information in widget checkout$/,
  async (country) => {
    await PaymentInformation.searchAndSetCountry(country);
  }
);

When(
  /^I select (.*) State of payment information in widget checkout$/,
  async (state) => {
    await PaymentInformation.setState(state);
  }
);

When(
  /^I set "(.*)" in address field of payment information in widget checkout$/,
  async (address) => {
    await PaymentInformation.setAddress(address);
  }
);

When(
  /^I set "(.*)" in zip code of payment informatin in widget checkout$/,
  async (postalCode) => {
    await PaymentInformation.setPostalCode(postalCode);
  }
);

When(
  /^I set "(.*)" in city of payment informatin in widget checkout$/,
  async (city) => {
    await PaymentInformation.setCity(city);
  }
);

When(
  /^I set "(.*)" in phone of payment information in widget checkout$/,
  async (phone) => {
    await PaymentInformation.setPhone(phone);
  }
);

When(
  /^I set "(.*)" in card code of payment information in widget checkout$/,
  async (cardCode) => {
    await PaymentInformation.setCardCode(cardCode);
  }
);

When(
  /^I set change (.*) phone flag to be (.*) in payment information in widget checkout$/,
  async (countrySet, countryToChange) => {
    await PaymentInformation.changePhoneFlag(countrySet, countryToChange);
  }
);

When(
  /^I click on back button of payment information in widget checkout$/,
  async () => {
    await PaymentInformation.clickBackButton();
  }
);

When(
  /^I click on close button of payment information in widget checkout$/,
  async () => {
    await PaymentInformation.clickCloseButton();
  }
);

Then(
  /^I see (.*) in country of payment information in widget checkout$/,
  async (country) => {
    await expect(await PaymentInformation.getCountry()).toEqual(country);
  }
);

Then(
  /^I see (.*) flag in phone flag of payment informatio in widget checkout$/,
  async (country) => {
    await expect(await PaymentInformation.isFlagDisplayed(country)).toBe(true);
  }
);

Then(
  /^I see (.*) in state field of payment information in widget checkout$/,
  async (state) => {
    await expect(await PaymentInformation.getState()).toBe(state);
  }
);

Then(
  /^I see "(.*)" in address field of payment information in widget checkout$/,
  async (address) => {
    await expect(await PaymentInformation.getAddress()).toEqual(address);
  }
);

Then(
  /^I see "(.*)" in zip code of payment informatin in widget checkout$/,
  async (postalCode) => {
    await expect(await PaymentInformation.getPostalCode()).toEqual(postalCode);
  }
);

Then(
  /^I see "(.*)" in city of payment informatin in widget checkout$/,
  async (city) => {
    await expect(await PaymentInformation.getCity()).toEqual(city);
  }
);

Then(
  /^I see "(.*)" error message in phone of payment information in widget checkout$/,
  async (message) => {
    await expect(await PaymentInformation.getPhoneErrorMessage()).toEqual(
      message
    );
  }
);

When(
  /^I fill payment information data with RandomData For Text Fields: FirstName:"(.*)" LastName: "(.*)" Credit Card Number "(.*)" CardExpirationDate: "(.*)" CardCCV: "(.*)" Country: "(.*)" State: "(.*)" Adress:"(.*)" PostalCode:"(.*)" City:"(.*)" Email "(.*)" and Celphone "(.*)"$/,
  async (
    TestDataFirstName,
    TesDataLastName,
    TestDataCreditCard,
    TestDataCardExpiration,
    TestDataCCV,
    TestDataCountry,
    TestDataState,
    TestDataAddress,
    TestDataPostalCode,
    TestDataCity,
    TestDataEmail,
    TestDataCelphone
  ) => {
    const paymentInformation = {
      firstName: TestDataFirstName,
      lastName: TesDataLastName,
      cardNumber: TestDataCreditCard,
      cardExpiration: TestDataCardExpiration,
      cardCvv: TestDataCCV,
      country: TestDataCountry,
      state: TestDataState,
      address: TestDataAddress,
      postalCode: TestDataPostalCode,
      city: TestDataCity,
      email: TestDataEmail,
      phone: TestDataCelphone
    };

    myLogger.info(
      'Payment information:\n' + JSON.stringify(paymentInformation)
    );
    await PaymentInformation.fillPaymentInformation(paymentInformation);
  }
);

Then(/^I click on submit button$/, async () => {
  await PaymentInformation.clickSubmitButton();
});

Then(
  /^I see that Next button is clickable in payment information of widget checkout$/,
  async () => {
    expect(await PaymentInformation.isSubmitButtonClickable()).toBe(true);
  }
);

Then(/^I see payment information page$/, async () => {
  expect(await PaymentInformation.isPaymentInformationDisplayed()).toBe(true);
});

Then(/^I validate warning message "(.*)"$/, async (MessageAlert) => {
  await PaymentInformation.validateErrorMessage(MessageAlert);
  expect(await PaymentInformation.validateErrorMessage()).toBe(MessageAlert);
});

Then(/^I validate Submit Buttton Is clickable$/, async () => {
  await PaymentInformation.SubmitButtonisEnabled();
});
