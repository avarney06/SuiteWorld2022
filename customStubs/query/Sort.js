define([], function () {
    /**
     * @class Sort
     * @classDescription Encapsulates a sort based on the query.Query or query.Component object. The query.Sort object describes a sort that is placed on a particular query result column.
     * @constructor
     * @protected
     *
     * @since 2018.1
     */    
    function Sort() {    
        
        /**
         * Describes the query result column that the query results are sorted by.
         * @name Sort#column
         * @type {Column}
         * @readonly
         * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
         *
         * @since 2018.1
         */        
        this.column = undefined;        
        /**
         * Indicates whether the sort direction is ascending.
         * @name Sort#ascending
         * @type {Boolean}
         * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE when setting wrong sort order is attempted
         *
         * @since 2018.2
         */        
        this.ascending = undefined;        
        /**
         * Indicates whether the sort is case sensitive.
         * @name Sort#caseSensitive
         * @type {Boolean}
         * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE when setting non-boolean parameter
         *
         * @since 2018.2
         */        
        this.caseSensitive = undefined;        
        /**
         * Indicates whether query results with null values are listed at the end of the query results.
         * @name Sort#nullsLast
         * @type {Boolean}
         * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE when setting non-boolean parameter
         *
         * @since 2018.2
         */        
        this.nullsLast = undefined;        
        /**
         * Sort locale
         * @name Sort#locale
         * @type {string}
         * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE when setting non-boolean parameter
         *
         * @since 2018.2
         */        
        this.locale = undefined;        
        /**
         * Returns the object type name (query.Sort)
         * @governance none
         * @return {string}
         *
         * @since 2018.1
         */        
        this.toString = function() {};        
        
        /**
         * get JSON format of the object
         * @governance none
         * @return {Object}
         *
         * @since 2018.1
         */        
        this.toJSON = function() {};        
    }

    return new Sort();
});