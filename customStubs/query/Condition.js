define([], function () {
    /**
     * Specifies the condition used to filter the results. It can consist of other Condition objects.
     * @class Condition
     * @classDescription A condition narrows the query results. The query.Condition object acts in the same capacity as the search.Filter object in the N/search Module. The primary difference is that query.Condition objects can contain other query.Condition objects.
     * @constructor
     * @protected
     *
     * @since 2018.1
     */    
    function Condition() {    
        
        /**
         * Holds an array of child conditions used to create the parent condition.
         * @name Condition#children
         * @type {Array<Condition>}
         * @readonly
         * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
         *
         * @since 2018.1
         */        
        this.children = undefined;        
        /**
         * Holds the name of the condition.
         * @name Condition#fieldId
         * @type {string}
         * @readonly
         * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
         *
         * @since 2018.1
         */        
        this.fieldId = undefined;        
        /**
         * Holds the name of the operator used to create the condition.
         * @name Condition#operator
         * @type {string}
         * @readonly
         * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
         *
         * @since 2018.1
         */        
        this.operator = undefined;        
        /**
         * Holds an array of values used by an operator to create the condition.
         * @name Condition#values
         * @type {Array<string>}
         * @readonly
         * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
         *
         * @since 2018.1
         */        
        this.values = undefined;        
        /**
         * Describes the formula used to create the condition.
         * @name Condition#formula
         * @type {string}
         * @readonly
         * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
         *
         * @since 2018.1
         */        
        this.formula = undefined;        
        /**
         * Describes the return type of the formula used to create the condition.
         * @name Condition#type
         * @type {string}
         * @readonly
         * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
         *
         * @since 2018.1
         */        
        this.type = undefined;        
        /**
         * Describes an aggregate function that is performed on the condition. An aggregate function performs a calculation on the condition values and returns a single value.
         * @name Condition#aggregate
         * @type {string}
         * @readonly
         * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
         *
         * @since 2018.1
         */        
        this.aggregate = undefined;        
        /**
         * Describes the component used to created the condition
         * @name Condition#component
         * @type {string}
         * @readonly
         * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
         *
         * @since 2018.1
         */        
        this.component = undefined;        
        /**
         * Returns the object type name (query.Condition)
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

    return new Condition();
});