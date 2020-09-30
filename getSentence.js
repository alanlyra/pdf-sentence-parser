const fs = require('fs')
const pdf = require('pdf-parse')
const shortid = require('shortid');

 
const getSetence = async (file) => {

    let dataBuffer = fs.readFileSync(`./${file.filepath}`);

    try {
        const {numpages, numrender, info, metadata, version, text} = await pdf(dataBuffer)

        const paragrafo = text.split((/\./gm))

        // String utilizada para subir todas as sentenças de uma vez para o elasticsearch
        let bulkString = []
    
        paragrafo.forEach( (sentence, indice) => {
            if(sentence.trim() != ""){
                const doc = {
                    age: file.relname.split('/')[0], // Pega o ano pela pasta em que o arquivo estava 
                    numpages, 
                    numrender, 
                    info, 
                    'creator': metadata._metadata['dc:creator'],
                    'title': metadata._metadata['dc:title'],
                    version,
                    'sentence': sentence.trim()
                }

                // Montando string para subir todos os arquivos de uma vez em uma única consulta
                bulkString += 
`{"index":{"_id":"${shortid.generate()}"}}
${JSON.stringify(doc)}
`    
            }
                    
        })
        
        return bulkString

    } catch (error) {
        console.log(error)
    }
    
}

module.exports = getSetence