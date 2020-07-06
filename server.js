'use strict';
require('dotenv').config();

const express = require('express');

//CORS = Cross origin resource sharing 
// to give permision for who can touch my server
const cors = require('cors');

// DOTENV  ( read our enviroment variable)
// after that i should write .env file to put the secret key inside it (api keys)

//if the process.env.PORT true git the port inside the .env , if false will giv || PORT 3000
const PORT = process.env.PORT || 3000;
// git the express methods to app variable
const app = express();

// any one can touch my server app (open to any body)
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).send('it work');
});

// http://localhost:3030/location?data=lynnwood
app.get('/location', (req, res) => {
    const city = req.query.data; // we hold our data inside city variable that it have data after the (/location?data) 
    console.log(city);
    // res.send('you are in the location route');
    const locationData = require('./data/location.json');
    console.log(locationData);
    const locationObjData = new Location(city, locationData);
    res.send(locationObjData);
});

function Location(city, locationData) {
    //     "search_query": "seattle",
    //     "formatted_query": "Seattle, WA, USA",
    //     "latitude": "47.606210",
    //     "longitude": "-122.332071"
    this.search_query = city;
    this.formatted_query = locationData[0].display_name;
    this.latitude = locationData[0].lat;
    this.longitude = locationData[0].lon;
}
//for weather
app.get('/weather', (req, res) => {
    const weatherData = require('./data/weather.json');
    console.log(weatherData);

    let arr = [];
    weatherData.data.forEach((item, idx) => {
        const weatherObjData = new Weather(item);
        // res.send(weatherObjData);
        arr.push(weatherObjData);
        console.log('heloooooo', item);
    });
    res.send(arr);
});

function Weather(weatherData) {
    // [{   "forecast": "Partly cloudy until afternoon.",
    //       "time": "Mon Jan 01 2001"
    //     },
    //     {
    //       "forecast": "Mostly cloudy in the morning.",
    //       "time": "Tue Jan 02 2001"
    //     },... ]
    this.forecast = weatherData.weather.description;
    this.time = new Date(weatherData.valid_date).toDateString();
}

app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.use((error, req, res) => {
    res.status(500).send(error);
});





app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});