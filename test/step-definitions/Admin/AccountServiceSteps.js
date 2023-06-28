const { Then, When } = require('@wdio/cucumber-framework');
const assert = require('assert');
const faker = require('faker');

const accountService = require('../../../src/api/User/accountService');
const adminToken = require('../../../src/api/helpers/AdminToken');
const createPartner = require('../../../src/api/User/createPartnerService');
const secretToken = require('../../../src/api/helpers/SecretKeyGeneration');
const createWOR = require('../../../src/api/User/createWOR');
const myLogger = require('../../../src/core/helpers/LoggerUtils');
const testDataUtils = require('../../../src/core/helpers/testDataUtils');
const userCreationService = require('../../../src/api/User/UserCreation');
const apiKeyService = require('../../../src/api/User/apiKeys');

let context = null;
let user_id = null;
let token = null;
let admToken = null;
let sk = null;
let email = null;
let partner_user = null;
let sk_of_new_account = null;
let new_account_id = null;
let new_account_token = null;

When(/^I create an account with valid data$/, { timeout: 100000 }, async () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  email = 'Automation+' + firstName + lastName + '@sendwyre.com';
  const body = { email: email, password: 'wyreWYRE1234', country: 'US' };
  context = await accountService.createAccount(body);
  user_id = context.body.authenticatedAs.substring(8);
  token = context.body.sessionId;
  new_account_token = context.body.sessionId;
        myLogger.info('UserID: ' + user_id);
});
When(
  /^I generate api key for the new account$/,
  { timeout: 100000 },
  async () => {
    const body = { type: 'FULL' };
    myLogger.info('Creating api keys for new account.');
    response = await apiKeyService.createKeysForAccount(token, body);
    new_account_id = response.body.owner.substring(8);
    sk_of_new_account = response.body.secretKey;

  }
);

Then(/^The response should contain a valid user ID$/, async () => {
  assert(user_id != null);
});

When(/^I create an account with invalid data$/, async () => {
  const body = { email: '', password: 'wyreWYRE1234', country: 'US' };
  context = await accountService.createAccount(body);
});

When(
  /^I create user for partner account with (.*) field id$/,
  async (fieldID) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    let country = 'US';
    email = 'Automation+' + firstName + lastName + '@sendwyre.com';
    let fieldsData = {
      firstName: firstName,
      lastName: lastName,
      legalName: firstName + ' ' + lastName,
      ssn: '333224444',
      email: email,
      cellphoneNumber: '+380676577024',
      residenceAddress: {
        street1: faker.address.direction(),
        city: faker.address.city(),
        postalCode: '12344',
        state: faker.address.state(),
        country: country
      }
    };

    if (fieldID.toLowerCase().includes('random')) {
      fieldsData.residenceAddress.city = Math.random()
        .toString(36)
        .substring(2, 7);
      fieldsData.ssn = Math.random().toString(36).substring(2, 7);
      myLogger.info(JSON.stringify(fieldsData));
    }
    if (fieldID.toLowerCase().includes('digits')) {
      fieldsData = 1231231;
      myLogger.info(fieldsData);
    }
    if (fieldID.toLowerCase().includes('special_chars')) {
      fieldsData = '£$%^&';
      myLogger.info(fieldsData);
    }
    if (
      fieldID.toLowerCase().includes('true') ||
      fieldID.toLowerCase().includes('false')
    ) {
      fieldsData = String(fieldID.toLowerCase()) === 'true';
      myLogger.info(fieldsData);
    }
    if (fieldID.toLowerCase().includes('empty')) {
      fieldsData = '';
      myLogger.info(fieldsData);
    }

    const body = {
      country: country,
      fields: fieldsData,
      blockchains: [],
      immediate: false,
      scopes: ['DEBIT_CARD_L2', 'ACH']
    };
    if (fieldID.toLowerCase().includes('absent')) {
      delete body['fields'];
      myLogger.info(body);
    }
    context = await userCreationService.createUserWithData(
      new_account_id,
      sk_of_new_account,
      body
    );

    if (context.status != 200) {
      myLogger.info(
        'Create user for partner failed with status: ' + context.status
      );
      return;
    }
    myLogger.info('New user created: ' + JSON.stringify(context.body));
  }
);

When(
  /^I create user for partner account with (.*) inmediate field$/,
  async (inmediateField) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    let country = 'US';
    email = 'Automation+' + firstName + lastName + '@sendwyre.com';
    let fieldsData = {
      firstName: firstName,
      lastName: lastName,
      legalName: firstName + ' ' + lastName,
      ssn: '333224444',
      email: email,
      cellphoneNumber: '+380676577024',
      residenceAddress: {
        street1: faker.address.direction(),
        city: faker.address.city(),
        postalCode: '12344',
        state: faker.address.state(),
        country: country
      }
    };
    const body = {
      country: country,
      fields: fieldsData,
      blockchains: [],
      immediate: inmediateField,
      scopes: ['DEBIT_CARD_L2', 'ACH']
    };

    if (inmediateField.toLowerCase().includes('random')) {
      body.immediate = Math.random().toString(36).substring(2, 7);
      myLogger.info(JSON.stringify(body));
    }

    if (inmediateField.toLowerCase().includes('absent')) {
      delete body['immediate'];
      myLogger.info("Removed inmediate from body: ")
      myLogger.info(JSON.stringify(body));
    }
    context = await userCreationService.createUserWithData(
      new_account_id,
      sk_of_new_account,
      body
    );

    if (context.status != 200) {
      myLogger.info(
        'Create user for partner failed with status: ' + context.status
      );
      return;
    }
    myLogger.info('New user created: ' + JSON.stringify(context.body));
  }
);


