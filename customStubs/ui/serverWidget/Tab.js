define([], function () {
    /**
     * Return a new instance of sublist object
     *
     * @param {string} id
     * @param {string} label 

     * @return {Tab}
     * @constructor
     *
     * @since 2015.2
     */
     function Tab() {

        /**
         * The label of the Tab
         * @name Tab#label
         * @type {string}
         *
         * @since 2015.2
         */        
        this.label = undefined;        
        /**
         * The Tab's field help
         * @name Tab#helpText
         * @type {string}
         *
         * @since 2015.2
         */        
        this.helpText = undefined;        
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

    return new Tab();
});