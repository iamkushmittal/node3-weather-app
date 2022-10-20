const request = require('request')

forecast = (longitude,latitude,callback) =>{

    const url = 'https://api.darksky.net/forecast/89ee8d8108704be4c354c2dcabb782e4/'+longitude+','+latitude

    request ({url, json : true}, (error,{body})=>{
        if (error){
            callback('Unable to Connect to Weather Services!',undefined)
        } else if (body.error){
            callback('Unable to find location. Try another Search.',undefined)
        } else{
            callback(undefined,
                body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% chance of Rain.' +
                '\nHighest Temperature of the day is : ' + body.daily.data[0].temperatureHigh + ' degrees.' +'\n    Lowest Temperature of the day is : ' + body.daily.data[0].temperatureLow + ' degrees.'
            )
        }

    })
}

module.exports = forecast