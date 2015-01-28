var through2 = require('through2'),
request = require('request')

module.exports = function(columnId, srcLanguage, destLanguage) 
{   
    return new through2.obj(function(row, enc, callback) 
    {
       var word = row[columnId]
       var lang1 = srcLanguage
       var lang2 = destLanguage
       

        var url = 'http://mymemory.translated.net/api/get?q=' + word + '&langpair=' + lang1 + '|' + lang2
        console.log(url)
        request(url, function(error, response, body) 
        {
            if (!error && response.statusCode == 200) 
            {             

                var result = JSON.parse(body)
                //console.log(result)
                if (result.responseData) 
                {
                	console.log(result.responseData.translatedText)
                    row[columnId] = result.responseData.translatedText
                }
            }
            else
            {
                console.log(error)
            }

            // this is equivalent to push(chunk); call()
            callback(null, row)
        })
    })
}