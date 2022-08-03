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
            module: "N/ui/serverWidget/assistantinstance",
            path: "<rootDir>/customStubs/ui/serverWidget/AssistantInstance.js"
        },
        {
            module: "N/ui/serverWidget/assistantstep",
            path: "<rootDir>/customStubs/ui/serverWidget/AssistantStep.js"
        },
        {
            module: "N/ui/serverWidget/button",
            path: "<rootDir>/customStubs/ui/serverWidget/Button.js"
        },
        {
            module: "N/ui/serverWidget/fieldgroup",
            path: "<rootDir>/customStubs/ui/serverWidget/FieldGroup.js"
        },
        {
            module: "N/ui/serverWidget/listcolumn",
            path: "<rootDir>/customStubs/ui/serverWidget/ListColumn.js"
        },
        {
            module: "N/ui/serverWidget/listinstance",
            path: "<rootDir>/customStubs/ui/serverWidget/ListInstance.js"
        },
        {
            module: "N/ui/serverWidget/sublist",
            path: "<rootDir>/customStubs/ui/serverWidget/Sublist.js"
        },
        {
            module: "N/ui/serverWidget/tab",
            path: "<rootDir>/customStubs/ui/serverWidget/Tab.js"
        },
        {
            module: "N/log",
            path: "<rootDir>/customStubs/log/log.js"
        }
    ]
});
