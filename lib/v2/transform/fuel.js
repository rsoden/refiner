var request = require('request')

module.exports = function() {

    return function(cell) {

        var fuel_type = cell

		var url = 'https://data.cityofchicago.org/resource/alternative-fuel-locations.json?fuel_type_code=' + fuel_type
    	console.log(url)
    	request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body)
                var resultslc = result[1]

                if (resultslc.location) {
                    var b = resultslc.location.latitude
                    var a = resultslc.location.longitude
                    console.log(a)
                    console.log(b)
                    cell = a + ',' + b
                }
            }
            else {
                console.log(error)
            }

            return cell

        })    

    }
}