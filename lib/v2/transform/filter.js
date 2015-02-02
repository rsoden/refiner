module.exports = function(pattern) {

    return function(cell) {
        if ( cell.match(pattern) ) {
        	return cell
        }
    }
}