module.exports = function(srcPattern, destPattern) {

    return function(cell) {
        return cell.replace(RegExp(srcPattern, 'gi'), destPattern)
    }
}
