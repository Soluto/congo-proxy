var Promise = require('bluebird');

export default function (service, invoker) {
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
            service: service,
            method: method,
            args: args
        };
    }
};
