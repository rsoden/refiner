var through2 = require('through2')

// print each row to console, if a columnId is given, print only that column
module.exports = function() {
    return new through2.obj(function(row, enc, callback) {            	
        callback('not yet implemented')
    })
}