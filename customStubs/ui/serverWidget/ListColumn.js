define([], function () {
    /**
     * @class ListColumn
     * @classdesc Encapsulates a list column
     * @protected
     * @constructor
     *
     * @since 2015.2
     */
    function ListColumn() {
        /**
         * ListColumn url
         * @name ListColumn#url
         * @type {string}
         *
         * @since 2015.2
         */
        this.url = undefined;
        /**
         * ListColumn urlParam
         * @name ListColumn#urlParam
         * @type {string}
         *
         * @since 2015.2
         */
        this.urlParam = undefined;
        /**
         * ListColumn is dynamic url
         * @name ListColumn#dynamicUrl
         * @type {Boolean}
         *
         * @since 2015.2
         */
        this.dynamicUrl = false;
        /**
         * ListColumn is dynamic url parameter
         * @name ListColumn#dynamicUrlParameter
         * @type {Boolean}
         *
         * @since 2015.2
         */
        this.dynamicUrlParameter = false;
        /**
         * Adds a URL parameter (optionally defined per row) to the list column's URL
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.param  Name for the parameter
         * @param {string} options.value  Value for the parameter
         * @param {boolean} [options.dynamic]  If true, then the parameter value is actually an alias that is calculated per row
         * @return {ListColumn}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when param or value parameter is missing
         *
         * @since 2015.2
         */
        this.addParamToURL = function(options) {
            if (options.param === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "ListColumn.addParamToURL: Missing a required argument: param"
                );
            }
            if (options.value === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "ListColumn.addParamToURL: Missing a required argument: value"
                );
            }
            if (options.dynamic === true) {
                this.param = options.param;
                this.url += "?"+options.param+"="+this.value;
            } else if (options.dynamic === false) {
                this.param = options.param;
                this.url += "?"+options.param+"="+options.value;
            }
            return this;
        };

        /**
         * @name ColumnList#label This list column label.
         * @type {string}
         *
         * @since 2015.2
         */
        this.label = undefined;
        /**
         * Sets the base URL for the list column
         * @restriction Server SuiteScript only
         * @governance none
         * @param {Object} options
         * @param {string} options.url  The base url or a column in the data source that returs the
         * base url for each row
         * @param {boolean} [options.dynamic] If true, then the URL is actually an alias that is calculated per row
         * @return {ListColumn}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT when url parameter is missing
         *
         * @since 2015.2
         */
        this.setURL = function(options) {
            if (options.url === undefined) {
                throw validateFail(
                    "error.SuiteScriptError",
                    "SSS_MISSING_REQD_ARGUMENT",
                    "ListColumn.setURL: Missing a required argument: column"
                );
            }
            this.url = options.url;
            this.dynamicUrl = options.dynamic || false;
            return this;
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
            return {"label": this.label};
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
            return "serverWidget.ListColumn";
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

    return new ListColumn();
});