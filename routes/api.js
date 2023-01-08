const express = require("express");
const router = express.Router();
const growthController = require("../controllers/api/growth.controller.js");
const puskesmasController = require("../controllers/api/puskesmas.controller.js");
const posyanduController = require("../controllers/api/posyandu.controller.js");
const measurementController = require("../controllers/api/measurement.controller.js");
const articleController = require("../controllers/api/article.controller.js");
const toddlersController = require("../controllers/api/toddlers.controller.js");
const measurementsController = require("../controllers/api/measurements.controller.js");

// router.post('/user/store', userMiddleware.validateUserStore, userController.userStore)
// Growth
router.get("/growth/:uuid", growthController.growthDetail);

//puskesmas
router.get("/puskesmas", puskesmasController.getAllPuskesmas);
router.get("/puskesmas/:uuid", puskesmasController.getSpesificPuskesmas);

//posyandu
router.get("/posyandu", posyanduController.getAllPosyandu);

// measurement
router.get("/measurement-report", measurementController.measurementReport);
router.get("/accumulation-report", measurementController.accumulationReport);
router.get("/posyandu/:uuid", posyanduController.getSpesificPosyandu);

//article
router.get("/article", articleController.getAllArticle);
router.get("/article/:uuid", articleController.getSpesificArticle);

// toddlers
router.get("/toddlers", toddlersController.getAllToddlers);
router.get("/toddlers/:uuid", toddlersController.getSpesicificToddler);
router.post("/toddlers/", toddlersController.storeToddler);
router.put("/toddlers/:uuid", toddlersController.editToddler);

//measurement
router.get("/measurement", measurementsController.getAllMeasurements);
router.get("/measurement/:uuid", measurementsController.getDetailMeasurements);
router.post("/measurement", measurementsController.storeMeasurement);

module.exports = router;
