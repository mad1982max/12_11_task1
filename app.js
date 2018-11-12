const Emitter = require('events');
const emitter = new Emitter();


class myEventEmitter {

    static on(eventName, listener) {
        console.log(`add event: ${eventName}`);
        emitter.on(eventName, listener)
    }

    static emit(eventName) {
        emitter.emit(eventName);
    }

    static once(eventName, listener) {
        console.log(`add single event: ${eventName}`);
        emitter.once(eventName, listener);
    }

    static addListener(eventName, listener) {
        console.log(`add event: ${eventName}`);
        emitter.addListener(eventName, listener);
    }

    static removeAllListeners([eventName]) {
        console.log(`Event: ${eventName} - All listeners was removed`);
        emitter.removeAllListeners([eventName]);        
    }

    static setMaxListeners(n) {
        console.log(`Max listeners are ${n}`);
        emitter.setMaxListeners(n);
    }

    static listenerCount(eventName) {
        return emitter.listenerCount(eventName);
    }

    static listeners(eventName) {
        console.log(`Array of listeners for the event ${eventName}`);
        return emitter.listeners(eventName);
    }

    static getMaxListeners() {
        return emitter.getMaxListeners();
    }

    static eventNames() {
        return emitter.eventNames();
    }

}

myEventEmitter.on('read', () => console.log(`trigger event: read 1`)); //add event: 'read'
myEventEmitter.on('read', () => console.log(`trigger event: read 2`)); //add event: 'read'

console.log(myEventEmitter.listenerCount('read')); //2

console.log(myEventEmitter.eventNames()); // ['read']

myEventEmitter.on('sleep', () => console.log(`trigger event 1: sleep`)); //add event: 'sleep'

myEventEmitter.setMaxListeners(8); //Max listeners are 8

console.log(myEventEmitter.getMaxListeners()); //8

console.log(myEventEmitter.eventNames()); //['read', 'sleep']

myEventEmitter.once('jump', () => console.log(`trigger single event 1: jump`)); //add single event: jump

console.log(myEventEmitter.eventNames()); //[ 'read', 'sleep', 'jump' ]

myEventEmitter.emit('jump'); // trigger single event 1: jump

console.log(myEventEmitter.eventNames()); //[ 'read', 'sleep' ]

myEventEmitter.removeAllListeners(['read']); //Event: read - All listeners was removed

console.log(myEventEmitter.eventNames()); // [sleep]

console.log(myEventEmitter.listeners('sleep')); //[ [Function] ]