When(
  /^I create user for partner account with (.*) country$/,
  async (countryField) => {
    if (countryField.toLowerCase().includes('random')) {
      countryField = Math.random().toString(36).substring(2, 7);
      myLogger.info(countryField);
    }
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    email = 'Automation+' + firstName + lastName + '@sendwyre.com';
    const body = {
      email: email,
      password: 'wyreWYRE1234',
      country: countryField
    };
    context = await accountService.createAccount(body);

    if (context.status != 200) {
      myLogger.info(
        'Create user for partner failed with status: ' + context.status
      );
      return;
    }

    user_id = context.body.authenticatedAs.substring(8);
    token = context.body.sessionId;
    myLogger.info('New user created: ' + user_id);
  }
);

Then(/^I should get response (.*)$/, async (expected_status) => {
  expect(context.status).toBe(parseInt(expected_status));
});

Then(/^I generate a valid admin token$/, async () => {
  const response = await adminToken.adminToken();
  admToken = response.body.sessionId;
});

Then(/^I generate a valid admin token for the new user created$/, async () => {
  const response = await adminToken.newToken(email, 'wyreWYRE1234');
  admToken = response.body.sessionId;
});

Then(/^I generate a valid secret token$/, async () => {
  const response = await secretToken.generateSecretKey(admToken);
  sk = response.body.secretKey;
  myLogger.info('SK: ' + sk);
});

Then(
  /^I create a new User with Custom field scope with (.*) and response (.*)$/,
  async (scope, response) => {
    context = await userCreationService.createUserAllFieldScope(
      user_id,
      sk,
      scope
    );
    expect(context.status).toBe(parseInt(response));
  }
);

Then(
  /^I validate all the negative scenarios for (.*) field and response (.*)$/,
  async (scope, response) => {
    context = await userCreationService.createUserBlockchainField(
      user_id,
      sk,
      scope
    );
    expect(context.status).toBe(parseInt(response));
  }
);

Then(/^I create a partner relation in SETTLE scope$/, async () => {
  context = await createPartner.createPartner(user_id, admToken);
});

Then(
  /^I create a partner relation in SETTLE scope with (.*)$/,
  async (user) => {
    context = await createPartner.createPartnerDebitAch(user, admToken);
  }
);

Then(/^I create a partner (.*) with partner unauthorized$/, async (user) => {
  context = await createPartner.createPartnerDebitAch(user, '');
});

Then(/^I create a partner with Debit Card and ACH$/, async () => {
  context = await createPartner.createPartnerDebitAch(user_id, admToken);
});

Then(/^I create a user with partner relationship with ACH scope$/, async () => {
  context = await createPartner.createUserAchPartner();
});

Then(
  /^I create a partner for a new user relationship with ACH scope$/,
  async () => {
    await createPartner.createPartner(user_id, admToken);
    const response = await createPartner.createUserAchPartnerDinamic(sk);
    expect(response.status).toBe(200);
    partner_user = response.body.id;
  }
);

Then(/^I need to validate the ACH response$/, async () => {
  expect(context.body.id).toContain('US');
  expect(context.body.status).toBe('OPEN');
});

Then(/^I active as Individual account$/, async () => {
  context = await accountService.setIndividualAcc(user_id, admToken);
});

Then(/^I active as Business account$/, async () => {
  context = await accountService.setBusinessAcc(user_id, admToken);
});

Then(
  /^I create a WOR with account (.*) and (.*)$/,
  async (account_id, user) => {
    context = await createWOR.createWOR(account_id, user);
  }
);

Then(/^I create a WOR for the new user created$/, async () => {
  await createWOR.enableDigitalWallet(user_id, admToken);
  context = await createWOR.createWORForAccount(user_id, partner_user, sk);
  console.log('CONTEXT: ' + context);
});

Then(/^I create a WOR for predefined account$/, async () => {
  context = await createWOR.createWORForAccount(
    testDataUtils.accountForWor.accountId,
    testDataUtils.accountForWor.userId,
    testDataUtils.accountForWor.secretKey
  );
  myLogger.info('WOR created: ' + JSON.stringify(context.body));
});

Then(/^I need to validate the WOR response$/, async () => {
  expect(context.body.url).toContain(
    'https://pay.qawyre.com/purchase?accountId='
  );
});

Then(
  /^I need to validate the Partner API response message (.*)$/,
  async (message) => {
    expect(context.body.message).toContain(message);
  }
);

Then(/^I need to validate the Debit ACH response$/, async () => {
  expect(context.body.id).toContain('PT_');
  expect(context.body.name).toContain('Automation Test');
  expect(context.body.cvp.DEBIT_CARD_L2[0]).toContain('DEBIT_CARD_L2');
  expect(context.body.cvp.ACH[0]).toContain('ACH_V1');
});

module.exports = {
  apiContext: async () => await context.body,
  userId: async () => await user_id,
  email: async () => await email,
  token: async () => await token
};
