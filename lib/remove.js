var through2 = require('through2')

//
// remove([2,5])
// 
// pass a row downstream after removing the selected columns (e.g., 2nd, 5th)
//
module.exports = function(columnId) {
   
    return new through2.obj(function(row, enc, callback) {
    	var i = 1
    	results = new Array()

    	// Loop through each item in the row
    	row.forEach(function(item){
    		// if the item is not in one of the columns to be removed, add it to the new array
    		if ( columnId != i ) {
				results.push(item)
			}
			i+= 1
		})
		// replace the row with the new array that has the columns removed
		row = results
        this.push(row)
        callback()
    })
}