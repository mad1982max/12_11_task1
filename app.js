class myEventEmitter {
    constructor() {
        this.map = new Map();
        this._maxListeners = 5;
    }

    setMaxListeners(n) {
        this._maxListeners = n;
    }

    getMaxListeners() {
        return this._maxListeners;
    }

    on(eventName, listener) {
        let isFunction = typeof listener === 'function';

        if(isFunction) {

            if(this.map.has(eventName)) {
                let funcArr = this.map.get(eventName);
                if(funcArr.length < this._maxListeners) {
                    funcArr.push(listener);
                } else {
                    console.log('you can\'t add function');
                }
            } else {
                this.map.set(eventName, [listener]);
            }
        } else {
            console.log('listener is not a function');
        }
    }

    addListener(eventName, listener) {
        let isFunction = typeof listener === 'function';

        if(isFunction) {

            if(this.map.has(eventName)) {
                let funcArr = this.map.get(eventName);
                if(funcArr.length < this._maxListeners) {
                    funcArr.push(listener);
                } else {
                    console.log('you can\'t add function');
                }
            } else {
                this.map.set(eventName, [listener]);
            }
        } else {
            console.log('listener is not a function');
        }
    }

    once(eventName, listener) {
        let isFunction = typeof listener === 'function';
        listener.callOnce = true;

        if(isFunction) {

            if(this.map.has(eventName)) {
                let funcArr = this.map.get(eventName);
                if(funcArr.length < this._maxListeners) {
                    funcArr.push(listener);
                } else {
                    console.log('you can\'t add function');
                }
            } else {
                this.map.set(eventName, [listener]);
            }
        } else {
            console.log('listener is not a function');
        }  
    }

    emit(eventName) {
        let isExist = this.map.has(eventName);
        if(isExist) {
            let funcArr = this.map.get(eventName);
            funcArr.forEach(func => func());
            let newFuncArr = funcArr.filter(func => !func.hasOwnProperty('callOnce'));
            this.map.set(eventName, newFuncArr);
        } else {
            console.log('eventName doesn\'t exist');
            return false;
        }
    }

    removeAllListeners(eventName) {
        let isExist = this.map.has(eventName);
        if(isExist) {
            this.map.delete(eventName);
        } else {
            console.log('eventName doesn\'t exist');
            return false;
        }
    }

    eventNames() {
        let eventNamesArr = [...this.map.keys()];
        console.log('eventNamesArr', eventNamesArr);
        return eventNamesArr;
        
    }

    listenerCount(eventName) {
        let funcArr = this.map.get(eventName);
        console.log('listenerCount', funcArr.length);
        return funcArr.length;
    }

    listeners(eventName) {
        let funcArr = this.map.get(eventName);
        console.log('funcArr', funcArr);
        return funcArr;
    }
}

let emitter = new myEventEmitter();

emitter.setMaxListeners(10);
console.log(emitter);

emitter.on('read', () => console.log('read1'));
emitter.on('read', () => console.log('read2'));
emitter.on('sleep', () => console.log('sleep1'));

emitter.eventNames();
emitter.listenerCount('read');
emitter.listeners('read');


emitter.on('jump', () => {console.log('jump1')});
emitter.once('jump', () => {console.log('once jump')});
// emitter.on('jump', () => {console.log('jump2')});
console.log(emitter);
emitter.emit('jump');

// console.log('jump', emitter.map.get('jump'));

// emitter.emit('jump');
// emitter.on('jump', () => {console.log('jump3')});
// emitter.removeAllListeners('jump');

// console.log('jump', emitter.map.get('jump'));


console.log(emitter);   