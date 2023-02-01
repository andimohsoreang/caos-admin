const bcrypt = require('bcryptjs')
const model = require('../../models/index')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res) => {
    // cek email
    const userData = await model.User.findOne({ where: { email: req.body.email } })
    if (userData != null) {
      return res.status(409).send({
        status: 'Failed',
        message: 'Email sudah digunakan!'
      })
    }
    // enkripsi password
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(400).send({
          status: 'Failed',
          message: 'Gagal membuat akun!',
          err: err
        })
      }
      // buat user baru
      await model.User.create({ 
        name: req.body.name, 
        email: req.body.email,
        password: hash
      })
      .then((result) => {
        return res.status(200).send({
          status: 'Success',
          message: `Akun ${result.name} berhasil dibuat`
        })
      })
      .catch((err) => {
        return res.status(400).send({
          status: 'Failed',
          message: 'Gagal membuat akun!',
          err: err
        })
      })
    })
  },
  login: async (req, res) => {
    // cek email
    await model.User.findOne({ where: { email: req.body.email } })
      .then((userData) => {
        if (userData === null) {
          res.status(409).send({
            status: 'Failed',
            message: 'Email atau Password Salah!'
          })
        } else {
          // cek password
          bcrypt.compare(req.body.password, userData.password, async (err, result) => {
            if (result) {
              const payload = {
                uuid: userData.uuid,
                email: userData.email
              }
              const secret = 'SECRETKEY'
              const options = {
                  expiresIn: '7d'
              }
              const token = jwt.sign(payload, secret, options)
              return res.status(200).send({
                status: 'Success',
                message: 'Logged in!',
                jwt: {
                  token: token,
                  expires_in: '7d',
                  payload
                },
                user: {
                    uuid: userData.uuid,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role,
                    status: userData.status
                }
              })
            }
            res.status(400).send({
              status: 'Failed',
              message: 'Email atau Password Salah!'
            })
          })
        }
      })
      .catch((err) => {
        res.status(400).send({
          status: 'Failed',
          message: err
        })
      })
  },
  me: (req, res) => {
    res.status(200).send({
      status: 'Success',
      message: 'This is your profile page. Only logged in users can see that!',
      user: req.userdata
    })
  }
}