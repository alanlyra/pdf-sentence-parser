const axios = require('axios')

const getSetence = require('./getSentence')

const pdfParser = async (file) => {
    // Constrói a string com todas as sentenças do arquivo, para adicionar todas em uma única chamada ao Elasticsearch
    const bulkString = await getSetence(file)
    const url = 'http://localhost:9200/futures/_bulk'

    // Para usar a API de inserção em massa de arquivos, o content-type precisa ser x-ndjson
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-ndjson' },
        data: bulkString,
        url,
    };

    // Efetivamente chama a API do Elasticsearch via Ajax  
    axios(options).then((response) => {
        console.log(`Sentenças do arquivo ${file.basename} adicionadas com sucesso`)
    }).catch((error) => {
        console.log(error)
    })
    
}

module.exports = pdfParser



