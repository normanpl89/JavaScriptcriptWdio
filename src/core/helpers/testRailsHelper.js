const config = require('./envHelper');
const { CucumberRailClient } = require('testrail-integration');
const myLogger = require('./LoggerUtils');

const options = {
  username: config.testRailsConfig.userName,
  password: config.testRailsConfig.userPwd,
  url: config.testRailsConfig.url
};
const testrail = new CucumberRailClient(options);

const runStatuses = {
  passed: 1,
  blocked: 2,
  untested: 3,
  Retest: 4,
  failed: 5
};

const runid = config.testRailsConfig.testRunId;
const version = config.testRailsConfig.buildVersion;

const addResultForTest = async (scenario) => {
  const testCaseStatus =
    runStatuses[scenario.result.status.toLocaleLowerCase()];

  const tags = scenario.pickle.tags;
  let tagTest = '';
  await tags.forEach(async (element) => {
    if (element.name.includes('@C')) {
      myLogger.info('Test Case ID: ' + element.name);
      tagTest = element.name;
    }
  });

  const content = {
    status_id: testCaseStatus,
    comment: scenario.result.message,
    version: version,
    elapsed: scenario.result.duration.nanos,
    defects: ''
  };

  try {
    tagTest = tagTest.replace('@C', '');
    const res = await testrail.addResultForCase(runid, tagTest, content);
    myLogger.info('Testrails Run result: ');
    myLogger.info(res);
  } catch (error) {
    myLogger.info('Error on testrails integration' + error);
  }
};

const addNewRun = async () => {
  const myNewRun = {
    suite_id: 2,
    name: 'My TESTRUN!',
    description: 'Automation'
  };
  const newRunResult = await testrail.addRun(1, myNewRun);
  myLogger.info('New Run Details' + JSON.stringify(newRunResult));
};

module.exports = {
  testrail: testrail,
  runId: runid,
  version: version,
  addTestResult: addResultForTest,
  addNewRun: addNewRun
};
