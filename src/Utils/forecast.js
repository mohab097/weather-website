const request= require('request')

const forecast= (longitude,latitude,callback) =>
{
      const url='http://api.weatherstack.com/current?access_key=2b6df419075e21ebc77eb40294df63fc&query='+longitude+','+latitude

      request({url,json: true},(error,{body}={})=>{
          if(error)
          {
                callback('Unable to connect!',undefined)
          }
          else if(body.error)
          {
                callback('Unable to find location',undefined)
          }
          else
          {
                callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out. Wind speed is '+body.current.wind_speed)
          }
      })

}

module.exports=forecast