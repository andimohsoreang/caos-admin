const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const uploadController = require('../controllers/upload.controller')
const adminController = require('../controllers/admin.controller')
const articleController = require('../controllers/article.controller')
const verifyUser = require('../middlewares/verify')
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// pages
router.get('/login', verifyUser.loggedIn, (req, res) => {
    res.render('./pages/login')
})
router.get('/register', verifyUser.loggedIn, (req, res) => {
    res.render('./pages/register')
})
router.get('/', verifyUser.isLogin, adminController.dashboard)
router.get('/importdataset', adminController.importdataset)
router.get('/dataprocessing', adminController.dataprocessing)
router.get('/performance', adminController.performance)
router.get('/dataprediction', adminController.dataprediction)
router.get('/resultprediction', adminController.resultprediction)
router.get('/article',articleController.article);

// process
router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)
router.get('/logout', authController.logout)
router.post('/uploaddataset', multipartMiddleware, uploadController.dataset)
router.post('/processperformance', adminController.processperformance)
router.post('/processprediction', adminController.processprediction)
router.post('/article',articleController.insertArticle)

module.exports = router