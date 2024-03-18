
const mongoose = require("mongoose");
const transporter = require("../config/nodemailer");

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

userschema.post("save",async(doc)=>{

    try{

        const sendmail = await transporter.sendMail({

            from:"piyushdhote",
            to:`${doc.email}`,
            subject:"Mail from airbnb",
            text:`Thanks for registering. here are our credentials username:${doc.username} password:${doc.password}`
        })

        console.log(sendmail)
    }
    catch(err){

        console.log(`error occured while sending the mail because ${err.message}`)

    }
})

module.exports = mongoose.model("user",userschema)