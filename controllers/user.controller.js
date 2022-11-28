const bcrypt = require('bcryptjs')
const model = require('../models/index')

module.exports = {
    userStore: async (req, res) => {
        // cek email
        const userData = await model.User.findOne({ where: { email: req.body.email } })
        if (userData === null) {
            // enkripsi password
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).send({
                        status: 'Failed',
                        message: err
                    })
                }
                // buat user baru
                await model.User.create({ 
                    name: req.body.name, 
                    email: req.body.email,
                    password: hash
                }).then((result) => {
                    res.status(200).send({
                        status: 'Success',
                        message: 'Registered!',
                        data: result 
                    })
                }).catch((err) => {
                    console.log(err)
                    res.status(500).send({
                        status: 'failed',
                        message: err
                    })
                })
            })
        } else {
            res.status(409).send({
                status: 'Failed',
                message: 'This email is already in use!'
            })
        }
    }
}