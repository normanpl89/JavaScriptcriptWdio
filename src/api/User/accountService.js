const requestHandler = require('../helpers/httpRequestHelper');
const config = require('../../core/helpers/envHelper');
const myLogger = require('../../core/helpers/LoggerUtils');

const uri = `${config.api_base}`;
const admin_uri = '' + `${config.api_admin}` + '/ajax/core/v2/account';
const accountEndpoint = '/' + `${config.version2}` + '/accounts';

const createAccount = async (body) => {
  const response = await requestHandler.sendPost(uri, accountEndpoint, body);
  myLogger.info('Create User response: \n' + JSON.stringify(response.body));
  return response;
};

const setIndividualAcc = async (user_id, token) => {
  const profile_uri = '/' + user_id + '/profile';
  const body = {
    type: 'INDIVIDUAL'
  };
  const response = await requestHandler.sendPost(
    admin_uri,
    profile_uri,
    body,
    token
  );
  return response;
};

const setBusinessAcc = async (user_id, token) => {
  const profile_uri = '/' + user_id + '/profile';
  const body = {
    type: 'BUSINESS'
  };
  const response = await requestHandler.sendPost(
    admin_uri,
    profile_uri,
    body,
    token
  );
  return response;
};

const accountService = {
  createAccount: createAccount,
  setIndividualAcc: setIndividualAcc,
  setBusinessAcc: setBusinessAcc
};

module.exports = accountService;
