
const express = require("express");

const app = express();

const cors = require("cors");
app.use(cors({credentials: true, origin: "*"}));

const cookie = require("cookie-parser");
app.use(cookie())

const fileupload = require("express-fileupload");
app.use(fileupload({

    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}))

require("dotenv").config();

const port = process.env.PORT || 4000

const dbconnect = require("./config/dbconnect");
dbconnect();

const route = require("./routes/route");
app.use(route);

const cloudinaryconnect = require("./config/cloudinary");
cloudinaryconnect();

app.get('/',(req,res)=>{

    res.send("Hello server")
})

app.listen(port,()=>{

    console.log(`server running on port ${port} successfully`);
})