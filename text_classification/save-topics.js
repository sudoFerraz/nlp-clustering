const fs = require('fs')

const saveTopics = async (topics, path) => {

    console.log('Salvando tópicos...')

    let data = new Array()

    for(let index = 0; index < topics.length; index++) {
        const topic = topics[index]
        data.push(topic)
    }
    
    fs.writeFileSync(path, JSON.stringify(data))
    
}

module.exports = saveTopics