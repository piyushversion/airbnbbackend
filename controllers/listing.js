
const listing = require("../models/listing");
const user = require("../models/user");
const cloudinary = require("cloudinary").v2;

exports.listingcont = async(req,res)=>{

    try{

        const{title,description,tag,price,country,location} = req.body;

        const image = req.files.file

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

        const dbentry = await listing.create({title,description,tag,price,country,location,imageurl:upload.secure_url})



        if(!dbentry){

            return res.status(500).json({

                success:false,
                note:"partially",
                message:"Failed to create entry in db"
            })
        }

        const userid = req.tokendata.id;

        const update = await listing.findByIdAndUpdate(dbentry._id,{userwhomadethislisting:userid},{new:true})

        const update2 = await user.findByIdAndUpdate(userid,{$push:{nooflistingthisusermade:update._id}},{new:true})

        res.status(200).json({

            success:true,
            data:{

                upload,
                dbentry,
                update,
                update2
            },
            message:"Listing created successfully"
        })
    }
    catch(err){

        res.status(400).json({

            success:false,
            note:"fully",
            message:`error in creating listing because ${err.message}`
        })
    }
}