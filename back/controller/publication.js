const pruebaPublication =(req,res)=>{
    return res.status(200).send({
        message:"mensaje de prueba enviado desde: controller/publication.js"
    });
}

///export actions
module.exports={
    pruebaPublication
}