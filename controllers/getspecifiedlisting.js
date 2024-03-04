const listingmod = require("../models/listing");

exports.getspecifiedlisting = async(req,res)=>{

    const tag = req.params.cat;

    try{

        const result = await listingmod.find({tag:tag}).populate("ratingandreviews").populate("userwhomadethislisting");

        res.status(200).json({

            success:true,
            data:result,
            message:"Fetched listing successfully"
        })
    }
    catch(err){

        res.status(400).json({

            success:false,
            message:`error in fetching all listing because ${err.message}`
        })
    }
}


exports.getspecifiedlistingid = async(req,res)=>{

    const {id} = req.params;

    try{

        const result = await listingmod.findById(id).populate("ratingandreviews").populate("userwhomadethislisting").populate("userwhohasgivenrating");

        res.status(200).json({

            success:true,
            data:result,
            message:"Fetched listing based on id successfully"
        })
    }
    catch(err){

        res.status(400).json({

            success:false,
            message:`error in fetching listing based on id because ${err.message}`
        })
    }
}