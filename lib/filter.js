var through2 = require('through2')

// pass rows matching the given pattern downstrem at the given column
//
module.exports = function(columnId, pattern) {
   
    return new through2.obj(function(row, enc, callback) {
    	
        if ( row[columnId].match(pattern) ) {
        	this.push(row)
        }

        callback()
    })
}