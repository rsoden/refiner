var through2 = require('through2')

module.exports = function(srcPattern, destPattern) {
    return new through2.obj(function(row, enc, callback) {
        var replaced = row.map(function(v) {
              if (typeof v == 'string' || v instanceof String)
                  return v.replace(srcPattern, destPattern)
              else
                  return v
        })
        this.push(replaced)
        callback()
    })
}
