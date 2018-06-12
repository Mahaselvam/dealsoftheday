# cfbt-sample-js-tests

This repository contains sample javascript tests for customer flow based testing.

## Pre-requisite

1. Node version : 4.8.5, Npm version : 5.6.0
2. Do `npm install`. This command must install all packages successfully without any error.
3. Browser Configuration : The default driver is configured to run with chrome. For chrome , install version : 63.0.3239.132 (or) higher. For firefox, install version : 45.0.2. You may modify the browser property in the config which is located at 'test/functional/config/config.json'

4. Selenium Server Configuration : The default selenium server is configured to run on your localhost, You may choose to modify the server configuration to point to bluefin selenium grid (or) you may setup your own grid. The config is located at 'test/functional/config/config.json'. To setup your local selenium server, refer to [Setup your local Selenium Grid](https://engineering.paypalcorp.com/confluence/display/SRE/Setting+Up+Local+Selenium+Grid). Configuration to point to bluefin selenium grid -
`"driver": {
    "browser": "chrome",
    "server": "http://seleniumc3grid.paypalcorp.com:4444/wd/hub"  
  }`

5. Run the sample test: `grunt test --name=paypalLoginTest --hostname=msmaster.qa.paypal.com`


## About the application

cfbt-sample-js-tests uses cfbt-js-core library. cfbt-js-core provides the key infrastructure support for executing web and api tests. If you would like to know more about cfbt-js-core, please refer to https://github.paypal.com/SRE-CFBT/cfbt-js-core/blob/develop/README.md


