const XLSX = require('xlsx')
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile);

const saveResult = async (ticketsPath, frequenciesPath, output, numTopics) => {

    console.log('Salvando resultado...')

    const frequencies = require('./' + frequenciesPath)

    const workbook = XLSX.readFile(ticketsPath)
    let data = new Array()
    
    if(workbook.SheetNames && workbook.SheetNames.length > 0) {
    
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const json = XLSX.utils.sheet_to_json(sheet)
    
        for(let index = 0; index < json.length; index++) {
            const ticket = json[index]

            let freq = frequencies[index]
            if(freq) {
                
                const freqIndexes = Object.keys(freq.freq)
                const parsedFreq = freqIndexes.map(fi => freq.freq[fi])

                ticket['Texto limpo'] = freq.doc
                parsedFreq.forEach((f, i) => {
                    ticket[`freq_${i}`] = f
                })
            }

            data.push(ticket) 
        }

        const header = [
            "__EMPTY", 
            "Numero_Chamado", 
            "Data_abertura", 
            "Data_fechamento", 
            "Status", 
            "Usuario que registrou", 
            "Usuario solicitante", 
            "Descrição do Chamado", 
            "Descricao_solucao", 
            "Categoria", 
            "Grupo solucionador", 
            "Analista Resolvedor", 
            "Canal de abertura", 
            "Cleaned", 
            "Texto limpo"
        ]
        
        for(let i = 0; i < numTopics; i++) {
            header.push(`freq_${i}`)
        }
    
        const sh = XLSX.utils.json_to_sheet(data, { header })
        const wb = XLSX.utils.book_new()
        wb.SheetNames.push('data')
        wb.Sheets['data'] = sh
        XLSX.writeFile(wb, output)

    }

}

module.exports = saveResult