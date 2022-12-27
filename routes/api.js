const express = require("express");
const router = express.Router();
const growthController = require("../controllers/api/growth.controller.js");
const posyanduController = require("../controllers/api/posyandu.controller.js");

// router.post('/user/store', userMiddleware.validateUserStore, userController.userStore)
// Growth
router.get("/growth/:uuid", growthController.growthDetail);

//posyandu
router.get("/posyandu", posyanduController.getAllPosyandu);
module.exports = router;
