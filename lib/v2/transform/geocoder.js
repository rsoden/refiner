// GeoCoder Settings
var geocoderProvider = 'openstreetmap';
var httpAdapter = 'http';

var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);
var through2 = require('through2')

// Pass addresses to OSM Nominatum GeoCoder, return Lat/Lon Coordinates
module.exports = function(columnId) {

    return function(cell) {
        geocoder.geocode(cell, function(err, res) {
	     	if (!err && res) {
	   			cell = res[0]['latitude'] + ', ' + res[0]['longitude']
	    	}
	    	return cell
		})
    }
}	