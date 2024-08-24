const follow =require("../models/follow");
const User = require("../models/user");

const pruebaFollow =(req,res)=>{
    return res.status(200).send({
        message:"mensaje de prueba enviado desde: controller/follow.js"
    });
}

///follow action


///export actions
module.exports={
    pruebaFollow
}