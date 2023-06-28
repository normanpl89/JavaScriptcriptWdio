const request = require('supertest');
const myLogger = require('../../core/helpers/LoggerUtils');
let api = null;

const send_post = async (uri, endpoint, body = null, token = null) => {
  myLogger.info('Post: ' + uri);
  myLogger.info('Endpoint: ' + endpoint);
  myLogger.info('Body: ' + JSON.stringify(body));
  myLogger.info('Token: ' + token);
  api = request(uri);
  const response = await api
    .post(endpoint)
    .send(body)
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'application/json');
  myLogger.info('Post Response status: ' + response.status);
  myLogger.info('Post Response: ' + JSON.stringify(response.body));
  return response;
};

const send_get = async (endpoint) => {
  myLogger.info('GET: ' + endpoint);
  const response = await api
    .get(endpoint)
    .expect('Content-Type', /json/)
    .expect(200);
  myLogger.info('GET Response: ' + JSON.stringify(response.body));
  return response;
};

const send_put = async (endpoint, body) => {
  myLogger.info('PUT: ' + endpoint);
  myLogger.info(JSON.stringify(body));
  const response = await api
    .put(endpoint)
    .send(body)
    .expect('Content-Type', /json/)
    .expect(200);
  myLogger.info('PUT Response: ' + JSON.stringify(response.body));
  return response;
};

const requestHandler = {
  sendGet: send_get,
  sendPost: send_post,
  sendPut: send_put
};

module.exports = requestHandler;
