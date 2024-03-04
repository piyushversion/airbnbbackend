
const list = require("../models/listing");
const rat = require("../models/ratingandreviews");
const use = require("../models/user");

exports.deletelisting = async(req,res)=>{

    try{

        const id = req.params.id;

        const r = await list.findById({_id:id});

        const res4 = await list.findByIdAndDelete(id);

        console.log(r.userwhomadethislisting.toJSON())
        
        const res1 = await use.findByIdAndUpdate(r.userwhomadethislisting.toJSON(),{$pull:{nooflistingthisusermade:id}},{new:true})

        const res2 = await use.findByIdAndUpdate(r.userwhomadethislisting.toJSON(),{$pull:{ratingandreviewsonwhichpost:id}},{multi:true},{new:true});

        const res3 = await rat.deleteMany({ratingandreviewsonwhichlisting:id},{new:true});

        console.log(id)
        console.log(r)
        console.log(res4)
        console.log(res1)
        console.log(res2)
        console.log(res3)

        return res.status(200).json({

            success:true,
            message:"listing deleted successfully"
        })
    }
    catch(err){

        res.status(400).json({

            success:false,
            message:`error in deleting listing because ${err.message}`
        })
    }
}