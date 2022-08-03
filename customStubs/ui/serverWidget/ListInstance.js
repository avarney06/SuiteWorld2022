define(['./Button', './ListColumn'], function (Button, ListColumn) {
    /**
     * @class List
     * @classdesc Primary object used to encapsulate a list page
     * @protected
     * @constructor
     *
     * @since 2015.2
     */    
    function List() {

        /**
         * Array of Row instances
         * @name List#rows
         * @type {Array}
         */
        this.rows = [];
        /**
         * Array of ListColumn instances
         * @name List#columns
         * @type {Array}
         */
        this.columns = [];
        /**
         * Array of Button instances
         * @name List#buttons
         * @type {Array}
         */
        this.buttons = [];
        /**
         * Sets the display style for this list
         * Possible values are in serverWidget.ListStyle.
         * @name List#style
         * @type {string}
         *
         * @since 2015.2
         */
        this.style = undefined;
        /**
         * List title
         * @name List#title
         * @type {string}
         *
         * @since 2015.2
         */
        this.title = undefined;
        /**
         * Add a Button to the list page
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id The script id for button. The id must be in lowercase, contain no spaces, and include the prefix custpage if you are adding the button to an existing page.
         * @param {string} options.label the ui label of button
         * @param {string} [options.functionName] The function name to call when clicking on this button.
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
                    "List.addButton: Missing a required argument: id"
                );
            }
            if (options.label === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "List.addButton: Missing a required argument: label"
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
         * Adds a column to a list page
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.id   The internal id for the column
         * @param {string} options.type  The type for the column
         * @param {string} options.label  The ui label for the column
         * @param {string} [options.align] The layout justification for this column. Set this value using the serverWidget.LayoutJustification enum. The default value is left.
         * @return {ListColumn}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when id, label, or type parameter is missing
         *
         * @since 2015.2
         */
        this.addColumn = function(options) {
            if (options.id === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "List.addColumn: Missing a required argument: id"
                );
            }
            if (options.label === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "List.addColumn: Missing a required argument: label"
                );
            }
            if (options.type === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "List.addColumn: Missing a required argument: type"
                );
            }
            if (new serverWidgetFieldType()[options.type.toUpperCase()] === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_INVALID_TYPE_ARG",
                    "You have entered an invalid type argument: "+options.type.toUpperCase()
                );
            }
            var column = Object.assign({}, ListColumn);
            column.id = options.id;
            column.label = options.label;
            column.type = options.type;
            this.columns.push(column);
            return column;
        };

        /**
         * Adds a column containing Edit or Edit/View links to the list page.
         * The column is added to the left of a previously existing column.
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {ListColumn} options.column  The Edit/View column is added to the left of this column
         * @param {boolean} [options.showView]  If true then an Edit/View column will be added. Otherwise only an Edit column will be added.
         * @param {boolean} [options.showHrefCol] - If set, this value must be included in row data provided for the
         * list and will be used to determine whether the URL for this link is clickable
         * @param {string} [options.link] The target of Edit/View link (For example: /app/common/entity/employee.nl). The complete link is formed like this: /app/common/entity/employee.nl?id=123
         * @param {string} [options.linkParam] If set, this value must be included in row data provided for the
         * list and will be appended to link as url parameter (defaults to column). The internal ID of the field in the row data where to take the parameter from.
         * @param {string} [options.linkParamName] Name of the url link parameter (defaults to 'id' if not set)
         * @return {ListColumn}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when any required parameter is missing
         *
         * @since 2015.2
         */
        this.addEditColumn = function(options) {
            if (options.column === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "List.addEditColumn: Missing a required argument: column"
                );
            }
            if (options.column.toString() !== "serverWidget.ListColumn") {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "List.addEditColumn: options.column is not a type serverWidget.ListColumn"
                );
            }
            var columnsIndex = getElementIndexById(this.columns, options.column.id);

            var column = Object.assign({}, ListColumn);
            column.id = 'editcolumn';
            column.label = 'Edit Column';
            if (options.showView) {
                column.showView = true;
            }
            if (options.showHrefCol) {
                column.showHrefCol = true;
            }
            if (options.link) {
                column.setURL(options.link);
            }
            var param = {};
            if (options.linkParam) {
                param.value = options.linkParam;
            } else {
                param.value = options.column.id;
            }
            if (options.linkParamName) {
                param.param = options.linkParamName;
            } else {
                param.param = 'id';
            }
            column.addParamToURL(param);
            column.dynamicUrlParameter = true;
            this.columns.splice(columnsIndex, 0, column);
            return column;
        };

        /**
         * Adds a navigation cross-link to the list page
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.type  The type of link to add. The value is set using the FormPageLinkType enum.
         * @param {string} options.title  The UI text displayed in the link
         * @param {string} options.url  The URL used for this link
         * @return {List}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when type, title or url parameter is missing
         *
         * @since 2015.2
         */
        this.addPageLink = function(options) {
            if (options.type === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "List.addPageLink: Missing a required argument: type"
                );
            }
            if (options.title === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "List.addPageLink: Missing a required argument: title"
                );
            }
            if (options.url === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "List.addPageLink: Missing a required argument: url"
                );
            }
            if (new serverWidgetFormPageLinkType()[options.type.toUpperCase()] === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_INVALID_TYPE_ARG",
                    "You have entered an invalid type argument: "+options.type.toUpperCase()
                );
            }
            return this;
        };

        /**
         * Adds a single row to a list (Array of name/value pairs or search.Result)
         * @restriction Server SuiteScript only
         * @governance none
         *
         * @param {Object} options
         * @param {Object} options.row  Row definition corresponds to a search.Result object or contains name/value pairs containing the values for the corresponding Column object in the list.
         * @return {List}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when row parameter is missing
         *
         * @since 2015.2
         */
        this.addRow = function(options) {
            if (options.row === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "List.addRow: Missing a required argument: row"
                );
            }
            var rowInstance = {};
            rowInstance.columns = [];
            for (var id in options.row) {
                if (options.row.hasOwnProperty(id)) {
                    var columnIndex = getElementIndexById(this.columns, id);
                    if (columnIndex > -1) {
                        var thisColumn = this.columns[columnIndex];
                        var column = Object.assign({}, thisColumn);
                        column.value = options.row[id];
                        if (thisColumn.url !== undefined) {
                            column.setUrl(thisColumn.url);
                            column.addParamToURL({param: thisColumn.param, value: column.value});
                        }
                        rowInstance.columns.push(column);
                    }
                }
            }
            this.rows.push(rowInstance);
            return this;
        };

        /**
         * Adds multiple rows (Array of search.Result or name/value pair Arrays)
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {Array<Object>} options.rows An array of rows that consist of either a search.Result array, or an array of name/value pairs. Each pair should contain the value for the corresponding Column object in the list.
         * @return {List}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when rows parameter is missing
         *
         * @since 2015.2
         */
        this.addRows = function(options) {
            if (options.rows === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "List.addRows: Missing a required argument: rows"
                );
            }
            if (Array.isArray(options.rows)) {
                for (var i = 0; i < options.rows.length; i++) {
                    this.addRow(options.rows[i]);
                }
            }
            return this;
        };

        /**
         * The file cabinet ID of client script file to be used in this list.
         * @name List#clientScriptFileId
         * @type {number}
         * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT When clientScriptModulePath property was set beforehand
         *
         * @since 2015.2
         */
        this.clientScriptFileId = undefined;
        /**
         * The file path of client script file to be used in this list.
         * @name List#clientScriptModulePath
         * @type {string}
         * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT When clientScriptFileId property was set beforehand
         *
         * @since 2015.2
         */
        this.clientScriptModulePath = undefined;
        /**
         * get JSON format of the object
         * @restriction Server SuiteScript only
         * @governance none
         * @return {Object}
         *
         * @since 2015.2
         */
        this.toJSON = function() {
            return {"title": this.title};
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
            return "serverWidget.List";
        };
    }
    /**
     * Enumeration that holds the values for supported field types. This enum is used to set the value of the type parameter when List.addField(options) is called.
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
    /**
     * Enumeration that holds the string values for supported page link types on a form. This enum is used to set the value of the type parameter when Form.addPageLink(options) is called.
     * BREADCRUMB - Link appears on the top-left corner after the system bread crumbs
     * CROSSLINK - Link appears on the top-right corner.
     * @enum {string}
     * @readonly
     *
     */
    function serverWidgetFormPageLinkType() {
        this.BREADCRUMB = 'BREADCRUMB';
        this.CROSSLINK = 'CROSSLINK';
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

    return new List();
});