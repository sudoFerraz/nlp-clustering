const XLSX = require('xlsx')
const fs = require('fs')

const process = async (input, output) => {

    console.log('Extraindo textos...')

    const workbook = XLSX.readFile(input)
    let data = ''
    
    if(workbook.SheetNames && workbook.SheetNames.length > 0) {
    
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const json = XLSX.utils.sheet_to_json(sheet)
    
        for(let index = 0; index < json.length; index++) {
            const ticket = json[index]
            const description = ticket['Cleaned']
            data += description
            data += '\n'
        }
    
        fs.writeFileSync(output, data)
    
    }
    
}

module.exports = process
