const walker = require('folder-walker')

const pdfParser = require('./pdf-parser')

const stream = walker(['./PDFs'])

// Anda por todos os arquivos e pastas e chama o parser caso seja um pdf
stream.on('data', async (file) => {
  if(file.basename.includes('.pdf')){
    await pdfParser(file)
  }
})