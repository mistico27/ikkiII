const {Schema,mongoose} = require('mongoose');
const FollowSchema=new mongoose.Schema({
    user:{
        type:Schema.ObjectId,
        ref:"User"
    },
    followed:{
        type:Schema.ObjectId,
        ref:"User"
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});


module.exports=mongoose.model("Follow",FollowSchema,"follows");
