const axios = require('axios')

const getSetence = require('./getSentence')


getSetence().then((bulkString) => {
    const url = 'http://localhost:9200/futures/_bulk'

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-ndjson' },
        data: bulkString,
        url,
      };

    axios(options).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
})


