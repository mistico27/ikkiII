const express = require("express");
const router = express.Router();
const PublicationController = require("../controller/publication");

///route define
router.get("/prueba-publication",PublicationController.pruebaPublication);
//Exportar router
module.exports=router;