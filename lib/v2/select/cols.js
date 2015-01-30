var through2 = require('through2'),
    _ = require('lodash')

module.exports = function(arg, transformFunc) {

    var columnIds
    if (_.isNumber(arg)) {
        columnIds = [arg]
    } else if (_.isArray(arg)) {
        columnIds = arg
    }


    return new through2.obj(function($row, enc, callback) {

        columnIds.forEach(function(columnId) {
                $row.data[columnId] = transformFunc($row.data[columnId])
        })

        callback(null, $row)
    })
}