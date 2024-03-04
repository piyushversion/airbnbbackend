const listing = require("../models/listing");
const user = require("../models/user");
const cloudinary = require("cloudinary").v2;

exports.updatelisting = async(req,res)=>{

     try{

        const{title,description,tag,price,country,location} = req.body;

        const image = req.files.file

        const id = req.params.id;

        if(!title || !description || !tag || !price || !country || !location || !image){

            return res.status(400).json({

                success:false,
                note:"partially",
                message:"Enter all the inputs"
            })
        }

        const supportedtypes = ['jpg','jpeg','png'];
        const imagetype = image.name.split(".")[1].toLowerCase();

        if(!supportedtypes.includes(imagetype)){

            return res.status(500).json({

                success:false,
                note:"partially",
                message:"File type not supported"
            })
        }

        const options = {

            folder:"airbnb",
            resource_type:"auto"
        }

        const upload = await cloudinary.uploader.upload(image.tempFilePath,options)

        if(!upload){

            return res.status(500).json({

                success:false,
                note:"partially",
                message:"Failed to upload image to cloudinary"
            })
        }

        const r = await listing.findByIdAndUpdate(id,{title:title,description:description,imageurl:upload.secure_url,tag:tag,price:price,country:country,location:location},{new:true})

        if(!r){

            return res.status(400).json({

                success:false,
                message:"cannot update listing"
            })
        }

        res.status(200).json({

            success:true,
            data:r,
            message:"Updated successfully"
        })

     }
     catch(err){

        res.status(400).json({

            success:false,
            message:`error in updating listing because ${err.message}`
        })
     }
}