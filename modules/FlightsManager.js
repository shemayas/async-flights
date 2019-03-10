const Flight = require('./Flight');

class FlightsManager
{
    constructor() {
        this._destinations = [];
        this._flightsCount = 0;
    }

    get count() {
        return this._flightsCount;
    }

    set destinations(val) {
        // if destination does not exist add it 
        !this._destinations.includes(val) && this._destinations.push(val);
    }

    get destinations() {
        return this._destinations.join();
    }

    /**
     * Create new flight instance
     * @param {int} data.number 
     * @param {string} data.origin 
     * @param {string} data.destination
     * @returns {Flight} flight instance 
     */
    createFlight(data) {
        this._flightsCount++;
        this.destinations = data.destination;
        return new Flight(data);
    }
}

module.exports = FlightsManager;