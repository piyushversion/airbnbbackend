
const listingmod = require("../models/listing");

exports.getalllisting = async(req,res)=>{

    try{

        const result = await listingmod.find({}).populate("ratingandreviews").populate("userwhomadethislisting");

        res.status(200).json({

            success:true,
            data:result,
            message:"Fetched all listing successfully"
        })
    }
    catch(err){

        res.status(400).json({

            success:false,
            message:`error in fetching all listing because ${err.message}`
        })
    }
}