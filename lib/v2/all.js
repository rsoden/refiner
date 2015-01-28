var through2 = require('through2')

module.exports = function(transform) {
    return new through2.obj(function(row, enc, callback) {
        row = row.map(function(v) {
            return transform(v)
        })
        callback(null, row)
    })
}