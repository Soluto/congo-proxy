# Congo Proxy
Congo Proxy enables you to easily create proxies use that use [Congo](https://github.com/Soluto/congo-core)
The proxy uses the invoker to execute a remote call that will received by the listener on the other end, then responses are retured by the responder. For more info see: [Congo Core Explanied](https://github.com/Soluto/congo-core/blob/master/congo-core-java/README.md)

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
var invoker = {
    invoke(remoteCall): Observable
}
```
and is responsible for trasport the remote call over the communication layer. 
see [congo-examples](https://github.com/Soluto/congo-examples) for more info.

Once the proxy is created use it as you would use any Promise (for methods) or Observalbe (for observables)
```javascript
myService.someMethod()
  .then(result => console.log(result));

myService.some().someObservable()
  .doOnNext(result => console.log(result))
  .subscribe();
```
