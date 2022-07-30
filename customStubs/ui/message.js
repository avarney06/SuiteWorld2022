/**
 * SuiteScript Message Module (Client Side)
 * Load the message module to display a message at the top of the screen under the menu bar.
 *
 * @module N/ui/message
 * @suiteScriptVersion 2.x
 *
 */
define([], function(){        
    /**
     * @namespace message
     */    
    var message = {};    
        
    /**
     * Creates a message that can be displayed or hidden near the top of the page.
     *
     * @restriction Client SuiteScript only
     * @governance none
     * @param {Object} options The options object.
     * @param {string} options.type The type of message, see message.Type
     * @param {string} [options.title] The title of the message. Defaults to empty string.
     * @param {string} [options.message] The content of the message. Defaults to empty string.
     * @param {number} [options.duration] The amount of time, in milliseconds, to show the message. The default is 0, which shows the message until Message.hide() is called.
     *
     * @return {Message} A message object which can be shown or hidden.
     * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT If options or type are undefined
     *
     * @since 2016.1
     */    
    message.create = function(options) {};    
    
    /**
     * Enum for message types
     * @enum {string}
     * @readonly
     */    
    function messageType() {
        this.CONFIRMATION = 0.0;
        this.INFORMATION = 1.0;
        this.WARNING = 2.0;
        this.ERROR = 3.0;
    }
    
    message.prototype.Type = new messageType();    
        
    /**
     * Return a new instance of Message, used to show/hide messages
     * @class
     * @classdesc Encapsulates the Message object that gets created when calling the create method.
     * @constructor
     * @protected
     *
     * @since 2016.1
     */    
    function Message() {    
        
        /**
         * Shows the message.
         * @restriction Client SuiteScript only
         * @governance none
         * @param {Object} [options] The options object.
         * @param {number} [options.duration] The amount of time, in milliseconds, to show the message. The default is 0, which shows the message until Message.hide() is called.
         * @return {void}
         * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE If options.duration is specified with a non-numerical value.
         *
         * @since 2016.1
         */        
        this.show = function(options) {};        
        
        /**
         * Hides the message
         * @restriction Client SuiteScript only
         * @governance none
         * @return {void}
         *
         * @since 2016.1
         */        
        this.hide = function() {};        
        
        /**
         * Returns the object type name (message.Message)
         * @restriction Client SuiteScript only
         * @governance none
         * @return {string}
         *
         * @since 2016.1
         */        
        this.toString = function() {};        
        
        /**
         * get JSON format of the object
         * @restriction Client SuiteScript only
         * @governance none
         * @return {Object}
         *
         * @since 2016.1
         */        
        this.toJSON = function() {};        
    }    
    
    var ui = {};
N.ui = ui;
    ui.message = message;
    
    /**
     * @exports N/ui/message
     */
    return message;
});