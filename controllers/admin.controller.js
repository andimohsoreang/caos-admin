const { existsSync, writeFile } = require('fs')
const xlsx = require('xlsx')
const datasetConfig = require(`${__dirname}/../config/dataset.json`)
const datasetPath = `${__dirname}/../config/dataset.json`
const model = require('../models/index')
const { splitData } = require('../utils')
const tf = require('@tensorflow/tfjs')
const scikitjs = require('scikitjs')
scikitjs.setBackend(tf)
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
        res.render('./pages/performance', { dataTrainingRange })
    },
    dataprediction: async (req, res) => {
        const dataset = readFileDataset()
        let select = []
        let selectValue = []
        let selectKey
        let index = 0
        for (let i = 0; i < dataset.length; i++) {
            for (let key in dataset[i]) {
                // console.log(`Data ke ${i}, key = ${key}, value = ${data[i][key]}`)
                selectValue.push(dataset[i][key])
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
                value: getUnique(dataset.map(d => d[key.key])),
            }
        })

        const data = await model.DatasetData.findAll({
            attributes: ['name', 'berat_badan', 'tinggi_badan', 'usia', 'label', 'akurasi']
        });

        res.render('./pages/dataPrediction', { result, data })
    },
    datapredictiontest: async (req, res) => {
        const dataset = readFileDataset()
        let select = []
        let selectValue = []
        let selectKey
        let index = 0
        for (let i = 0; i < dataset.length; i++) {
            for (let key in dataset[i]) {
                selectValue.push(dataset[i][key])
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

        const data = await model.DatasetData.findAll({
            attributes: ['name', 'berat_badan', 'tinggi_badan', 'usia', 'label', 'akurasi']
        });

        res.render('./pages/dataPredictionTest', { result })
    },
    predicttest: (req, res) => {
        
    },
    importdataset: (req, res) => {
        const data = readFileDataset()
        res.render('./pages/ImportDataset', { data })
    },
    processperformance: async (req, res) => {
        const split = req.body.performanceRange / 100
        const dataset = readFileDataset()
        // dataset.sort(() => Math.random() - 0.5)
        const n = Math.round(dataset.length * split);
        const train = splitData(dataset.slice(0,n));
        const xTrain = train.attributes
        const yTrain = train.labels
        const test = splitData(dataset.slice(n));
        const xTest = test.attributes
        const yTest = test.labels

        let modelNB = new GaussianNB();
        modelNB.train(xTrain, yTrain);

        const __n__ = xTest.length
        let TP = 0
        let TN = 0
        let FP = 0
        let FN = 0
        var predictions = modelNB.predict(xTest);
        for(let i = 0; i < __n__; i++){
            if(predictions[i] == yTest[i]){
                if(yTest[i] == 0){
                    TP += 1
                }else{
                    TN += 1
                }
            }else{
                if(yTest[i] == 0){
                    FP += 1
                }else{
                    FN += 1
                }
            }
        }
        const akurasi = ((TP + TN) / (TP+FP+FN+TN)) * 100

        // save x, y test and model train
        datasetConfig.xTest = xTest
        datasetConfig.yTest = yTest
        datasetConfig.akurasi = akurasi
        datasetConfig.modelTrain = modelNB.toJSON()
        writeFile(datasetPath, JSON.stringify(datasetConfig), (err) => {
            if (err) {
                console.log('An error has occurred ', err)
            }
        })

        // save new performanceRange
        await model.Dataset.update({ dataTrainingRange: req.body.performanceRange }, { where: { id: 1 } })
            .then(() => {
                req.flash('alert', {hex: '#28ab55', color: 'success', status: 'Success'})
                req.flash('message', `Set Data Training Berhasil!`)
            }).catch((err) => {
                console.log(err)
                req.flash('alert', {hex: '#f3616d', color: 'danger', status: 'Failed'})
                req.flash('message', 'Gagal Set Data Training')
            })
            res.redirect('/performance')
    },
    resultprediction: async (req, res) => {
        const data = await model.DatasetData.findAll({
            attributes: ['name', 'berat_badan', 'tinggi_badan', 'usia', 'label', 'akurasi']
        });
        res.render('./pages/resultPrediction', { data })
    },
    processprediction: async (req, res) => {
        const { name, Berat: BB, Tinggi: TB, Usia: AGE } = req.body
        const { modelTrain, xTest, yTest, akurasi } = datasetConfig
        const modelNB = GaussianNB.load(modelTrain)
        const result = modelNB.predict([[+BB, +TB, +AGE]])[0]
        
        await model.DatasetData.create({ 
            name: name, 
            berat_badan: BB,
            tinggi_badan: TB,
            usia: AGE,
            label: result,
            akurasi: akurasi
        }).then((result) => {
            req.flash('alert', {hex: '#28ab55', color: 'success', status: 'Success'})
            req.flash('message', `Prediksi ${result.name} Berhasil!`)
            res.redirect('/resultprediction')
        }).catch(() => {
            req.flash('alert', {hex: '#f3616d', color: 'danger', status: 'Failed'})
            req.flash('message', 'Prediksi Gagal!')
            res.redirect('/dataprediction')

        })
    },
    training: async (req, res) => {
        const split = req.body.performanceRange / 100
        const dataset = readFileDataset()
        dataset.sort(() => Math.random() - 0.5)
        const n = Math.round(dataset.length * split);
        const train = dataset.slice(0,n);
        const test = dataset.slice(n);

        let attributes = Object.keys(train[0])
        let label = attributes.pop()

        let dt = new DecisionTree(label, attributes);
        dt.train(train);

        // save x, y test and model train
        datasetConfig.test = test
        // datasetConfig.akurasi = akurasi
        datasetConfig.modelTrain = dt.toJSON()
        writeFile(datasetPath, JSON.stringify(datasetConfig), (err) => {
            if (err) {
                console.log('An error has occurred ', err)
            }
        })

        // save new performanceRange
        await model.Dataset.update({ dataTrainingRange: req.body.performanceRange }, { where: { id: 1 } })
            .then(() => {
                req.flash('alert', {hex: '#28ab55', color: 'success', status: 'Success'})
                req.flash('message', `Set Data Training Berhasil!`)
            }).catch((err) => {
                console.log(err)
                req.flash('alert', {hex: '#f3616d', color: 'danger', status: 'Failed'})
                req.flash('message', 'Gagal Set Data Training')
            })
        res.redirect('/performance')
    },
    predict: async (req, res) => {
        const { name, Berat, Tinggi, Usia, JK } = req.body

        const lr = new scikitjs.DecisionTreeClassifier()
        const dataset = readFileDataset()
        const split = 0.2
        const train = splitData(dataset);
        let [xTrain, xTest, yTrain, yTest] = scikitjs.trainTestSplit(train.attributes, train.labels, split)
        
        lr.fit(xTrain, yTrain)
        const result = lr.predict([[+Usia, +Berat, +Tinggi, +JK]])
        const akurasi = lr.score(xTest, yTest)
        
        await model.DatasetData.create({ 
            name: name, 
            berat_badan: Berat,
            tinggi_badan: Tinggi,
            usia: Usia,
            label: result,
            akurasi: akurasi
        }).then((result) => {
            req.flash('alert', {hex: '#28ab55', color: 'success', status: 'Success'})
            req.flash('message', `Prediksi ${result.name} Berhasil!`)
        }).catch((err) => {
            console.log(err)
            req.flash('alert', {hex: '#f3616d', color: 'danger', status: 'Failed'})
            req.flash('message', 'Prediksi Gagal!')
        })
        res.redirect('/dataprediction')
    },
    growth: async (req, res) => {
        const data = await model.Toddler.findAll({
            attributes: ['uuid' ,'name', 'birth', 'puskesmas', 'posyandu']
        });
        res.render('./pages/growth', { data })
    }
}