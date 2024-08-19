/////dependencies
const jwt =require("jwt-simple");
const moment =require("moment");

const libjwt = require("../services/jwt");
const secret =libjwt.secret;
///Authentication
exports.auth=(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({
            status:"error",
            message:"La peticion no tiene la cabecera de autenticacion"
        });
    }

    ///limpar token
    let token = req.headers.authorization.replace(/['"]+/g,'');
    try{
        let payload = jwt.decode(token,secret);
        //comprobar expiracion
        if(payload.exp<=moment().unix()){
            res.status(401).json({message:"Token expirado"});                 
        }
        req.user=payload;
    }catch(ex){
            res.status(404).json({message:"Token invalido"});
    }
    next();
}
