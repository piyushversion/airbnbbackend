
const mongoose = require("mongoose");

require("dotenv").config();

const dbconnect = async (req,res)=>{

    mongoose.connect(process.env.dburl,{


    }).then(()=>{console.log("Db connection successfull")}).catch((err)=>console.log(`error occured while db connection because ${err.message}`));
}

module.exports = dbconnect;