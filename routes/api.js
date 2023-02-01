const app = require("express");
const router = app.Router();
const { 
  authController, 
  articleController, 
  puskesmasController, 
  posyanduController 
} = require("../controllers/api")
const { authMiddleware } = require("../middlewares/api")

// const growthController = require("../controllers/api/growth.controller.js");
// const puskesmasController = require("../controllers/api/puskesmas.controller.js");
// const posyanduController = require("../controllers/api/posyandu.controller.js");
// const measurementController = require("../controllers/api/measurement.controller.js");
// const articleController = require("../controllers/api/article.controller.js");
// const toddlersController = require("../controllers/api/toddlers.controller.js");
// const measurementsController = require("../controllers/api/measurements.controller.js");

// const authController = require("../controllers/api/auth.controller.js");
// const authMiddleware = require("../middlewares/api/auth.middleware.js");

// router.post('/user/store', userMiddleware.validateUserStore, userController.userStore)

router.post("/login", authController.login)
router.post("/register", authMiddleware.validateRegister, authController.register)

router.get('/me', authMiddleware.isLoggedIn, authController.me)

router.get("/article", articleController.getAllArticle);
router.get("/article/:uuid", articleController.getSpesificArticle);

router.get("/puskesmas", puskesmasController.getAllPuskesmas);
router.get("/puskesmas/:uuid", puskesmasController.getSpesificPuskesmas);

router.get("/posyandu", posyanduController.getAllPosyandu);
router.get("/posyandu/:uuid", posyanduController.getSpesificPosyandu);

// // Growth
// router.get("/growth/:uuid", growthController.growthDetail);

// // measurement
// router.get("/measurement-report", measurementController.measurementReport);
// router.get("/accumulation-report", measurementController.accumulationReport);
// router.get("/posyandu/:uuid", posyanduController.getSpesificPosyandu);

// // toddlers
// router.get("/toddlers", toddlersController.getAllToddlers);
// router.get("/toddlers/:uuid", toddlersController.getSpesicificToddler);
// router.post("/toddlers/", toddlersController.storeToddler);
// router.put("/toddlers/:uuid", toddlersController.editToddler);

// //measurement
// router.get("/measurement", measurementsController.getAllMeasurements);
// router.get("/measurement/:uuid", measurementsController.getDetailMeasurements);
// router.post("/measurement", measurementsController.storeMeasurement);


module.exports = router;
