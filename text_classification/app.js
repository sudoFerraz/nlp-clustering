const cleaner = require('./cleaner')
const processTickets = require('./process-tickets')
const makeTopics = require('./make-topics')
const uploadTickets = require('./upload-tickets')
const saveTopics = require('./save-topics')
const cluster = require('./cluster')
const saveResult = require('./save-result')

const original = 'data.xlsx'
const source = 'cleaned.xlsx'
const ticketsFile = 'tickets.txt'
const frequencies = 'frequencies.json'
const finalResult = 'results.xlsx'
const numTopics = 200
const numWords = 5

const main = async () => {

    await cleaner(original)
    await processTickets(source, ticketsFile)
    const ticketsUrl = await uploadTickets(ticketsFile)
    const topics = await makeTopics(ticketsUrl, numTopics, numWords)
    await saveTopics(topics, 'topics.json')
    await cluster(ticketsFile, topics, frequencies)
    await saveResult(source, frequencies, finalResult, numTopics)

}

main()
