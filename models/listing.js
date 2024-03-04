
const mongoose = require("mongoose");

const listingschema = new mongoose.Schema({

    title:{

        type:String,
        required:true
    },
    description:{

        type:String,
        required:true
    },
    imageurl:{

        type:String
    },
    tag:{

        type:String,
        required:true
    },
    price:{

        type:Number,
        required:true
    },
    country:{

        type:String,
        required:true
    },
    location:{

        type:String,
        required:true
    },
    ratingandreviews:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ratingandreviews"
        }
    ],
    userwhomadethislisting:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    userwhohasgivenrating:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ]
})

module.exports = mongoose.model("listing",listingschema)