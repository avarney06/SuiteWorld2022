/*jshint esversion: 5*/
define(['./Button', './Field'], function (Button, Field) {
        
    /**
     * To add a sublist, use Assistant.addSublist(options) or Form.addSublist(options).
     *
     * @class Sublist
     * @classdesc Encalsulates a Sublist in a Form or a serverWidget.Assistant
     * @protected
     * @constructor
     *
     * @since 2015.2
     */
    function Sublist() {

        /**
         * Array of line instances
         * @name Sublist#sublists
         * @type {Array}
         */
        this.lines = [];
        /**
         * Array of Field instances
         * @name Sublist#fields
         * @type {Array}
         */
        this.fields = [];
        /**
         * Array of Button instances
         * @name Sublist#buttons
         * @type {Array}
         */
        this.buttons = [];
        /**
         * The label of the sublist
         * @name Sublist#label
         * @type {string}
         *
         * @since 2015.2
         */
        this.label = undefined;
        /**
         * The number of lines in the Sublist.
         * @name Sublist#lineCount
         * @type {number}
         * @readonly
         *
         * @since 2015.2
         */
        this.lineCount = this.lines.length;
        /**
         * Set an id of a field that is to have unique values accross the rows in the sublist
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id The id of the field to use as a unique field
         * @return {Sublist}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id parameter is missing
         *
         * @since 2015.2
         */
        this.updateUniqueFieldId = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Sublist.updateUniqueFieldId: Missing a required argument: options.id"
                );
            }
            this.updateUniqueFieldId = options.id;
        };

        /**
         * Id of a field designated as a totalling column, which is used to calculate and display a running total for the sublist
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id The id of the field to use as a total field
         * @return {Sublist}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id parameter is missing
         *
         * @since 2015.2
         */
        this.updateTotallingFieldId = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Sublist.updateTotallingFieldId: Missing a required argument: options.id"
                );
            }
            this.updateTotallingFieldId = options.id;
        };

        /**
         * Display type of the sublist.  Possible values are in serverWidget.SublistDisplayType enum
         * @name Sublist#displayType
         * @type {string}
         *
         * @since 2015.2
         */
        this.displayType = undefined;
        /**
         * Inline help text to this sublist.
         * @name Sublist#helpText
         * @type {string}
         *
         * @since 2015.2
         */
        this.helpText = undefined;
        /**
         * Adds a button to the sublist
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id the script id of button
         * @param {string} options.label the label of button
         * @param {string} [options.functionName] The function name to be triggered on a button click.
         * @return {Button}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id or label parameter is missing
         *
         * @since 2015.2
         */
        this.addButton = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Sublist.addButton: Missing a required argument: id"
                );
            }
            if (options.label === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Sublist.addButton: Missing a required argument: label"
                );
            }
            var button = Object.assign({}, Button);
            button.id = options.id;
            button.label = options.label;
            if (options.functionName && typeof options.functionName === "string") {
                button.functionName = options.functionName;
            }
            this.buttons.push(button);
            return button;
        };

        /**
         * Gets a field value on a sublist.
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id The internal ID of the field.
         * @param {number} options.line The line number for this field.
         * @throws {SuiteScriptError} YOU_CANNOT_CALL_1_METHOD_ON_SUBRECORD_FIELD_SUBLIST_2_FIELD_3 When trying to access a subrecord field
         * @return {string}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id or line parameter is missing
         *
         * @since 2015.2
         */
        this.getSublistValue = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Sublist.getSublistValue: Missing a required argument: id"
                );
            }
            if (options.line === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Sublist.getSublistValue: Missing a required argument: line"
                );
            }
            if (options.line >= this.lineCount || options.line < 0) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Sublist.getSublistValue: Index out of bounds"
                );
            }
            var lineInstance = this.lines[options.line];
            var lineFieldIndex = getElementIndexById(lineInstance.fields, options.id);
            if (lineFieldIndex > -1) {
                return lineInstance.fields[lineFieldIndex].value;
            } else {
                return null;
            }
        };

        /**
         * Set the value of a field on the list
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id   id of the field to set
         * @param {number} options.line line number
         * @param {string} options.value value to set on the field
         * @return {void}
         * @throws {SuiteScriptError} YOU_CANNOT_CALL_1_METHOD_ON_SUBRECORD_FIELD_SUBLIST_2_FIELD_3 When trying to access a subrecord field
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id parameter is missing
         *
         * @since 2015.2
         */
        this.setSublistValue = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Sublist.setSublistValue: Missing a required argument: id"
                );
            }
            if (options.line === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Sublist.setSublistValue: Missing a required argument: line"
                );
            }
            if (options.value === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Sublist.setSublistValue: Missing a required argument: value"
                );
            }
            if (options.line < 0 || options.line > this.lineCount) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Sublist.getSublistValue: Index out of bounds"
                );
            }
            var lineInstance = {};
            if (options.line === this.lineCount) {
                lineInstance.fields = [];
                lineInstance.fields.length = this.fields.length;
                for (var i = 0; i < this.fields.length; i++) {
                    lineInstance.fields[i] = Object.assign({}, this.fields[i]);
                }
                this.lines.push(lineInstance);
            } else {
                lineInstance = this.lines[options.line];
            }
            var fieldIndex = getElementIndexById(lineInstance.fields, options.id);
            if (fieldIndex > -1) {
                lineInstance.fields[fieldIndex].value = options.value;
            }
        };

        /**
         * Adds a Refresh button to the sublist.
         * @restriction Server SuiteScript only
         * @governance none
         * @return {Button}
         *
         * @since 2015.2
         */
        this.addRefreshButton = function() {
            var button = Object.assign({}, Button);
            button.id = 'refresh';
            button.label = 'Refresh';
            this.buttons.push(button);
            return button;
        };

        /**
         * Adds a "Mark All" and an "Unmark All" button to a sublist.
         * @restriction Server SuiteScript only
         * @governance none
         * @return {Array<Button>}
         *
         * @since 2015.2
         */
        this.addMarkAllButtons = function() {
            var buttonMark = Object.assign({}, Button);
            buttonMark.id = 'markall';
            buttonMark.label = 'Mark All';
            this.buttons.push(buttonMark);
            var buttonUnmark = Object.assign({}, Button);
            buttonUnmark.id = 'unmarkall';
            buttonUnmark.label = 'Unmark All';
            this.buttons.push(buttonUnmark);
            return [
                buttonMark,
                buttonUnmark
            ];
        };

        /**
         * Add a field, column, to the Sublist
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id    id of the field to add
         * @param {string} options.label the UI label for the field
         * @param {string} options.type  the type for this field. Use the serverWidget.FieldType enum to set this value. The INLINEHTML and RICHTEXT values are not supported with this method. The MULTISELECT value is not supported for SuiteScript 2.0 Suitelets.
         * @param {string} [options.source] The internalId or scriptId of the source list for this field. Use this parameter if you are adding a select (List/Record) type of field.
         * @param {string} [options.container] Used to specify either a tab or a field group
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
                    "Sublist.addField: Missing a required argument: id"
                );
            }
            if (options.label === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Sublist.addField: Missing a required argument: label"
                );
            }
            if (options.type === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "Sublist.addField: Missing a required argument: type"
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
            for (var i = 0; i < this.lines.length; i++) {
                this.lines[i].fields.push(Object.assign({}, field));
            }
            return field;
        };

        /**
         * Gets field from sublist
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id    id of the field to get
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
                    "Sublist.getField: Missing a required argument: options.id"
                );
            }
            var fieldIndex = getElementIndexById(this.fields, options.id);
            return fieldIndex === -1 ? null : this.fields[fieldIndex];
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
            return "serverWidget.Sublist";
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
        this.DATETIMETZ = 'DATETIMETZ';
        this.EMAIL = 'EMAIL';
        this.FLOAT = 'FLOAT';
        this.IMAGE = 'IMAGE';
        this.INTEGER = 'INTEGER';
        this.PASSWORD = 'PASSWORD';
        this.PERCENT = 'PERCENT';
        this.PHONE = 'PHONE';
        this.SELECT = 'SELECT';
        this.TEXTAREA = 'TEXTAREA';
        this.TEXT = 'TEXT';
        this.TIMEOFDAY = 'TIMEOFDAY';
        this.URL = 'URL';
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

    return new Sublist();
});