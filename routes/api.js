const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller.js')
const userMiddleware = require('../middlewares/user.middleware.js')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

router.post('/user/store', [jsonParser, userMiddleware.validateUserStore], userController.userStore)

module.exports = router

