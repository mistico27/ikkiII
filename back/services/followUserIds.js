
const follow = require("../models/follow");

const followUserIds = async(identityUserId)=>{
try{
    ///following Data   
    let following = await follow.find({"user":identityUserId})
                                .select({"followed":1});

    let followers = await follow.find({"followed":identityUserId})
                                .select({"user":1});
    
    ///Array de identificadores
    let followingClean = [];
    following.forEach(Follow =>{
        followingClean.push(Follow.followed)
    });                             

    let followersClean = [];
    followers.forEach(Followers =>{
        followersClean.push(Followers.user)
    });    

    return {
        following:followingClean,
        followers:followersClean
    }

    }catch(ex){
    return false;
    }  

}

const followThisUser = async(identityUserId,profileUserId)=>{
    try{
    ///following Data   
    let following = await follow.find({"user":identityUserId,"followed":profileUserId});
    let follower = await follow.find({"user":profileUserId,"followed":identityUserId});

    console.log(following);                            
    return{
        following,
        follower
    };    

    }catch(e){
        return false;
    }
}



module.exports ={
    followUserIds,followThisUser
}
