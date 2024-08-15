const {connection} = require("./Database/connection");
const express = require("express");
const cors = require("cors")

///connection
connection();
///create server node
const app = express();
///cors configuration
app.use(cors());
///transform to object js
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userRoutes = require("./routes/user");
const publicationRoutes = require("./routes/publications");
const followRoutes = require("./routes/follow");

app.use("/api",userRoutes);
app.use("/api",publicationRoutes);
app.use("/api",followRoutes);


//test
app.get("/ruta", (req,res)=>{
    return res.status(200).json(
        {
            "id":1,
            "nombre":"Chris",
            "Web":"Soy el mas chingon"
        }
    )
})

//server
app.listen(8087,()=>{
    console.log("Server Running on port selected", 8087);
});