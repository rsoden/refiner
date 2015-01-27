var csv = require('csv')
var fs = require('fs')

var refine = require('../lib')

var filePath = '../data/colorado5.csv'

fs.createReadStream(filePath)
    .pipe(csv.parse())
    .pipe(refine.skipfirst())
    .pipe(refine.head(2))
    .pipe(refine.print())
