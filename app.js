class myEventEmitter {
    constructor() {
        this.map = new Map();
        this._maxListeners = 10;
        this._eventsCount = 0;
        this._listenersCount = 0;
    }

    setMaxListeners(n) {
        this._maxListeners = n;
    }

    getMaxListeners() {
        return this._maxListeners;
    }

    on(eventName, listener) {
        let isFunction = typeof listener === 'function';
        
        if(this._listenersCount < this._maxListeners) {
            if(isFunction) {
                if(this.map.has(eventName)) {
                    let listenersObj = this.map.get(eventName);
                    listenersObj.push({listener: listener});
                    //this._listenersCount++;
                } else {
                    this.map.set(eventName, [{listener: listener}]);
                    //this._listenersCount++;
                }
            } else {
                console.log('listener is not a function');
                return false;
            }
        } else {
            console.log('can\'t add listener');
            return false;
        }
    }

    addListener(eventName, listener) {
        let isFunction = typeof listener === 'function';
        
        if(this._listenersCount < this._maxListeners) {
            if(isFunction) {
                if(this.map.has(eventName)) {
                    let listenersObj = this.map.get(eventName);
                    listenersObj.push({listener: listener});
                    //this._listenersCount++;
                } else {
                    this.map.set(eventName, [{listener: listener}]);
                    //this._listenersCount++;
                }
            } else {
                console.log('listener is not a function');
                return false;
            }
        } else {
            console.log('can\'t add listener');
            return false;
        }
    }

    once(eventName, listener) {
        let isFunction = typeof listener === 'function';
        
        if(this._listenersCount < this._maxListeners) {
            if(isFunction) {
                if(this.map.has(eventName)) {
                    let listenersObj = this.map.get(eventName);
                    listenersObj.push({listener: listener, callOnce: true});
                    //this._listenersCount++;
                } else {
                    this.map.set(eventName, [{listener: listener, callOnce: true}]);
                    //this._listenersCount++;
                }
            } else {
                console.log('listener is not a function');
                return false;
            }
        } else {
            console.log('can\'t add listener');
            return false;
        }
       
    }

    emit(eventName) {
        let listenersArr = this.map.get(eventName);
        if (listenersArr) {
            
            listenersArr.forEach((listener, i) => {
                listener.listener();
            });
            
            listenersArr = listenersArr.filter(listenerObj => !listenerObj.hasOwnProperty('callOnce'));
            console.log('listenersArr', listenersArr);
            this.map.delete(eventName);

            listenersArr.forEach(listener => {
                if(this.map.has(eventName)) {
                    let listenersObj = this.map.get(eventName);
                    listenersObj.push({listener: listener.listener});
                    //this._listenersCount++;
                } else {
                    this.map.set(eventName, [{listener: listener.listener}]);
                    //this._listenersCount++;
                }
            })

            return true;
        } else {
            console.log(`${eventName} does not exist`);
            return false;
        }
        
    }
}
//------------------------------------------------------

let emitter = new myEventEmitter();
emitter.on('read', () => console.log('read1'));
emitter.on('read', () => console.log('read2'));
emitter.on('call', () => console.log('call'));

emitter.on('sleep', () => console.log('sleep1'));
emitter.once('sleep', () => console.log('sleepOnce1'));
emitter.on('sleep', () => console.log('sleep2'));
emitter.once('sleep', () => console.log('sleepOnce2'));

emitter.emit('sleep');
console.log(emitter.map.get('sleep'));

emitter.emit('sleep');
console.log(emitter.map.get('sleep'));