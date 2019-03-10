const fs = require('fs'),
      Promise = require('bluebird'),
      readFile = Promise.promisify(fs.readFile),
      FlightsManager = require('./modules/FlightsManager'),
      EventEmitter = require('events'),
      colors = require('colors');

const event = new EventEmitter();
(async () => {
    // load json file
    const { flights } = JSON.parse(await readFile('./flights.json', "utf8"));
    let flightManager = new FlightsManager(),
        departures = [];
    
    // iterate on all the objects and in each itaration:
    flights.forEach(flightData => {
        // 1. Create  a Flight instance using a method of FlightsManager
        flightObj = flightManager.createFlight(flightData);
                
        // 2. listen to an arrival event on each flight instance which will log the flight details
        flightObj._emitter.on('arrived', obj => logFlight(obj));

        // 3. then call the depart method on the flight instance
        departures.push(flightObj.departe());

        // 4. internally, each flight instance will have a random delay triggered on the depart method, when the delay is over - the timer will call the arrive method
        // 5. the arrive method will emit an  event that will be caught at app.js and will log the flight details.
        // 6. After the loop creating the flight instances you will also need to log how many flights were created and to which unique destinations using the FlightsManager properties.    
    });
    await Promise.all(departures);
    console.log(`There are ${flightManager.count} flights to this destinations: ${flightManager.destinations}`.bgMagenta);
    
})();

const logFlight = ({origin, destination, number, departed, arrived}) => {
    console.log(
        `Flight details: From ${origin} to ${destination}, flight number ${number}, departed ${formatDate(departed)} arrived: ${formatDate(arrived)}`.random
    );
    
}

const formatDate = timestamp => {return new Date(timestamp).toISOString().slice(-13, -5)};