const fs = require('fs')
const pdf = require('pdf-parse')
let dataBuffer = fs.readFileSync('./working2050.pdf');

const getSetence = async () => {

    try {
        const {numpages, numrender, info, metadata, version, text} = await pdf(dataBuffer)

        const paragrafo = text.split((/\./gm))

        // String utilizada para subir todas as sentenças de uma vez para o elasticsearch
        let bulkString = []
    
        paragrafo.forEach( (sentence, indice) => {
            const doc = {
                age: 2010,
                numpages, 
                numrender, 
                info, 
                'creator': metadata._metadata['dc:creator'],
                'title': metadata._metadata['dc:title'],
                version,
                'setence': sentence.trim()
            }
            bulkString += 
`{"index":{"_id":${indice}}}
${JSON.stringify(doc)}
`           
        })
        
        return bulkString

    } catch (error) {
        console.log(error)
    }
    
}

module.exports = getSetence