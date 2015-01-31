var through2 = require('through2'),
    _ = require('lodash')

module.exports = function(selectedFieldNames, transformFunc) {

    return new through2.obj(function($row, enc, callback) {

        selectedFieldNames.forEach(function(name) {

            var columnId = _.indexOf($row.meta.fields, name)
            $row.data[columnId] = transformFunc($row.data[columnId])

        })

        callback(null, $row)
    })
}