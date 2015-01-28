var through2 = require('through2')

module.exports = function(meta) {
    return new through2.obj(function(row, enc, callback) {
        var $row = {data: row, meta: meta}     
        callback(null, $row)
    })
}