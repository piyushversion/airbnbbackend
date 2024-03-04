
const mongoose = require("mongoose");

const ratingandreviewsschema = new mongoose.Schema({

    rating:{

        type:Number
    },
    reviews:{

        type:String
    },
    userwhohasgivenratingandreviews:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    ratingandreviewsonwhichlisting:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"listing"
    }

})

module.exports = mongoose.model("ratingandreviews",ratingandreviewsschema)