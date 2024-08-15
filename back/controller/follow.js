const pruebaFollow =(req,res)=>{
    return res.status(200).send({
        message:"mensaje de prueba enviado desde: controller/follow.js"
    });
}

///export actions
module.exports={
    pruebaFollow
}