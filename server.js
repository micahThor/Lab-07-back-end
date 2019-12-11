'use strict';
const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
app.use(cors());


function Geolocation(latitude, longitude, formatted_address, search_query) {
  this.latitude = latitude,
  this.longitude = longitude,
  this.formatted_query = formatted_address,
  this.search_query = search_query
}

function Forcast(forecast, time) {
  this.forecast = forecast,
  this.time = new Date(time * 1000).toDateString();
}

app.get('/location', (request, response) => {
  const newData = [];
  const geoData = require('./data/geo.json');
  const geoDataResult = geoData.results[0];
  const geoDataGeometry = geoDataResult.geometry;
  const geoDataLocation = geoDataGeometry.location;

  newData.push(new Geolocation(geoDataLocation.lat, geoDataLocation.lng, geoDataResult.formatted_address, geoDataResult.address_components[0].short_name.toLowerCase()));

  if (request.query.data === newData[0].search_query) {
    response.send(newData[0]);
  } else if (request.query.data !== newData[0].search_query) {
    throw new Error('Sorry, something went wrong');
  }
})

app.get('/weather', (request, response) => {
  const weatherData = require('./data/darksky.json');
  const dailyWeatherData = weatherData.daily;
  const dailyData = dailyWeatherData.data;
  const weatherArr = [];
  dailyData.forEach(val => {
    weatherArr.push(new Forcast(val.summary, val.time));
  })
  if (request.query.data.search_query === newData[0].search_query) {
    response.send(weatherArr);
  } else {
    throw new Error('Sorry, something went wrong');
  }
})

app.listen(PORT, () => {
  console.log(`App is on PORT: ${PORT}`);
})
