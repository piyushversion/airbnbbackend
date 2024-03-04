const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.authmiddleware = async(req,res,next)=>{

    try{

        const authtoken = req.cookies.aircookie || req.header("Authorization").replace("Bearer ","");

        if(!authtoken){

            return res.status(400).json({

                success:false,
                message:"token/cookie missing"
            })
        }

        try{

            const verify = await jwt.verify(authtoken,process.env.jwtsecret)

            req.tokendata = verify;
        }
        catch(err){

            return res.status(400).json({

                success:false,
                message:`cannot verify token because ${err.message}`
            })
        }
        
        next();
    }
    catch(err){

        return res.status(400).json({

            success:false,
            message:`authentication failed because ${err.message}`
        })
    }
}