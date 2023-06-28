const requestHandler = require('../helpers/httpRequestHelper');
const config = require('../../core/helpers/envHelper');

const uriBase = `${config.api_base}`;
const accountEndpointUsers = '/' + `${config.version3}` + '/users/';

const createUserDebitL2 = async (user_id, secret_token) => {
  const body = {
    country: 'US',
    fields: {},
    blockchains: [],
    scopes: ['DEBIT_CARD_L2']
  };
  const response = await requestHandler.sendPost(
    uriBase,
    accountEndpointUsers,
    body,
    secret_token
  );
  return response;
};

const createUserAchScope = async (user_id, secret_token) => {
  const body = {
    country: 'US',
    fields: {},
    blockchains: [],
    scopes: ['ACH']
  };
  const response = await requestHandler.sendPost(
    uriBase,
    accountEndpointUsers,
    body,
    secret_token
  );
  return response;
};

const createUserTransferScope = async (user_id, secret_token) => {
  const body = {
    country: 'US',
    fields: {},
    blockchains: [],
    scopes: ['TRANSFER']
  };
  const response = await requestHandler.sendPost(
    uriBase,
    accountEndpointUsers,
    body,
    secret_token
  );
  return response;
};

const createUserSettleScope = async (user_id, secret_token) => {
  const body = {
    country: 'US',
    fields: {},
    blockchains: [],
    scopes: ['SETTLE']
  };
  const response = await requestHandler.sendPost(
    uriBase,
    accountEndpointUsers,
    body,
    secret_token
  );
  return response;
};

const createUserBlockchainField = async (user_id, secret_token, blockchain) => {
  const body = {
    country: 'US',
    fields: {},
    blockchains: [blockchain],
    scopes: ['ACH']
  };
  const response = await requestHandler.sendPost(
    uriBase,
    accountEndpointUsers,
    body,
    secret_token
  );
  return response;
};

const createUserAllFieldScope = async (user_id, secret_token, scope) => {
  const body = {
    country: 'US',
    fields: {},
    blockchains: [],
    scopes: [scope]
  };
  const response = await requestHandler.sendPost(
    uriBase,
    accountEndpointUsers,
    body,
    secret_token
  );
  return response;
};


const createUserWithData = async (user_id, secret_token, body) => {
  const response = await requestHandler.sendPost(
    uriBase,
    accountEndpointUsers,
    body,
    secret_token
  );
  return response;
};
const userCreationService = {
  createUserDebitL2: createUserDebitL2,
  createUserAchScope: createUserAchScope,
  createUserTransferScope: createUserTransferScope,
  createUserSettleScope: createUserSettleScope,
  createUserBlockchainField: createUserBlockchainField,
  createUserAllFieldScope: createUserAllFieldScope,
  createUserWithData: createUserWithData
};

module.exports = userCreationService;
