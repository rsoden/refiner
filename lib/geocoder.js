// GeoCoder Settings
var geocoderProvider = 'openstreetmap';
var httpAdapter = 'http';

var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);
var through2 = require('through2')

// Pass addresses to OSM Nominatum GeoCoder, return Lat/Lon Coordinates
module.exports = function(columnId) {

    return new through2.obj(function(row, enc, callback) {
        geocoder.geocode(row[columnId], function(err, res) {
	     	if (err) throw (err)
	   		row.push(res[0]['latitude'])
	    	row.push(res[0]['longitude'])

	    	callback(null,row)
		})
    })
}	