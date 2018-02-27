'use strict'
var api = require('../../server/utils/api')
var app = require('../../server/server')

module.exports = function (Weather) {

var weatherUrl = 'https://58789b1a-f8a2-440e-a102-ad978c4bab5f:mE6ca5BB8W@twcservice.mybluemix.net/api/weather/v1/location/'


  Weather.getCurrent = async function (req, res, cb){
    let zip = req.body.zip
    console.log(zip)
    try {
      let weatherResultsRaw = await api.genericRequestRawPromise({
        url: weatherUrl + zip +':4:US/observations.json',
        method: 'GET',
        qs: {
          units: 'e',
          language: 'en-US'
        }
      })
      let results = JSON.parse(weatherResultsRaw)
      console.log("Got current weather for zip")
      return results
    } catch (e) {
      console.log(e)
      throw (e)
    }
  }

  Weather.getForecast = async function (req, res, cb){
    let zip = req.body.zip
    console.log(zip)
    try {
      let weatherResultsRaw = await api.genericRequestRawPromise({
        url: weatherUrl + zip +':4:US/forecast/hourly/48hour.json',
        method: 'GET',
        qs: {
          units: 'e',
          language: 'en-US'
        }
      })
      let results = JSON.parse(weatherResultsRaw)
      console.log("Got current weather for zip")
      return results
    } catch (e) {
      console.log(e)
      throw (e)
    }
  }

}
