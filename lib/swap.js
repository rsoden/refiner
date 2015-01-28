var through2 = require('through2')

module.exports = function(srcColumnId, destColumnId) {
   
    return new through2.obj(function(row, enc, callback) {
        var p = row[srcColumnId]
        var q = row[destColumnId]
        //console.log(q)
        //console.log(p)
        row[srcColumnId] = q
        row[destColumnId] = p
        this.push(row)
        callback()
    })
}