var request = require('request')
var through2 = require('through2')

module.exports = function(columnId) {   
    return new through2.obj(function(row, enc, callback) {
    	var url = 'http://api.zippopotam.us/us/' + row[columnId]
    	 request(url, function(error, response, body) {
            if (!error) {
				var result = JSON.parse(body)
	            if (result.places) {
	            	row[columnId] = result.places[0]["place name"]
	            }
	            else {
	                console.log(error)
	        }}
	        callback(null, row)
        })

    })
}