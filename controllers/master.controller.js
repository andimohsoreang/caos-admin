const model = require('../models/index')
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
        
    }
}