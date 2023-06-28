const requestHandler = require('./httpRequestHelper');
const config = require('../../core/helpers/envHelper');

const accountEndpoint = '/rest/api/2/issue';
const uri = `${config.api_jira}`;
const token = `${config.jira_token}`;

const createJiraIssue = async (summary, description) => {
  const body = {
    fields: {
      project: {
        key: 'DEV'
      },
      summary: summary, //"Automation Ignore"
      description: description, //"Creating of an issue using IDs for ",
      issuetype: {
        name: 'Bug'
      },
      customfield_11021: [
        {
          id: '10361',
          value: 'Fix broken feature - not significant (or undetermined) value'
        }
      ],

      reporter: {
        id: '61fc15df9c1d52006929ac88'
      },
      customfield_11005: 'Test',
      customfield_11006: 'Test',
      customfield_11007: 'Test',
      environment: 'QA'
    }
  };

  const response = await requestHandler.sendPost(
    uri,
    accountEndpoint,
    body,
    token
  );
  return response;
};

const jiraService = {
  createJiraIssue: createJiraIssue
};

module.exports = jiraService;
