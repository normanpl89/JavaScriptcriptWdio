const requestHandler = require('../helpers/httpRequestHelper');
const config = require('../../core/helpers/envHelper');
const uri = `${config.api_base}`;
const createApiKey = async (accountSession, body) => {
  const endpoint = '/v2/apiKeys';
  const response = await requestHandler.sendPost(
    uri,
    endpoint,
    body,
    accountSession
  );
  return response;
};
module.exports = {
  createKeysForAccount: createApiKey
};
