var request = require('request')

module.exports = function() {

    return function(cell) {
    	var url = 'http://api.zippopotam.us/us/' + cell
    	request(url, function(error, response, body) {
        	if (!error) {
				var result = JSON.parse(body)
            	if (result.places) {
            		cell = result.places[0]["place name"]
            	}
            	else {
                	console.log(error)
        		}
        		console.log(cell)
        		return cell
        	}
    	})
    }
}	