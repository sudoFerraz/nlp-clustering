const AWS = require('aws-sdk')
const fs = require('fs')
const util = require('util')

process.env.AWS_ACCESS_KEY_ID = 'AKIAIX2HQ327QDAANUUQ'
process.env.AWS_SECRET_ACCESS_KEY = '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'
const s3 = new AWS.S3()
const upload = util.promisify(s3.upload).bind(s3)

const bucket = 'giraffaalgar'

const uploadTickets = async (path) => {

    console.log('Fazendo upload dos chamados para a S3...')

    const stream = fs.createReadStream(path)
    await upload({
        Bucket: bucket,
        Key: path,
        Body: stream,
        ACL: 'public-read'
    })

    return 'https://s3-sa-east-1.amazonaws.com/giraffaalgar/' + path

}

module.exports = uploadTickets