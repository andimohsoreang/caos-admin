const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const db = require('../config/db.js')

module.exports = {
    userStore: (req, res) => {
        db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, (err, result) => {
            if (typeof result != 'undefined') {
                // check email
                if (result.length) {
                    return res.status(409).send({
                        status: 'Failed',
                      message: 'This email is already in use!'
                    })
                }
            }
            // encrypt password
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send({
                    status: 'Failed',
                    message: err
                    })
                }
                // insert user
                db.query(`INSERT INTO users (uuid, name, email, password) VALUES ('${uuid.v4()}', '${req.body.name}', '${req.body.email}', '${hash}')`, (err, result) => {
                    if (err) {
                        return res.status(400).send({
                            status: 'Failed',
                            message: err
                        })
                    }
                    return res.status(201).send({
                        status: 'success',
                        message: 'Registered!',
                        data: {
                            uuid: req.body.uuid,
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        }
                    })
                })
            })
        })
    }
}