
const user = require("../models/user");


exports.register = async(req,res)=>{

    try{

        const{username,email,password} = req.body;

        if(!username || !email || !password){

            return res.status(400).json({

                success:false,
                note:"partially",
                message:"Please enter all the details"
            })
        }
        
        const check = await user.findOne({email:email});

        if(check){


            return res.status(403).json({

                success:false,
                note:"partially",
                message:"Already registered, please login to continue"
            })
        }

        const registeruser = await user.create({username,email,password})

        res.status(200).json({

            success:true,
            data:registeruser,
            note:"partially",
            message:"user registered successfully"
        })
    }
    catch(err){

        res.status(500).json({

            success:false,
            note:"fully",
            message:`Error occured while registering because ${err.message}`
        })
    }
}