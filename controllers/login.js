
const user = require("../models/user");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.loginuser = async(req,res)=>{

    try{

        const{username,password} = req.body;

        if(!username || !password){

            return res.status(400).json({

                success:false,
                note:"partially",
                message:"Please Enter all the details"
            })
        }

        const check = await user.findOne({username:username});

        if(!check){

            return res.status(400).json({

                success:false,
                note:"partially",
                message:"Not registered, please register to continue"
            })
        }

        if(password !== await check.password){

            return res.status(400).json({

                success:false,
                note:"partially",
                message:"Entered Wrong Password"
            })
        }

        const payload = {

            name:check.username,
            email:check.password,
            id:check._id
        }

        const token = await jwt.sign(payload,process.env.jwtsecret,{

            expiresIn:3600
        })

        return res.cookie("aircookie",token,{

            expires:new Date(Date.now() + 3600000 ),
            httpOnly:true
        })
        .status(200).json({

            success:true,
            token:token,
            data:check,
            message:"LoggedIn successfully"
        })
    }
    catch(err){

        return res.status(400).json({

            success:false,
            note:"fully",
            message:`error occured while login because ${err.message}`
        })
    }
}