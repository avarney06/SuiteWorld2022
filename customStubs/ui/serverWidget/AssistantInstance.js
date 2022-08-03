/*jshint esversion: 5*/
define(['./AssistantStep', './Field', './FieldGroup', './Sublist'], function (AssistantStep, Field, FieldGroup, Sublist) {
        
    /**
     *
     * @class {Assistant}
     * @classdesc Encapsulates a scriptable, multi-step NetSuite assistant. An assistant contains a series of step that a user must complete to accomplish a larger goal. An assistant can be sequential, or non-sequential and include optional steps. Each page of the assistant is defined by a step.
     * @constructor
     * @protected
     *
     * @since 2015.2
     */
    function Assistant() {

        /**
         * Array of Field instances
         * @name Assistant#fields
         * @type {Array}
         */
        this.fields = [];
        /**
         * Array of Field Group instances
         * @name Assistant#fieldgroups
         * @type {Array}
         */
        this.fieldGroups = [];
        /**
         * Array of Sublist instances
         * @name Assistant#sublists
         * @type {Array}
         */
        this.sublists = [];
        /**
         * Array of Assistant Step instances
         * @name Assistant#steps
         * @type {Array}
         */
        this.steps = [];
        /**
         * The last action of this Assistant.
         * @name Assistant#currentStep
         * @type {string}
         *
         * @since 2015.2
         */
        this.lastAction = undefined;
        /**
         * The last step of the assistant
         * @name Assistant#currentStep
         * @type {AssistantStep}
         *
         * @since 2015.2
         */
        this.lastStep = undefined;
        /**
         * The current step of the assistant
         * You can set any step as the current step.
         * @name Assistant#currentStep
         * @type {AssistantStep}
         *
         * @since 2015.2
         */
        this.currentStep = undefined;
        /**
         * Error message text for the current step. If you choose, you can use HTML tags to format the message.
         * @name Assistant#errorHtml
         * @type {string}
         *
         * @since 2015.2
         */        
        this.errorHtml = undefined;
        /**
         * The text to display after the assistant finishes. To trigger display of the completion message, call Assistant.isFinished().
         * @name Assistant#finishedHtml
         * @type {string}
         *
         * @since 2015.2
         */        
        this.finishedHtml = undefined;
        /**
         * Indicates whether assistant steps are displayed with numbers.
         * By default, the value is false, which means that steps are numbered.
         * If set to true, the assistant does not use step numbers.
         * To change step ordering, set Assistant.isNotOrdered.
         * @name Assistant#hideStepNumber
         * @type {boolean}
         *
         * @since 2015
         */
        this.hideStepNumber = undefined;
        /**
         * Indicates whether steps must be completed in a particular sequence. If steps are ordered, users must complete the current step before proceeding to the next step.
         * The default value is false, which means the steps are ordered.  Ordered steps appear vertically in the left panel of the assistant.
         * If set to true, steps can be completed in any order. In the UI, unordered steps appear horizontally and below the assistant title.
         * @name Assistant#isNotOrdered
         * @type {boolean}
         *
         * @since 2015.2
         */
        this.isNotOrdered = undefined;
        /**
         * The title for the assistant. The title appears at the top of all assistant pages.
         * This value overrides the title specified in serverWidget.createAssistant(options).
         * @name Assistant#title
         * @type {string}
         *
         * @since 2015.2
         */
        this.title = undefined;
        /**
         * Indicates whether to show or hide the Add to Shortcuts link that appears in the top-right corner of an assistant page.
         * By default, the value is false, which means the Add to Shortcuts link is visible in the UI.
         * If set to true, the Add To Shortcuts link is not visible on an Assistant page.
         * @name Assistant#hideAddToShortcutsLink
         * @type {boolean}
         *
         * @since 2015.2
         */
        this.hideAddToShortcutsLink = undefined;
        /**
         * Sets the default values of an array of fields that are specific to the assistant.
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {Array<Object>} options.values Array of name/value pairs that map field names to field values.
         * @return {void}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when values parameter is missing
         *
         * @since 2015.2
         */
        this.updateDefaultValues = function(options) {
            for (var fieldId in options.values) {
                this.fields[getElementIndexById(this.fields, fieldId)].defaultValue = options.values[fieldId];
            }
        };

        /**
         * The file cabinet ID of client script file to be used in this assistant
         * @name Assistant#clientScriptFileId
         * @type {number}
         * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT When clientScriptModulePath property was set beforehand
         * @throws {error.SuiteScriptError} WRONG_PARAMETER_TYPE if given file id is not a string nor a number
         *
         * @since 2015.2
         */        
        this.clientScriptFileId = undefined;
        /**
         * The file path of client script file to be used in this assistant
         * @name Assistant#clientScriptModulePath
         * @type {string}
         * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT When clientScriptFileId property was set beforehand
         * @throws {error.SuiteScriptError} WRONG_PARAMETER_TYPE if given file id is not a string
         *
         * @since 2015.2
         */
        this.clientScriptModulePath = undefined;
        /**
         * Sets the splash screen for an assistant page.
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.title Title of the splash screen
         * @param {string} options.text1 Text of the splash scheen
         * @param {string} [options.text2] Text for a second column on the splash screen, if desired.
         * @return {void}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when title or text1 parameter is missing
         *
         * @since 2015.2
         */
        this.setSplash = function(options) {
            if (options.title === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.setSplash: Missing a required argument: options.title"
                );
            }
            if (options.text1 === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.setSplash: Missing a required argument: options.text1"
                );
            }
            var splash = {};
            splash.title = options.title;
            splash.text1 = options.text1;
            if (options.text2) {
                splash.text2 = options.text2;
            }
            this.splash = splash;
        };

        /**
         * Gets a Field object from its id
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id Internal id for the field
         * @return {Field}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id parameter is missing
         *
         * @since 2015.2
         */
        this.getField = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.getField: Missing a required argument: options.id"
                );
            }
            var fieldIndex = getElementIndexById(this.fields, options.id);
            return fieldIndex === -1 ? null : this.fields[fieldIndex];
        };

        /**
         * Gets a FieldGroup  object from its id
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id Id of the field group
         * @return {FieldGroup}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id parameter is missing
         *
         * @since 2015.2
         */
        this.getFieldGroup = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.getFieldGroup: Missing a required argument: options.id"
                );
            }
            var fieldGroupIndex = getElementIndexById(this.fieldGroups, options.id);
            return fieldGroupIndex === -1 ? null : this.fieldGroups[fieldGroupIndex];
        };

        /**
         * Gets the name of last action taken by the user
         * To identify the step that the last action came from, use Assistant.getLastStep().
         * @restriction Server SuiteScript only
         * @governance none
         * @return {string}
         *
         * @since 2015.2
         */
        this.getLastAction = function() {
            return this.lastAction || '';
        };

        /**
         * Gets the step the last submitted action came from
         * @restriction Server SuiteScript only
         * @governance none
         * @return {AssistantStep}
         *
         * @since 2015.2
         */
        this.getLastStep = function() {
            return this.lastStep;
        };

        /**
         * Gets next logical step corresponding to the user's last submitted action
         * If you need information about the last step, use Assistant.getLastStep() before you use this method.
         * @restriction Server SuiteScript only
         * @governance none
         * @return {AssistantStep}
         *
         * @since 2015.2
         */
        this.getNextStep = function() {
            var currentStepIdIndex = getElementIndexById(this.steps, this.currentStep.id);
            var stepCountMaxIndex = this.steps.length -1;
            if (currentStepIdIndex < stepCountMaxIndex) {
                return this.steps[currentStepIdIndex + 1];
            } else {
                return null;
            }
        };

        /**
         * Gets the number of steps
         * @restriction Server SuiteScript only
         * @governance none
         * @return {number}
         *
         * @since 2015.2
         */
        this.getStepCount = function() {
            return this.steps.length;
        };

        /**
         * Indicates whether an assistant has an error message set for the current step. It returns true if Assistant.errorHtml contains a value, false otherwise.
         * @restriction Server SuiteScript only
         * @governance none
         * @return {boolean}
         *
         * @since 2015.2
         */
        this.hasErrorHtml = function() {
            return this.hasErrorHtml !== undefined;
        };

        /**
         * Indicates whether all steps in an assistant are completed.
         * @restriction Server SuiteScript only
         * @governance none
         * @return {boolean}
         *
         * @since 2015.2
         */
        this.isFinished = function() {
            var currentStepIdIndex = getElementIndexById(this.steps, this.currentStep.id);
            var stepCountMaxIndex = this.steps.length -1;
            return currentStepIdIndex === stepCountMaxIndex;
        };

        /**
         * Returns the step object in an assistant from its internal ID.
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id The internal ID of the step.
         * @return {AssistantStep}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id parameter is missing
         *
         * @since 2015.2
         */
        this.getStep = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.getStep: Missing a required argument: options.id"
                );
            }
            var stepIndex = getElementIndexById(this.steps, options.id);
            return stepIndex === -1 ? null : this.steps[stepIndex];
        };

        /**
         * Gets a Sublist  object from its id
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id  Id for the sublist
         * @return {Sublist}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id parameter is missing
         *
         * @since 2015.2
         */
        this.getSublist = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.getSublist: Missing a required argument: options.id"
                );
            }
            var sublistIndex = getElementIndexById(this.sublists, options.id);
            return sublistIndex === -1 ? null : this.sublists[sublistIndex];
        };

        /**
         * Adds a step to an assistant. Steps define each page of the assistant.
         * Use Assistant.isNotOrdered to control if the steps must be completed sequentially or in no specific order.
         * If you want to create help text for the step, you can use AssistantStep.helpText on the object returned.
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id  Id for the step
         * @param {string} options.label UI label for the step
         * @return {AssistantStep}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id or label parameter is missing
         *
         * @since 2015.2
         */
        this.addStep = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.addStep: Missing a required argument: id"
                );
            }
            if (options.label === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.addStep: Missing a required argument: label"
                );
            }
            var step = Object.assign({}, AssistantStep);
            step.id = options.id;
            step.label = options.label;
            this.steps.push(step);
            return step;
        };

        /**
         * Adds a field to an assistant. Use fields to record or display information specific to your needs.
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id  Id for the field
         * @param {string} options.label Label for the field
         * @param {string} options.type  Type for the field. Use the serverWidget.FieldType enum to set this value.
         * @param {string} [options.source] The internalId or scriptId of the source list for this field. Use this parameter if you are adding a select (List/Record) or multi-select type of field.
         * For radio fields only, the source parameter is not an optional parameter, it must contain the radio button's unique internal ID. The id parameter contains the ID that identifies all the radio buttons of the same group.
         * @param {string} [options.container]  Id for the field group of tab to place the field in
         * @return {Field}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id, label or type parameter is missing
         *
         * @since 2015.2
         */
        this.addField = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.addField: Missing a required argument: id"
                );
            }
            if (options.label === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.addField: Missing a required argument: label"
                );
            }
            if (options.type === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.addField: Missing a required argument: type"
                );
            }
            if (new serverWidgetFieldType()[options.type.toUpperCase()] === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_INVALID_TYPE_ARG",
                    "You have entered an invalid type argument: "+options.type.toUpperCase()
                );
            }
            var field = Object.assign({}, Field);
            field.id = options.id;
            field.label = options.label;
            field.type = options.type;
            if (options.container) {
                field.container = options.container;
            }
            if (options.source) {
                field.source = options.source;
            }
            this.fields.push(field);
            return field;
        };

        /**
         * Adds a field group to the assistant. A field group is a collection of fields that can be displayed in a one or two column format. Assign a field to a field group in order to label, hide or collapse a group of fields.
         * By default, the field group is collapsible and appears expanded on the assistant page. To change this behavior, set the FieldGroup.isCollapsed and FieldGroup.isCollapsible properties.
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id  Id for the field group
         * @param {string} options.label UI label for the field group
         * @return {FieldGroup}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id or label parameter is missing
         *
         * @since 2015.2
         */
        this.addFieldGroup = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.addFieldGroup: Missing a required argument: id"
                );
            }
            if (options.label === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.addFieldGroup: Missing a required argument: label"
                );
            }
            var fieldGroup = Object.assign({}, FieldGroup);
            fieldGroup.id = options.id;
            fieldGroup.label = options.label;
            this.fieldGroups.push(fieldGroup);
            return fieldGroup;
        };

        /**
         * Adds a sublist to the assistant. Only inline editor sublists are added.
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id  Id for the sublist
         * @param {string} options.label UI label for the sublist
         * @param {string} options.type The type of sublist to add. Currently, only the INLINEEDITOR sublist type can be added. For more information about this type of sublist, see serverWidget.SublistType.
         * @return {Sublist}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id, label or type parameter is missing
         *
         * @since 2015.2
         */
        this.addSublist = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.addSublist: Missing a required argument: id"
                );
            }
            if (options.label === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.addSublist: Missing a required argument: label"
                );
            }
            if (options.type === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.addSublist: Missing a required argument: type"
                );
            }
            if (new serverWidgetSublistType()[options.type.toUpperCase()] === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_INVALID_TYPE_ARG",
                    "You have entered an invalid type argument: "+options.type.toUpperCase()
                );
            }
            var sublist = Object.assign({}, Sublist);
            sublist.id = options.id;
            sublist.label = options.label;
            sublist.type = options.type;
            this.sublists.push(sublist);
            return sublist;
        };

        /**
         * Gets all ids for fields in the assistant
         * @restriction Server SuiteScript only
         * @governance none
         * @return {Array<string>}
         *
         * @since 2015.2
         */
        this.getFieldIds = function() {
            return this.fields
            .map(function(field) { return field.id; })
            .filter(function(id) { return id !== undefined; });
        };

        /**
         * Gets all field ids in the given assistant field group
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id Id of the field group
         * @return {Array<string>}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id parameter is missing
         *
         * @since 2015.2
         */
        this.getFieldIdsByFieldGroup = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.getFieldIdsByFieldGroup: Missing a required argument: id"
                );
            }
            return this.fields
            .filter(function(field) { return field.container === options.id; })
            .map(function(field) { return field.id; });
        };

        /**
         * Gets all ids for field groups in the assistant
         * @restriction Server SuiteScript only
         * @governance none
         * @return {Array<string>}
         *
         * @since 2015.2
         */
        this.getFieldGroupIds = function() {
            return this.fieldGroups
            .map(function(fieldGroup) { return fieldGroup.id; });
        };

        /**
         * Gets all ids for sublists in the assistant
         * @restriction Server SuiteScript only
         * @governance none
         * @return {Array<string>}
         *
         * @since 2015.2
         */
        this.getSublistIds = function() {
            return this.sublists
            .map(function(sublist) { return sublist.id; });
        };

        /**
         * Gets all steps in the assistant
         * @restriction Server SuiteScript only
         * @governance none
         * @return {Array<AssistantStep>}
         *
         * @since 2015.2
         */
        this.getSteps = function() {
            return this.steps;
        };

        /**
         * Use this method to manage redirects in an assistant. In most cases, an assistant redirects to itself
         * The sendRedirect(response) method is like a wrapper method that performs this redirect. This method
         * also addresses the case in which one assistant redirects to another assistant. In this scenario,
         * the second assistant must return to the first assistant if the user Cancels or the user Finishes.
         * This method, when used in the second assistant, ensures that the user is redirected back to the
         * first assistant.
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {ServerResponse} options.response The response that redirects the user.
         * @return {void}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when response parameter is missing
         *
         * @since 2015.2
         */
        this.sendRedirect = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Assistant.sendRedirect: Missing a required argument: id"
                );
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
        this.toString = function() {};

        /**
         * get JSON format of the object
         * @restriction Server SuiteScript only
         * @governance none
         * @return {Object}
         *
         * @since 2015.2
         */
        this.toJSON = function() {};
    }
    /**
     * Enumeration that holds the values for supported field types. This enum is used to set the value of the type parameter when Assistant.addField(options) is called.
     *
     * Consider the following as you work with these field types:
     * The FILE field type is available only for Suitelets and will appear on the main tab of the Suitelet page. FILE fields cannot be added to tabs, subtabs, sublists, or field groups and are not allowed on existing pages.
     * The INLINEHTML and RICHTEXT field types are not supported with Sublist.addField(options).
     * The IMAGE field type is available only for fields that appear on list/staticlist sublists. You cannot specify an IMAGE field on a Assistant.
     * The MULTISELECT field type is not supported by SuiteScript 2.0 Suitelets.
     * Radio buttons that are inside one container are exclusive. The method addField on form has an optional parameter container. For an example, see FieldGroup.label.
     * @enum {string}
     * @readonly
     */
    function serverWidgetFieldType() {
        this.CHECKBOX = 'CHECKBOX';
        this.CURRENCY = 'CURRENCY';
        this.DATE = 'DATE';
        this.DATETIME = 'DATETIME';
        this.DATETIMETZ = 'DATETIMETZ';
        this.EMAIL = 'EMAIL';
        this.FILE = 'FILE';
        this.FLOAT = 'FLOAT';
        this.HELP = 'HELP';
        this.IMAGE = 'IMAGE';
        this.INLINEHTML = 'INLINEHTML';
        this.INTEGER = 'INTEGER';
        this.LABEL = 'LABEL';
        this.LONGTEXT = 'LONGTEXT';
        this.MULTISELECT = 'MULTISELECT';
        this.PASSWORD = 'PASSWORD';
        this.PERCENT = 'PERCENT';
        this.PHONE = 'PHONE';
        this.RADIO = 'RADIO';
        this.RICHTEXT = 'RICHTEXT';
        this.SELECT = 'SELECT';
        this.TEXTAREA = 'TEXTAREA';
        this.TEXT = 'TEXT';
        this.TIMEOFDAY = 'TIMEOFDAY';
        this.URL = 'URL';
    }
    /**
     * Enumeration that holds the string values for valid sublist types. This enum is used to define the type parameter when Assistant.addSublist(options) is called.
     * INLINEEDITOR and EDITOR:
     * These types of sublists are both fully editable. The only difference between these types is their appearance in the UI:
     *
     * With an inline editor sublist, a new line is displayed at the bottom of the list after existing lines. To add a line, a user working in the UI clicks inside the new line and adds a value to each column as appropriate. Examples of this style include the Item sublist on the sales order record and the Expense sublist on the expense report record.
     * With an editor sublist, a user in the UI adds a new line by working with fields that are displayed above the existing sublist lines. This style is not common on standard NetSuite record types.
     *
     * LIST: This type of sublist has a fixed number of lines. You can update an existing line, but you cannot add lines to it.
     *
     * To make a field within a LIST type sublist editable, use Field.updateDisplayType(options) and the enum serverWidget.FieldDisplayType to update the field display type to ENTRY.
     * STATICLIST: This type of sublist is read-only. It cannot be edited in the UI, and it is not available for scripting.
     * @enum {string}
     * @readonly
     */
    function serverWidgetSublistType() {
        this.EDITOR = 'EDITOR';
        this.INLINEEDITOR = 'INLINEEDITOR';
        this.LIST = 'LIST';
        this.STATICLIST = 'STATICLIST';
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

    return new Assistant();
});