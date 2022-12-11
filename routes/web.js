const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const uploadController = require('../controllers/upload.controller')
const adminController = require('../controllers/admin.controller')
const masterController = require('../controllers/master.controller')
const verifyUser = require('../middlewares/verify')
const masterMiddleware = require('../middlewares/master.middleware.js')
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// -pages
// --auth
router.get('/login', verifyUser.loggedIn, authController.loginPage)
router.get('/register', verifyUser.loggedIn, authController.registerPage)
// --admin
router.get('/', verifyUser.isLogin, adminController.dashboard)
router.get('/growth', adminController.growth)
// ---master
router.get('/users', masterController.users)
router.get('/toddlers', masterController.toddlers)
router.get('/categories', masterController.categories)
// ---algorithm
router.get('/importdataset', adminController.importdataset)
router.get('/dataprocessing', adminController.dataprocessing)
router.get('/performance', adminController.performance)
router.get('/dataprediction', adminController.dataprediction)
router.get('/resultprediction', adminController.resultprediction)
router.get('/testpredict', adminController.datapredictiontest)

// process
router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)
router.get('/logout', authController.logout)
router.post('/uploaddataset', multipartMiddleware, uploadController.dataset)
router.post('/processperformance', adminController.processperformance)
router.post('/processprediction', adminController.processprediction)

router.post('/training', adminController.training)
router.post('/predict', adminController.predict)
router.post('/predicttest', adminController.predicttest)
router.post('/category/store', masterController.storecategory)
router.post('/toddler/store', masterMiddleware.getProvKabKec, masterController.storeToddler)

module.exports = router