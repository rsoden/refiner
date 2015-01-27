var through2 = require('through2')

// check if the n-th column is above a threshold, and append the result as a new column
// before passing downstream
//

module.exports = function(columnId, threshold) {
    return new through2.obj(function(row, enc, callback) {
        if (row[columnId] >= threshold) {
            this.push(row)
        }
        callback()
    })
}
