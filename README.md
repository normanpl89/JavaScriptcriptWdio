# webdriverio-test


Make sure you have installed a Node version.

```
Nodejs Versions 12..16.1
NPM Version 6.13.4
```

First install the dependencies
```
npm i
```
# Generate .env file base on .env_example


1. Copy and paste .env_example file and rename it to .env
2. Fill the credentials base on the target env selected 

# Finally you can run the ui tests

```
npx wdio run ./wdio.conf.js
```

```
npx wdio ./wdio.conf.js --cucumberOpts.tagExpression @User_001
```
To disable headless mode on chrome run

```
npm run wdio -- --cucumberOpts.tagExpression @C61 --headless=false
```

## To run api tests run following commands

```
npm run api
```
Run by tag
```
npx wdio run ./config/api.wdio.config.js --cucumberOpts.tagExpression @api_test
```

# Allure Report for ui tests
Install Allure report comand line tool
```
sudo npm install -g allure-commandline --save-dev
```

To generate report run
```
allure generate
```

To serve allure report run
```
allure serve
```

---
TestRails Integration
---

To enable integration for testrails follow these steps:

1. Add testcase id as a tag to the scenario ex: @C5535
2. Set saveTestRails env variable to true in the .env file
3. Make sure that testRunId(Testrails Run id), buildVersion(Any build version), userName, userPwd are filled wit proper data


BrowserStack
---

To run mobile web test make sure to update androidDeviceName and androidPlatFormVersion on the .env file

```
androidDeviceName=Samsung Galaxy S22 Ultra
androidPlatFormVersion=12.0
```

To execute wdio for android web testing run 

```
 npm run wdioBrowserStack
```
Appium
---

To run android web test make sure to update androidDeviceName and androidPlatFormVersion on the .env file

```
androidDeviceName=emulator-5554
androidPlatFormVersion=11.0
```

to run android web test on local emulator run, make sure appium server is up.
```
 npm run androidBrowser
```

CIRCLECI
---

circleci config process .circleci/config.yml

circleci local execute --job wyre-automation

DOCKER
---

Build docker image

```
docker build -t barrios/node-ubuntu .
```

Run  docker container

```
docker run -it barrios/node-ubuntu 
```

Run allure docker service
docker-compose up