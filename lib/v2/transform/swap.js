module.exports = function() {

    return function(cell1,cell2) {
    	a = cell1
    	b = cell2

    	cell1 = b
    	cell2 = a
        return (cell1, cell2)
    }
}