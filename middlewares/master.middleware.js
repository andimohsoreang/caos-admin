const { url } = require(`${__dirname}/../config/api.json`)
module.exports = {
    getProvKabKec: async (req, res, next) => {
        const { prov, kab, kec } = req.body
        await fetch(`${url}/province/${prov}.json`)
            .then(response => response.json())
            .then(province => req.body.prov = province.name)
        await fetch(`${url}/regency/${kab}.json`)
            .then(response => response.json())
            .then(regency => req.body.kab = regency.name)
        await fetch(`${url}/district/${kec}.json`)
            .then(response => response.json())
            .then(district => req.body.kec = district.name)
        next()
    }
}