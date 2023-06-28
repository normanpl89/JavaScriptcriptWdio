Zip allure-results folder
```
zip -r allure-results.zip allure-results
```

Upload report 
```
curl -X 'POST'   'https://allure-server.qa.wyreops.com/api/result'   -H 'accept: */*'   -H 'Content-Type: multipart/form-data'   -F 'allureResults=@allure-results.zip;type=application/zip'
```

Create or generate Report
```
curl -X 'POST' \
  'https://allure-server.qa.wyreops.com/api/report' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "reportSpec": {
    "path": [
      "string"
    ],
    "executorInfo": {
      "name": "wyre-automation",
      "type": "allure-results",
      "url": "string",
      "buildOrder": 0,
      "buildName": "string",
      "buildUrl": "string",
      "reportName": "wyre-automation",
      "reportUrl": "wyre"
    }
  },
  "results": [
    "d4806642-5b4c-470a-83a3-536fa6e84948"
  ],
  "deleteResults": true
}'
```