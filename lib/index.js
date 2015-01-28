var refine = {}
module.exports = refine

refine.print = require('./print')
refine.skipfirst = require('./skipfirst')
refine.head = require('./head')
refine.tail = require('./tail')
refine.remove = require('./remove')
refine.copy = require('./copy')
refine.swap = require('./swap')
refine.lowercase = require('./lowercase')
refine.uppercase = require('./uppercase')
refine.replace = require('./replace')
refine.swap = require('./swap')
refine.threshold = require('./threshold')
refine.filter = require('./filter')

// invovle remote apis
refine.zipcode = require('./zipcode')
refine.translate = require('./translate')
refine.sunrise = require('./sunrise')
refine.search = require('./search')
refine.geocoder = require('./geocoder')
refine.fuel = require('./fuel')