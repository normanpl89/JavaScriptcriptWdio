const requestHandler = require('../helpers/httpRequestHelper');
const config = require('../../core/helpers/envHelper');

const uri = `${config.api_base}`
const accountEndpoint = '/'+`${config.version3}`+'/orders/reserve';
const admin = `${config.api_admin}`
const add_feature = '/ajax/core/v2/client/dynamic/feature/add'

const createWOR = async (account_id, user_id) => {
  const body = {
    referrerAccountId: account_id,
    owner: 'user:' + user_id + ''
  };
  const response = await requestHandler.sendPost(
    uri,
    accountEndpoint,
    body,
    `${config.wor_secret_key}`
  );
  return response;
};

const createWORForAccount = async (account_id, user_id, account_sk) => {
  const body = {
    referrerAccountId: account_id,
    owner: 'user:' + user_id
  };
  const response = await requestHandler.sendPost(
    uri,
    accountEndpoint,
    body,
    account_sk
  );
  return response;
};

const enableDigitalWallet = async (account_id, admin_token) => {
    const body = {
        'accountId': account_id,
        'feature': 'DIGITAL_WALLET_RESERVATION'
    }
    const response = await requestHandler.sendPost(admin, add_feature, body, admin_token)
    return response;
}


const WORService = {
    createWOR: createWOR,
    createWORForAccount: createWORForAccount,
    enableDigitalWallet:enableDigitalWallet
}


module.exports = WORService;
