var through2 = require('through2')

module.exports = function(metadata) {
    return new through2.obj(function($row, enc, callback) {    	
        callback(null, $row.data)
    })
}