var csv = require('csv'),
    fs = require('fs')
   
var refine = require('../lib')

fs.createReadStream('../data/colorado5.csv')
    .pipe(csv.parse())
    .pipe(refine.skipfirst())
    .pipe(refine.head(2))
    .pipe(refine.print())
