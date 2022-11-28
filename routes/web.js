const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const verifyUser = require('../middlewares/verify')

// pages
router.get('/', verifyUser.isLogin,  (req, res) => {
    res.render('./pages/dashboard')
})
router.get('/importdataset', (req, res) => {
    res.render('./pages/ImportDataset')
})
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

module.exports = router