const User = require("../models/user");
const bcrypt = require("bcrypt");
const mongoosePagination = require("mongoose-pagination");
const fs = require("fs"); 
///services
const jwt =require("../services/jwt");
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

const login= async (req,res)=>{
    //obtain data req.body
    const {email,password} =req.body;
    if(!req.body.email || !req.body.password){
        return res.status(404).send({
            message:"data is missing to send",
            status:"error"
        });
    }
    //check if user exists
    const userFound =await User.findOne({email});
    if(!userFound){
        return res.status(400).json(
        ['user was not found try again']
        )
    }
    //check password
    const isMatching =await bcrypt.compare(password,userFound.password);
    if(!isMatching){
        return res.status(400).json(["Incorrect Password"],);
    }
    //token
    const token=jwt.createToken(userFound);
    //data user
    return res.status(200).send({
        status:"correct",
        message:"accion de login correct",
        User:{
            id:userFound._id,
            name:userFound.name,
            nick:userFound.nick
        },token
    })
}

const profile = async(req,res)=>{
    //recibir parametro
    try{
    const id= req.params.id;
    //consulta de usuario
    const userfind = await User.findById(id);
    if(!userfind){
        return res.status(404).send({
            message:"User does not exists please check your data",
            status:"error"
        });
    }
    ///return of result
    return res.status(200).send({
        status:"success",
        message:"User does exists",
        User:userfind
    });
}catch(ex){
    res.status(500).send({message:"system error contact it support", status:ex.message});
}
}

const list =(req,res)=>{
    ///control page
    let page=1;
    if(req.params.page){
        page = req.params.page;
    }
    page=parseInt(page);        
    ///mongoose pagination
    User.find().sort('_id');
    //return res
    return res.status(200).send({
        status:"success",
        message:"listado de usuarios",
        page,
    });
}

const update=async(req,res)=>{
    if(req.body.password!=null){
        const passwordHash =await bcrypt.hash(req.body.password,10);
        req.body.password=passwordHash;
    }
    try{
        const myUserProfile =await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!myUserProfile){
            return res.status(404).send({message:"profile not found"});
        }
        return res.status(200).send({
            status:"success",
            message:"User updated successfully",
            myUserProfile
        });
    
        }catch(error){
          return  res.status(404).json({message:"task could not be found"});
        }
}

const upload= async(req,res)=>{

    ///Obtener el fichero de imagen
    if(!req.file){
        return res.status(404).send({
            status:"error",
            message:"Peticion no incluye imagen"
        });
    }
    ///nombre del archivo
    let image = req.file.originalname;
    ///obtener la extension
    let imageSplit = image.split("\.");
    let extension = imageSplit[1];
    //comprobar extension
    if(extension !="png" && extension!="jpg" && extension!="jpeg" && extension!= "gif"){
        //Borrar archivo
        const filePath = req.file.path;
        const fileDeleted = fs.unlinkSync(filePath);
        return res.status(400).send({
            status:"error",
            message:"Extension del fichero invalido"
        })
    }
    ///guardar en DB
    let usertoupdate = await User.findOneAndUpdate(req.params.id,{image:req.file.filename},{new:true});
    
    if(!usertoupdate){
        return res.status(500).send({
            status:"error",
            message:"User not found please try with another User"
        })
    }


    return res.status(200).send({
        status:"success",
        user:usertoupdate,
        file:req.file,
        image:image
    });
}


///export actions
module.exports={
    pruebaUser,register,login,profile,list,update,upload
}