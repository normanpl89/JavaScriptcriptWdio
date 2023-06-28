const requestHandler = require('../helpers/httpRequestHelper');
const config = require('../../core/helpers/envHelper');

const uri = `${config.api_admin}`;
const accountEndpoint = '/ajax/core/v2/sessions/auth';

const adminToken = async () => {
  const body = {
    email: config.automation_email,
    password: config.automation_pwd,
    token: config.automation_token
  };
  const response = await requestHandler.sendPost(uri, accountEndpoint, body);
  return response;
};

const newToken = async (email,password) => {
    const body = {
        "email":email,
        "password":password,
        "token":config.automation_token
    }
    const response = await requestHandler.sendPost(uri, accountEndpoint, body)
    return response;
}

const adminTokenService = {
    adminToken: adminToken,
    newToken:newToken
}


module.exports = adminTokenService;
