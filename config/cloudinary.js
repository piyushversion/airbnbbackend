
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

async function cloudinaryconnect(){

    await cloudinary.config({

        cloud_name:process.env.cloudname,
        api_key:process.env.apikey,
        api_secret:process.env.apisecret
    })
}

module.exports = cloudinaryconnect;