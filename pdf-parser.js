const fs = require('fs')
const pdf = require('pdf-parse')
const axios = require('axios')

let dataBuffer = fs.readFileSync('./working2050.pdf');

pdf(dataBuffer).then(({numpages, numrender, info, metadata, version, text}) => {
    const arquivo = {
        numpages, 
        numrender, 
        info, 
        metadata, 
        version
    }

    const paragrafo = text.split((/\./gm))

    paragrafo.forEach( async (sentenca, indice) => {
        arquivo = this.arquivo
        axios.post('http://localhost:9200/futures/_doc', {
            arquivo,
            sentenca
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    })
    
})