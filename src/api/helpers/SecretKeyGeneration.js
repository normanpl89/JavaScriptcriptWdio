const requestHandler = require("./httpRequestHelper")
const config = require("../../core/helpers/envHelper");

const accountEndpoint = "/core/apiKeys";
const uri = `${config.api_dash}`


const generateSecretKey = async (token) => {
    const body= null;
    const response = await requestHandler.sendPost(uri, accountEndpoint, body, token)
    return response;
}

const secretKeyService = {
    generateSecretKey: generateSecretKey
}

module.exports = secretKeyService;
