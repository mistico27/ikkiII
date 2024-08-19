const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");

///route define
router.get("/prueba-usuario",UserController.pruebaUser);
router.post("/register",UserController.register);

//Exportar router
module.exports=router;