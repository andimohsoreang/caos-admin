const model = require('../models/index')
const apiConfig = require(`${__dirname}/../config/api.json`)
module.exports = {
    users: async (req, res) => {
        const data = await model.User.findAll({
            attributes: ['name', 'email', 'role', 'status']
        })
        res.render('./pages/users', { data })
    },
    categories: async (req, res) => {
        const data = await model.Category.findAll({
            attributes: ['name', 'description']
        })
        res.render('./pages/categories', { data })
    },
    storecategory: async (req, res) => {
        const { name, description } = req.body
        await model.Category.create({
            name, description
        }).then(() => {
            req.flash('alert', {hex: '#28ab55', color: 'success', status: 'Success'})
            req.flash('message', 'Kategori berhasil ditambahkan')
            res.redirect('/categories')
        }).catch(() => {
            req.flash('alert', {hex: '#f3616d', color: 'danger', status: 'Failed'})
            req.flash('message', 'Gagal menambahkan kategori')
            res.redirect('/categories')
        })
    },
    toddlers: async (req, res) => {
        let regencies
        const { url, idProv } = apiConfig
        await fetch(`${url}/regencies/${idProv}.json`)
            .then(response => response.json())
            .then(result => regencies = result)
        const data = await model.Toddler.findAll({
            attributes: ['name', 'birth', 'puskesmas', 'posyandu']
        });
        res.render('./pages/toddlers', { data, regencies, url, idProv })
    },
    storeToddler: async (req, res) => {
        const { nik, name, birth, address, prov, kab, kec, puskesmas, posyandu } = req.body
        console.log(req.body);
        await model.Toddler.create({
            nik, name, birth, address, prov, kab, kec, puskesmas, posyandu
        }).then(() => {
            req.flash('alert', {hex: '#28ab55', color: 'success', status: 'Success'})
            req.flash('message', 'Balita berhasil ditambahkan')
        }).catch((err) => {
            if (err) {
                console.log(err.errors)
            }
            req.flash('alert', {hex: '#f3616d', color: 'danger', status: 'Failed'})
            req.flash('message', 'Gagal menambahkan data')
        })
        res.redirect('/toddlers')
    }
}