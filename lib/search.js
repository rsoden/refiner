var through2 = require('through2')
var google = require('google')

//
// take the value in the column as a search string
// search google
// replace the string by the url of the first result
//

module.exports = function(columnId) {
    return new through2.obj(function(row, enc, callback) {
        var query = row[columnId]
        google(query, function(err, next, links){
            if (err) {
                console.error(err)
            } else {
                // console.log(links[0].title + ' - ' + links[0].link)
                row[columnId] = links[0].link
            }
            callback(err, row)
        })
    })
}
