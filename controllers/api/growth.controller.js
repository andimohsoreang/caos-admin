const model = require('../../models/index')
const anthropometricTable = require('../../public/assets/standar-antropometri.json')

module.exports = {
    growthDetail: async (req, res) => {
        const { id } = await model.Toddler.findOne({
            where: {
                uuid: req.params.uuid
            }
        })
        await model.Measurement.findAll({
            where: {
                id_toddler: id
            },
            raw: true,
            order: [
                ['date', 'ASC']
            ],
            attributes: ['date', 'current_age', 'bb' ,'tb', 'bb', 'rekombbu' ,'rekomtbu', 'rekombbtb']
        }).then((result) => {
            for (const i of result) {
                const obj = anthropometricTable['BBU.L.0-60'].find(e => e['Umur'] == i.current_age)
                i['bbumin3sd'] = obj['-3sd']
                i['bbumin2sd'] = obj['-2sd']
                i['bbumin1sd'] = obj['-1sd']
                i['bbuplus1sd'] = obj['+1sd']
                i['bbuplus2sd'] = obj['+2sd']
                i['bbuplus3sd'] = obj['+3sd']
            }
            res.status(200).send({
                status: 'Success',
                message: 'Fetch Data Berhasil',
                data: result 
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).send({
                status: 'failed',
                message: err
            })
        })
    },
}