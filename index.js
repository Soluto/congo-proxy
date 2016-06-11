var Promise = require('bluebird');
var uuid = require('node-uuid');

module.exports = function (service, invoker) {
    var proxy = {};

    return {
        registerMethod: function(method) {
            proxy[method] = function(){ return invoker.invoke(createRemoteCall(service, method, arguments)).toPromise(Promise); }
        },
        registerObservable: function(method) {
            proxy[method] = function(){ return invoker.invoke(createRemoteCall(service, method, arguments)); }
        },
        build: function() { return proxy; }
    };

    function createRemoteCall(service, method, args) {
        return {
            correlationId: uuid.v4(),
            service: service,
            method: method,
            args: toList(args)
        };
    }

    function toList(args) {
        return Object.keys(args).map(function(key){return args[key]})
    }
};
