const follow =require("../models/follow");
const user = require("../models/user");
///servicio
const followService = require("../services/followUserIds");


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
    if(!userttofind){
        return res.status(500).json(["user could not be founded"],);
    }

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

///listado de usuarios que estoy haciendo follow
const following =async(req,res)=>{
    try{
    let userId =req.user.id;
    if(req.params.id){
        userId=req.params.id;
    }
    let myFollows = await follow.find({user:userId}).populate("user followed", "-password -role -__v")
    let total=myFollows.length;
 
    let followUSerIds = await followService.followUserIds(req.user.id);


    return res.status(200).send({
        message:" Following method created correctamente",
        status:"correct",
        myFollows,
        total,
        userFollowing:followUSerIds.following,
        userFollowingMe:followUSerIds.followers
    });
   }catch(ex){
    res.status(500).send({message:"system error contact it support", status:ex.message});
   }
}

///listado de usuarios que me estan siguiendo
const followers =(req,res)=>{

    return res.status(200).send({
        message:" Followed method que me siguen",
        status:"correct"
    });
}



///export actions
module.exports={
    pruebaFollow,save,UnFollowed,followers,following
}