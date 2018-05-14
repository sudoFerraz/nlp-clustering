const fs = require('fs')
const PythonShell = require('python-shell');
const util = require('util')

const cleaner = async (file) => {

    console.log('Limpando arquivo...')
    const options = {
        args: [ file ]
    }

    const run = util.promisify(PythonShell.run)
    await run('engine.py', options)

}

module.exports = cleaner