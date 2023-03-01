const model = require('../../models/index')
const anthropometricTable = require('../../public/assets/standar-antropometri.json')

module.exports = {
    growthDetail: async (req, res) => {
        try {
            const { id, jk } = await model.Toddler.findOne({
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
                    // bbu
                    const objbbu = anthropometricTable[`BBU.${jk}.0-60`].find(e => e['Umur'] == i.current_age)
                    i['bbumin3sd'] = objbbu['-3sd']
                    i['bbumin2sd'] = objbbu['-2sd']
                    i['bbumin1sd'] = objbbu['-1sd']
                    i['bbuplus1sd'] = objbbu['+1sd']
                    i['bbuplus2sd'] = objbbu['+2sd']
                    i['bbuplus3sd'] = objbbu['+3sd']
                    // tbu
                    let objtbu
                    if(i.current_age < '24') {
                        objtbu = anthropometricTable[`PBU.${jk}.0-24`].find(e => e['Umur'] == i.current_age)
                    } else {
                        objtbu = anthropometricTable[`TBU.${jk}.24-60`].find(e => e['Umur'] == i.current_age)
                    }
                    i['tbumin3sd'] = objtbu['-3sd']
                    i['tbumin2sd'] = objtbu['-2sd']
                    i['tbumin1sd'] = objtbu['-1sd']
                    i['tbuplus1sd'] = objtbu['+1sd']
                    i['tbuplus2sd'] = objtbu['+2sd']
                    i['tbuplus3sd'] = objtbu['+3sd']
                    // bbtb
                    let objbbtb
                    if(i.current_age < '24') {
                        objbbtb = anthropometricTable[`BBPB.${jk}.0-24`].find(e => e['Panjang Badan'] == i.tb)
                    } else {
                        objbbtb = anthropometricTable[`BBTB.${jk}.24-60`].find(e => e['Tinggi Badan'] == i.tb)
                    }
                    i['bbtbmin3sd'] = objbbtb['-3sd']
                    i['bbtbmin2sd'] = objbbtb['-2sd']
                    i['bbtbmin1sd'] = objbbtb['-1sd']
                    i['bbtbplus1sd'] = objbbtb['+1sd']
                    i['bbtbplus2sd'] = objbbtb['+2sd']
                    i['bbtbplus3sd'] = objbbtb['+3sd']
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
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status: 'failed',
                message: error
            })
        }
    },
}