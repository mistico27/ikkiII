const express = require("express");
const router = express.Router();
const followController = require("../controller/follow");

///route define
router.get("/prueba-follow",followController.pruebaFollow);
//Exportar router
module.exports=router;