/*jshint esversion: 5*/
define([], function () {
        
    /**
     * Create a step by calling Assistant.addStep(options).
     *
     * @class AssistantStep
     * @classdesc Encapsulates a step within a custom NetSuite assistant.
     * @protected
     * @constructor
     *
     * @since 2015.2
     */    
    function AssistantStep() {

        /**
         * Array of Sublist instances
         * @name AssistantStep#sublists
         * @type {Array}
         */
        this.sublists = [];
        /**
         * Array of Field instances
         * @name AssistantStep#fields
         * @type {Array}
         */
        this.fields = [];
        /**
         * The internal id of the step.
         * @name AssistantStep#id
         * @type {string}
         * @readonly
         *
         * @since 2015.2
         */
        this.id = undefined;
        /**
         * The label of the step
         * @name AssistantStep#label
         * @type {string}
         *
         * @since 2015.2
         */
        this.label = undefined;
        /**
         * The index of this step as a number
         * A sequence of assistant steps starts at 1.
         * @name AssistantStep#stepNumber
         * @type {number}
         *
         * @since 2015.2
         */
        this.stepNumber = undefined;
        /**
         * Help text for the step
         * @name AssistantStep#helpText
         * @type {string}
         *
         * @since 2015.2
         */
        this.helpText = undefined;
        /**
         * Gets the IDs for all the sublist fields (line items) in a step
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.group  The internal id of the sublist
         * @return {Array<string>}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when group parameter is missing
         *
         * @since 2015.2
         */
        this.getSublistFieldIds = function(options) {
            if (options.group === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "AssistantStep.getSublistFieldIds: Missing a required argument: options.group"
                );
            }
            var sublistIndex = getElementIndexById(this.sublists, options.group);
            if (sublistIndex > -1) {
                return this.sublists[sublistIndex].fields
                .map(function(field) { return field.id; });
            } else {
                return null;
            }
        };

        /**
         * Gets the IDs for all the sublists submitted in a step.
         * @restriction Server SuiteScript only
         * @governance none
         * @return {Array<string>}
         *
         * @since 2015.2
         */
        this.getSubmittedSublistIds = function() {
            return this.sublists
            .map(function(sublist) { return sublist.id; });
        };

        /**
         * Gets the IDs for all the fields in a step.
         * @restriction Server SuiteScript only
         * @governance none
         * @return {Array<string>}
         *
         * @since 2015.2
         */
        this.getFieldIds = function() {
            return this.fields
            .map(function(field) { return field.id; });
        };

        /**
         * Gets the current value(s) of a field or multi-select field.
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id Internal id for the field
         * @return {string|Array<string>}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id parameter is missing
         *
         * @since 2015.2
         */
        this.getValue = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "AssistantStep.getValue: Missing a required argument: options.id"
                );
            }
            var fieldIndex = getElementIndexById(this.fields, options.id);
            if (fieldIndex > -1) {
                var field = this.fields[fieldIndex];
                if (field.type === 'SELECT' || field.type === 'MULTISELECT') {
                    return field.value || [];
                } else {
                    return field.value || '';
                }
            } else {
                return '';
            }
        };

        /**
         * Gets the number of lines on a sublist in a step. If the sublist does not exist, -1 is returned.
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.group internal Id of the sublist
         * @return {number}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when group parameter is missing
         *
         * @since 2015.2
         */
        this.getLineCount = function(options) {
            if (options.group === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "AssistantStep.getLineCount: Missing a required argument: options.group"
                );
            }
            var sublistIndex = getElementIndexById(this.sublists, options.group);
            if (sublistIndex > -1) {
                return this.sublists[sublistIndex].lineCount;
            } else {
                return null;
            }
        };

        /**
         * Gets the current value of a sublist field (line item) in a step.
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.group Internal id of the sublist
         * @param {string} options.id Internal id of the field
         * @param {string} options.line line number
         * @return {string}
         *
         * @since 2015.2
         */
        this.getSublistValue = function(options) {
            if (options.group === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "AssistantStep.getSublistValue: Missing a required argument: options.group"
                );
            }
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "AssistantStep.getSublistValue: Missing a required argument: options.id"
                );
            }
            if (options.line === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "AssistantStep.getSublistValue: Missing a required argument: options.line"
                );
            }
            var sublistIndex = getElementIndexById(this.sublists, options.group);
            if (sublistIndex > -1) {
                return this.sublists[sublistIndex].getSublistValue({id: options.id, line: options.line});
            } else {
                return null;
            }
        };

        /**
         * Returns the object type name
         * @restriction Server SuiteScript only
         * @governance none
         * @return {string}
         *
         * @since 2015.2
         */
        this.toString = function() {
            return "serverWidget.AssistantStep";
        };

        /**
         * get JSON format of the object
         * @restriction Server SuiteScript only
         * @governance none
         * @return {Object}
         *
         * @since 2015.2
         */
        this.toJSON = function() {
            return {"id": this.id};
        };
    }

    function validateFail(type, name, message) {
        return {
            "type": type,
            "name": name,
            "message": message,
            "cause": {
                "name": name,
                "message": message
            }
        };
    }

    function getElementIndexById(arr, id) {
        return arr.findIndex(function(element) { return element.id === id; });
    }

    return new AssistantStep();
});