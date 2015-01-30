var through2 = require('through2')

module.exports = function(transformFunc) {
    return new through2.obj(function($row, enc, callback) {
        $row.data = $row.data.map(function(v) {        	
            return transformFunc(v)
        })
        
        callback(null, $row)
    })
}