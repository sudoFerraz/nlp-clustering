const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile);
const Algorithmia = require('algorithmia')
const key = 'simoJ3vQRkEb+TLGg+pPoWRIKe/1'

const cluster = async (ticketsFile, topics, frequencies) => { 
    
    console.log('Clusterizando...')

    const file = await readFile(ticketsFile, 'utf-8')

    const lines = file.toString().split("\n")

    const chunks = new Array()
    let chunk = new Array()

    lines.forEach((line, index) => {
        chunk.push(line)
        if((((index + 1) % 700) === 0) || (index == lines.length - 1)) {
            chunks.push(chunk)
            chunk = new Array()
        }
    })

    let data = new Array()

    for (let index = 0; index < chunks.length; index++) {
        const chunk = chunks[index]

        const results = await process(chunk, topics)

        for(let x = 0; x < results.length; x++) {
            const result = results[x]
            data.push(result)
        }
    }

    fs.writeFileSync(frequencies, JSON.stringify(data))

}

const process = async (tickets, topics) => {

    const input = {
        'topics': topics,
        'docsList': tickets
    }

    const response = await Algorithmia.client(key).algo("nlp/LDAMapper/0.1.1").pipe(input)

    if(response.error) throw JSON.stringify(response.error)

    return response.result.topic_distribution

}

module.exports = cluster