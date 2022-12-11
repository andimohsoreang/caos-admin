const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const uploadController = require("../controllers/upload.controller");
const adminController = require("../controllers/admin.controller");
const articleController = require("../controllers/article.controller");
const puskesmasController = require("../controllers/puskesmas.controller");
const posyanduController = require("../controllers/posyandu.controller");

const masterController = require("../controllers/master.controller");
const verifyUser = require("../middlewares/verify");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const userMiddleware = require("../middlewares/user.middleware");

// -pages
router.get("/insertarticle", articleController.article);
router.get("/getarticle", articleController.getarticle);
router.get("/puskesmas", puskesmasController.getPuskesmas);
router.get("/posyandu", posyanduController.getPosyandu);

// --auth
router.get("/login", verifyUser.loggedIn, authController.loginPage);
router.get("/register", verifyUser.loggedIn, authController.registerPage);
// --admin
router.get("/", verifyUser.isLogin, adminController.dashboard);
// ---master
router.get("/users", masterController.users);
router.get("/categories", masterController.categories);
// ---algorithm
router.get("/importdataset", adminController.importdataset);
router.get("/dataprocessing", adminController.dataprocessing);
router.get("/performance", adminController.performance);
router.get("/dataprediction", adminController.dataprediction);
router.get("/resultprediction", adminController.resultprediction);

// process
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/logout", authController.logout);
router.post("/uploaddataset", multipartMiddleware, uploadController.dataset);
router.post("/processperformance", adminController.processperformance);
router.post("/processprediction", adminController.processprediction);
router.post(
  "/insertarticle",
  userMiddleware.validateImages,
  articleController.insertarticle
);

router.post("/category/store", masterController.storecategory);
router.post("/categories/update/:uuid", masterController.updateCategory);
router.get("/categories/delete/:uuid", masterController.deleteCategory);

router.post("/users/store", masterController.storeUsers);
router.post("/users/update/:uuid", masterController.updateUser);
router.get("/users/editstatus/:uuid", masterController.editStatusUser);
router.get("/users/delete/:uuid", masterController.deleteUser);

router.post("/puskesmas/store", puskesmasController.storePuskesmas);
router.post("/puskesmas/update/:uuid", puskesmasController.updatePuskesmas);
router.get("/puskesmas/delete/:uuid", puskesmasController.deletePuskesmas);

router.post("/posyandu/store", posyanduController.storePosyandu);
router.post("/posyandu/update/:uuid", posyanduController.updatePosyandu);
router.get("/posyandu/delete/:uuid", posyanduController.deletePosyandu);

router.get("/getarticle/delete/:uuid", articleController.deleteArticle);
router.get("/getarticle/:slug", articleController.getDetailArticle);

module.exports = router;
