const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=' + latitude + '&lon=' + longitude + '&key=7ac7172d78ba4f00a9ddc213e89f57a3'

    request({
        url,
        json: true
    }, (error, {
        body
    } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {

            callback(undefined, body.data[0].weather.description + " its currently " + body.data[0].temp + " degrees out " + body.data[0].pop + "% chances of rain.")

        }
    })
}

module.exports = forecast