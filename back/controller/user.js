const User = require("../models/user");
const bcrypt = require("bcrypt");

//test actions
const pruebaUser =(req,res)=>{
    return res.status(200).send({
        message:"mensaje de prueba enviado desde: controller/user.js"
    });
}


 const register = async (req,res)=>{
    let params= req.body;
    try{
    const{name,surname,nick,date,email,password,role,image,created_at}=req.body;
   ///hashing password
   const passwordHash =await bcrypt.hash(password,10);
    const userFound =await User.findOne({email});
    const userFoundII =await User.findOne({nick});
     
    if(userFound){
        return res.status(400).json(
        ['The user already exists, user Other email and/or nickname'],
        )
    }
    
    if(userFoundII){
        return res.status(400).json(
        ['The user already exists, user Another nickname'],
        )
    }

    if(params.name && params.email && params.password && params.nick){
        console.log("minimum validation passed");
    }else{
        console.log("validacion incorrecta");
        return res.status(400).json({
            message:"missing Data to complete transaction",
            status:"error"
        });
    }

    const user =new User({
        name,surname,nick,date,email,password:passwordHash,role,image,created_at
    });
   const savedUser = await user.save();
   return res.status(200).json({
    status:"success",
    message:"User added SuccessFully",
    savedUser
});
}catch(error){
    return res.status(400).json({
        message:"user could not be created",
        error:error
    })
}
};



///export actions
module.exports={
    pruebaUser,register
}