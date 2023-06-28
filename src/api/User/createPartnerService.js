const requestHandler = require('../helpers/httpRequestHelper');
const config = require('../../core/helpers/envHelper');

const uri = `${config.api_admin}`;
const uriBase = `${config.api_base}`;
const accountEndpoint = '/ajax/core/v3/partners';
const accountEndpointUsers = '/' + `${config.version3}` + '/users/';

const createPartner = async (user_id, token) => {
  const body = {
    name: 'Automation',
    cvp: { SETTLE: [] },
    accountId: user_id,
    partnerSecurityModel: { type: 'BYPASS' }
  };
  const response = await requestHandler.sendPost(
    uri,
    accountEndpoint,
    body,
    token
  );
  return response;
};

const createUserAchPartner = async () => {
  const token = `${config.secret_key}`;
  const body = {
    country: 'US',
    fields: {},
    blockchains: [],
    scopes: ['SETTLE', 'ACH'],
    immediate: false
  };
  const response = await requestHandler.sendPost(
    uriBase,
    accountEndpointUsers,
    body,
    token
  );
  return response;
};

const createUserAchPartnerDinamic = async (token) => {
    const body = {
        "country": 'US',
        "fields":
            {},
        "blockchains": [],
        "scopes": ['SETTLE', 'ACH'],
        "immediate":false
    }
    const response =await requestHandler.sendPost(uriBase, accountEndpointUsers, body, token)
    return response;
}

const createPartnerDebitAch = async (account_id, token) => {
  const body = {
    name: 'Automation Test',
    cvp: { DEBIT_CARD_L2: ['DEBIT_CARD_L2'], ACH: ['ACH_V1'] },
    accountId: account_id,
    partnerSecurityModel: {
      type: 'CENTRALIZED',
      domains: ['test.com'],
      browserExtensionId: null
    },
    domains: ['test.com']
  };
  const response = await requestHandler.sendPost(
    uri,
    accountEndpoint,
    body,
    token
  );
  return response;
};

const partnerService = {
    createPartner: createPartner,
    createUserAchPartner:createUserAchPartner,
    createPartnerDebitAch:createPartnerDebitAch,
    createUserAchPartnerDinamic:createUserAchPartnerDinamic
}


module.exports = partnerService;
