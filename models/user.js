
const mongoose = require("mongoose");

const userschema = new mongoose.Schema({

    username:{

        type:String,
        required:true
    },
    email:{

        type:String,
        required:true
    },
    password:{

        type:String,
        required:true
    },
    nooflistingthisusermade:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"listing"
        }
    ],
    ratingandreviewsonwhichpost:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ratingandreviews"

        }
    ]
})

module.exports = mongoose.model("user",userschema)