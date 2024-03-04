const jwt = require("jsonwebtoken");

const ratingandreviewsmodel = require("../models/ratingandreviews");
const listingmodel = require("../models/listing");
const user = require("../models/user");


require("dotenv").config();

exports.ratingandreviewscont = async(req,res)=>{

    try{

        const{rating,reviews} = req.body;
        const listingid = req.params.listingId;

        if(!rating || !reviews){

            return res.status(500).json({

                success:false,
                message:"please fill the both the inputs"
            })
        }

        if(!listingid){

            return res.status(500).json({

                success:false,
                message:"listing id missing"
            })
        }

        const token = req.cookies.aircookie || req.header("Authorization").replace("Bearer ","");

        const verify = await jwt.verify(token,process.env.jwtsecret)

        const insert = await ratingandreviewsmodel.create({rating:rating,reviews:reviews,ratingandreviewsonwhichlisting:listingid});

        const update = await ratingandreviewsmodel.findByIdAndUpdate(insert._id,{$push:{userwhohasgivenratingandreviews:verify.id}},{new:true});

        const updateagain = await listingmodel.findByIdAndUpdate(listingid,{$push:{ratingandreviews:update._id}},{new:true})

        const updateagainn = await listingmodel.findByIdAndUpdate(listingid,{$push:{userwhohasgivenrating:verify.id}},{new:true})

        const update2 = await user.findByIdAndUpdate(verify.id,{$push:{ratingandreviewsonwhichpost:updateagain._id}},{new:true})

        res.status(200).json({

            success:true,
            data:{

                verify,
                insert,
                update,
                updateagain,
                updateagainn,
                update2
            },
            message:"rating and reviews inserted successfully"
        })
    }
    catch(err){

        res.status(400).json({

            success:false,
            message:`error in creating rating and review because ${err.message}`
        })
    }
}