const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const uploadController = require('../controllers/upload.controller')
const adminController = require('../controllers/admin.controller')
const verifyUser = require('../middlewares/verify')
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// pages
router.get('/', verifyUser.isLogin,  (req, res) => {
    res.render('./pages/dashboard')
})
router.get('/importdataset', adminController.importdataset)
router.get('/login', verifyUser.loggedIn, (req, res) => {
    res.render('./pages/login')
})
router.get('/register', verifyUser.loggedIn, (req, res) => {
    res.render('./pages/register')
})

// process
router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)
router.get('/logout', authController.logout)

router.post('/uploaddataset', multipartMiddleware, uploadController.dataset)

module.exports = router