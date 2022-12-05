const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const uploadController = require('../controllers/upload.controller')
const adminController = require('../controllers/admin.controller')
const articleController = require('../controllers/article.controller')
const masterController = require('../controllers/master.controller')
const verifyUser = require('../middlewares/verify')
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// -pages
// --auth
router.get('/login', verifyUser.loggedIn, authController.loginPage)
router.get('/register', verifyUser.loggedIn, authController.registerPage)
// --admin
router.get('/', verifyUser.isLogin, adminController.dashboard)
// ---master
router.get('/users', masterController.users)
router.get('/categories', masterController.categories)
// ---algorithm
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
router.post('/category/store', masterController.storecategory)

module.exports = router