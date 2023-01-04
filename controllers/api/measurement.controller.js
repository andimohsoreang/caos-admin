const model = require('../../models/index')
const { Op } = require("sequelize")

module.exports = {
    measurementReport: async (req, res) => {
        const startYear = new Date(`01/01/${req.query.yyyy}`)
        // const endYear = new Date(new Date().setFullYear(startYear.getFullYear() + 1));
        const endYear = new Date(`12/30/${req.query.yyyy}`)
        await model.Toddler.findAll({
            attributes: ['nik', 'name', 'birth', 'jk'],
            include: [{
                model: model.Measurement,
                attributes: ['bb', 'tb', 'date', 'lila', 'lika'],
                where: {
                    date: {
                        [Op.between]: [startYear, endYear]
                    }
                }
            }]
        }).then((toddlers) => {
            if(toddlers.length == 0) {
                return res.status(404).send({
                    status: 'Failed',
                    message: 'Data Not Found'
                })
            }
            toddlers = JSON.parse(JSON.stringify(toddlers))
            for (let i = 0; i < toddlers.length; i++) {
                for (let j = 0; j < 12; j++) {
                    const e = toddlers[i].Measurements
                    for (let j = 0; j < 12; j++) {
                        if(!e[j]) {
                            e.push({bb: '-', tb: '-', lila: '-', lika: '-', date: null})
                        }
                    }
                    for (let j = 0; j < e.length; j++) {
                        if(e[j].date != null) {
                            const newIndex = +e[j].date.split('-')[1] - 1
                            if(j != newIndex) {
                                e[newIndex] = e[j]
                                e[j] = {bb: '-', tb: '-', lila: '-', lika: '-', date: null}
                            }
                        }
                    }
                }
            }
            res.status(200).send({
                status: 'Success',
                message: 'Fetch Data Berhasil',
                data: toddlers 
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).send({
                status: 'Failed',
                message: err
            })
        })
    },
    accumulationReport: async (req, res) => {
        const startMonth = new Date(`${req.query.yyyy}-${req.query.mm}-01`)
        const endMonth = new Date(`${req.query.yyyy}-${req.query.mm}-01`)
        endMonth.setDate(endMonth.getDate() + 29);
        await model.Measurement.findAll({
            attributes: ['date', 'bb', 'tb', 'current_age', 'bbu', 'tbu', 'bbtb', 'lila', 'lika'],
            where: {
                date: {
                    [Op.between]: [startMonth, endMonth]
                }
            },
            include: [{
                model: model.Toddler,
                attributes: ['name'],
            }]
        }).then((measures) => {
            if(measures.length == 0) {
                return res.status(404).send({
                    status: 'Failed',
                    message: 'Data Not Found'
                })
            }
            res.status(200).send({
                status: 'Success',
                message: 'Fetch Data Berhasil',
                data: measures 
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).send({
                status: 'Failed',
                message: err
            })
        })
    }
}