const express = require("express");
const router = express.Router();
const followController = require("../controller/follow");
const check =require("../middleware/auth");
///route define
router.get("/prueba-follow",followController.pruebaFollow);
router.post("/save",check.auth,followController.save);
router.delete("/unfollow/:id",check.auth,followController.UnFollowed);
router.get("/following/:id?/:page?",check.auth,followController.following);
router.get("/followers/:id?",check.auth,followController.followers);

//Exportar router
module.exports=router;