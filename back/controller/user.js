//test actions
const pruebaUser =(req,res)=>{
    return res.status(200).send({
        message:"mensaje de prueba enviado desde: controller/user.js"
    });
}

///export actions
module.exports={
    pruebaUser
}