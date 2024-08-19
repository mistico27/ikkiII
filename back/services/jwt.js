const jwt = require("jwt-simple");
const moment = require("moment");

const secret = "CLAVE_SECRETA";

const createToken = (User)=>{
    const payload = {
        id:User._id,
        name:User.name,
        nick:User.nick,
        email:User.email,
        surname:User.surname,
        role:User.role,
        imagen:User.imagen,
        iat:moment().unix(),
        exp:moment().add(20,"days").unix()
    };

    return jwt.encode(payload,secret);
}


module.exports={
    createToken
}