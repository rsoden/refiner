var through2 = require('through2'),
request = require('request')

//
// take the value in the column as a search string of fuel type
// search data of city of chicago
// replace the string by the url of the first result
//

module.exports = function(columnId) {   
    return new through2.obj(function(row, enc, callback) {
       
        var fuel_type = row[columnId]

		var url = 'https://data.cityofchicago.org/resource/alternative-fuel-locations.json?fuel_type_code=' + fuel_type
    	console.log(url)
    	 request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body)
                var resultslc = result[1]
                //console.log(resultslc.location.latitude)
                //console.log(result[1].location)
                if (resultslc.location) {
                    var a = resultslc.location.latitude
                    var b = resultslc.location.longitude
                    console.log(a)
                    console.log(b)
                    row[columnId] = a + ',' + b
                }
            }
            else{
                console.log(error)
            }

            callback(null, row)

        })
        
    })
}