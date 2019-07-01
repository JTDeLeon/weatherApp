const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9uZGVsZW9uODU2IiwiYSI6ImNqeGF2amd6NzAwejIzcW9ldjNheHZwbXMifQ.PTcImnHs_mKKu42dB_CiSQ&limit=1';

    request({
        url,
        json : true
    }, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to geolocation services', undefined);
        } else if(body.features.length === 0){
            callback('Location not found. Try again please.', undefined);
        } else {
            callback(undefined, {
                lattitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;