const mongoose = require('mongoose');
const connection = async()=>{
    const databaseURL='mongodb+srv://crisfris27:uroOkArFF0ueWhzB@cluster0.nkmyn.mongodb.net/ikki'
    mongoose.connect(databaseURL)
    .then(() => {
    console.log("estamos conectados a mongo jajaj!!!!");
    })
    .catch((err) => {
    console.log("We have an error, we could not connected to my_blog database", err);
    });
    
}

///exports
module.exports= {
    connection  
};