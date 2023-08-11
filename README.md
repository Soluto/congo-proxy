## DEPRECATED
This repository is no longer maintained and has been archived. Feel free to browse the code, but please migrate to other solutions.

# Congo Proxy
Congo Proxy enables you to easily create proxies use that use [Congo](https://github.com/Soluto/congo-core).

The proxy uses the invoker to execute a remote call that will be received by the listener on the other end, then responses are retured by the responder. For more info see: [Congo Core Explained](https://github.com/Soluto/congo-core/blob/master/congo-core-java/README.md)

## Insallation
```
npm install congo-proxy --save
```

## Usage
Setup the proxy:
```javascript
var congoProxy = require('congo-proxy');

var proxy = congoProxy("myService", invoker);
proxy.registerMethod("someMethod");
proxy.registerObservable("someObservable");
var myService = proxy.build();
```
The ```invoker``` object should be and object that implements:
```javascript
invoke(remoteCall: RemoteCall): Observable<Object>
```
and is responsible for transporting the remote call over the communication layer. 
see [congo-examples](https://github.com/Soluto/congo-examples) for more info.

Once the proxy is created use it as you would use any Promise (for methods) or Observable (for observables)
```javascript
myService.someMethod()
    .then(result => console.log(result));

myService.someObservable()
    .doOnNext(result => console.log(result))
    .subscribe();
```
