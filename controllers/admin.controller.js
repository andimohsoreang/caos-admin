const { existsSync } = require('fs')
const xlsx = require('xlsx')
const datasetConfig = require(`${__dirname}/../config/dataset.json`)
const model = require('../models/index')
const readFileDataset = () => {
    const path = __dirname + '/../public/uploads/' + datasetConfig.fileName
    let data = []
    if(existsSync(path)) {
        const workbook = xlsx.readFile(path)
        const sheet_name_list = workbook.SheetNames
        sheet_name_list.forEach( (y) => {
            const worksheet = workbook.Sheets[y];
            let headers = {};
            for(z in worksheet) {
                if(z[0] === '!') continue;
                
                //parse out the column, row, and value
                let tt = 0;
                for (let i = 0; i < z.length; i++) {
                    if (!isNaN(z[i])) {
                        tt = i;
                        break;
                    }
                };
                const col = z.substring(0,tt);
                const row = parseInt(z.substring(tt));
                const value = worksheet[z].v;
        
                //store header names
                if(row == 1 && value) {
                    headers[col] = value;
                    continue;
                }
        
                if(!data[row]) data[row]={};
                data[row][headers[col]] = value;
            }
            //drop those first two rows which are empty
            data.shift();
            data.shift();
        })
        // console.log(data)
    }
    return data
}
const getUnique = (array) => {
    var uniqueArray = [];
    // Loop through array values
    for(var value of array){
        if(uniqueArray.indexOf(value) === -1){
            uniqueArray.push(value);
        }
    }
    return uniqueArray;
}

module.exports = {
    dashboard: (req, res) => {
        res.render('./pages/dashboard')
    },
    dataprocessing: (req, res) => {
        const data = readFileDataset()
        res.render('./pages/dataProcessing', { data })
    },
    performance: async (req, res) => {
        const datasetData = await model.Dataset.findOne({ where: { id: 1 } })
        const dataTrainingRange = datasetData.dataTrainingRange
        console.log(dataTrainingRange)
        res.render('./pages/performance', { dataTrainingRange })
    },
    dataprediction: (req, res) => {
        const data = readFileDataset()
        let select = []
        let selectValue = []
        let selectKey
        let index = 0
        for (let i = 0; i < data.length; i++) {
            for (let key in data[i]) {
                // console.log(`Data ke ${i}, key = ${key}, value = ${data[i][key]}`)
                selectValue.push(data[i][key])
                selectKey = key
                select[index++] = {
                    key: selectKey,
                    value: []
                }
            }
            index = 0
            selectValue = []
            selectKey = null
        }
        const result = select.map(key => {
            return {
                key: key.key,
                value: getUnique(data.map(d => d[key.key])),
            }
        })
        res.render('./pages/dataPrediction', { result })
    },
    importdataset: (req, res) => {
        const data = readFileDataset()
        res.render('./pages/ImportDataset', { data })
    }
}