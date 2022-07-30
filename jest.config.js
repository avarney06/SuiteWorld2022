/*jshint esversion: 9*/
const SuiteCloudJestConfiguration = require("@oracle/suitecloud-unit-testing/jest-configuration/SuiteCloudJestConfiguration");
//const cliConfig = require("./suitecloud.config");

module.exports = SuiteCloudJestConfiguration.build({
    projectFolder: 'src',
    projectType: SuiteCloudJestConfiguration.ProjectType.ACP,
    customStubs: [
        {
            module: "N/ui/serverWidget",
            path: "<rootDir>/customStubs/ui/serverWidget/serverWidget.js"
        },
        {
            module: "N/ui/serverWidget/forminstance",
            path: "<rootDir>/customStubs/ui/serverWidget/FormInstance.js"
        },
        {
            module: "N/ui/serverWidget/field",
            path: "<rootDir>/customStubs/ui/serverWidget/Field.js"
        },
        {
            module: "N/log",
            path: "<rootDir>/customStubs/log/log.js"
        }
    ]
});
