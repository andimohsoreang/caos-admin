const express = require("express");
const router = express.Router();
const growthController = require("../controllers/api/growth.controller.js");
const puskesmasController = require("../controllers/api/puskesmas.controller.js");
const posyanduController = require("../controllers/api/posyandu.controller.js");
const articleController = require("../controllers/api/article.controller.js");

// router.post('/user/store', userMiddleware.validateUserStore, userController.userStore)
// Growth
router.get("/growth/:uuid", growthController.growthDetail);

//puskesmas
router.get("/puskesmas", puskesmasController.getAllPuskesmas);
router.get("/puskesmas/:uuid", puskesmasController.getSpesificPuskesmas);

//posyandu
router.get("/posyandu", posyanduController.getAllPosyandu);
router.get("/posyandu/:uuid", posyanduController.getSpesificPosyandu);

//article
router.get("/article", articleController.getAllArticle);
router.get("/article/:uuid", articleController.getSpesificArticle);

module.exports = router;
