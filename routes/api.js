const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller.js')
const userMiddleware = require('../middlewares/user.middleware.js')

router.post('/user/store', userMiddleware.validateUserStore, userController.userStore)
module.exports = router

