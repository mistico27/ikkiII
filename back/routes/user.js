const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
const auth=require("../middleware/auth");

///route define
router.get("/prueba-usuario",auth.auth,UserController.pruebaUser);
router.post("/register",UserController.register);
router.post("/login",UserController.login);

//Exportar router
module.exports=router;