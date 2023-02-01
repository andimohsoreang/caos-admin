const jwt = require('jsonwebtoken')

module.exports = {
  validateRegister: (req, res, next) => {
    const message = []
    // name min length 3
    if (!req.body.name || req.body.name.length < 3) {
      message.push('Please enter a name with min. 3 chars')
    }
    // email min length 3
    if (!req.body.email || req.body.email.length < 13) {
      message.push('Please enter an email with min. 13 chars')
    }
    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      message.push('Please enter a password with min. 6 chars')
    }
    // password (repeat) does not match
    if (!req.body.password_repeat || req.body.password != req.body.password_repeat) {
      message.push('Both passwords must match')
    }
    if(message.length) {
      return res.status(400).send({
        status: 'Failed',
        message: message
      })
    }
    next()
  },
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'SECRETKEY')
      req.userdata = decoded;
      next()
    } catch (err) {
      return res.status(401).send({
        status: 'Failed',
        message: 'Your session is not valid!'
      })
    }
  },
  checkToken: (req, res, next) => {
    next()
  }
}