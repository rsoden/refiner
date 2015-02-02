var request = require('request')

module.exports = function(srcLanguage, destLanguage) {

    return function(cell) {
       var word = cell
       var lang1 = srcLanguage
       var lang2 = destLanguage
       

        var url = 'http://mymemory.translated.net/api/get?q=' + word + '&langpair=' + lang1 + '|' + lang2
        console.log(url)
        request(url, function(error, response, body) 
        {
            if (!error) 
            {             
				var result = JSON.parse(body)
				console.log(result)
                if (result.responseData) 
                {
                    cell = result.responseData.translatedText
                }
            }

            else
            {
                console.log(error)
            }

            console.log(cell)
            return cell
        })
    }
}