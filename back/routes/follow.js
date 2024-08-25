const express = require("express");
const router = express.Router();
const followController = require("../controller/follow");
const check =require("../middleware/auth");
///route define
router.get("/prueba-follow",followController.pruebaFollow);
router.post("/save",check.auth,followController.save);
//Exportar router
module.exports=router;