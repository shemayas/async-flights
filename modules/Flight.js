const EventEmitter = require('events'),
     rando = require('random-number-in-range'),
     {promisify} = require('util');
setTimeout = promisify(setTimeout);
class Flight
{
    constructor(data) {
        this._emitter = new EventEmitter;
        this.number = data.number;
        this.origin = data.origin;
        this.destination = data.destination;
    }
    
    // _number = 0;
    // _origin = '';
    // _destination = '';
    // departed = '';
    // arrived = '';

    get number() {
        return this._number;
    }

    set number(val) {
        this._number = val;
    }

    get origin() {
        return this._origin;
    }

    set origin(val) {
        this._origin = val;
    }

    get destination() {
        return this._destination;
    }

    set destination(val) {
        this._destination = val;
    }

    departe() {
        this.departed = this._getTimeStamp();
        return setTimeout(rando(1000, 5000)).then(() => this.arrive());
    }

    arrive() {
        this.arrived = this._getTimeStamp();
        this._emitter.emit('arrived', this);
    }

    _getTimeStamp() {
        return Date.now();
    }
        
}

module.exports = Flight;