const follow =require("../models/follow");
const user = require("../models/user");

const pruebaFollow =(req,res)=>{
    return res.status(200).send({
        message:"mensaje de prueba enviado desde: controller/follow.js"
    });
}

///follow action
const save=async(req,res)=>{
    ///get data by body
    try{
        const params = req.body;
        ///sacar id del objeto identificado
        const identity=req.user;
        let userToFollow = new follow();
        userToFollow.user = identity.id;
        userToFollow.followed = params.followed;
        //save object db
        const savedToFollow = await userToFollow.save();
    
        return res.status(200).send({
            message:"Follow correcto",
            status:"correct",
            identity:req.user,
            follow:savedToFollow
        });
    
    }catch(error){
        return res.status(400).json({
            message:"user could not be created",
            error:error
        })
    }
}

const UnFollowed =async(req,res)=>{
    try{
    ///pick up the id of the identify user
    const userId = req.user.id;
    ///Pick  the id that i want to stop follow
    const followeId =req.params.id;
    //find coincidences and remove
    let userttofind= await follow.find({
        "user":userId,
        "followed":followeId
    })

    let deleteFollowed = await follow.deleteOne({followeId:userttofind.followed});

        return res.status(200).send({
            message:" Follow eliminado correctamente",
            status:"correct",
            deleteFollowed
        });
    }catch(ex){
        res.status(500).send({message:"system error contact it support", status:ex.message});
    }    
}


///export actions
module.exports={
    pruebaFollow,save,UnFollowed
}