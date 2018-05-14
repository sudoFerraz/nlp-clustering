const Algorithmia = require('algorithmia')
const key = 'simoJ3vQRkEb+TLGg+pPoWRIKe/1'

const makeTopics = async (input, numTopics, numWords) => {
    
    console.log('Gerando tópicos...')

    input = 'https://s3-sa-east-1.amazonaws.com/giraffaalgar/tickets.txt'

    const opts = {
        'docsFile': input,
        'customSettings': {
            'numTopics': numTopics,
            'numWords': numWords,
            'mode': 'quality'
        },
        'stopWordList': [] 
    }
    
    const response = await Algorithmia.client(key).algo("nlp/LDA/1.0.0").pipe(opts)

    return response.get()

}

module.exports = makeTopics