const { existsSync } = require('fs')
const xlsx = require('xlsx')
const datasetConfig = require(`${__dirname}/../config/dataset.json`)

module.exports = {
    importdataset: (req, res) => {
        const path = __dirname + '/../public/uploads/' + datasetConfig.fileName
        let data = []
        if(existsSync(path)) {
            const workbook = xlsx.readFile(path)
            console.log(workbook)
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
        }
        res.render('./pages/ImportDataset', { data : data })
    }
}