
const express = require("express");

const route = express.Router();

const{register} = require("../controllers/register");
const{loginuser} = require("../controllers/login");
const{listingcont} = require("../controllers/listing");
const{ratingandreviewscont} = require("../controllers/ratingandreviews");
const{getalllisting} = require("../controllers/getalllisting");
const{getspecifiedlisting} = require("../controllers/getspecifiedlisting");
const{getspecifiedlistingid} = require("../controllers/getspecifiedlisting");
const{deletelisting} = require("../controllers/deletelisting");
const{updatelisting} = require("../controllers/updatelisting");

const{authmiddleware} = require("../middleware/auth")

route.post("/register",register);
route.post("/login",loginuser);
route.post("/listing",authmiddleware,listingcont);
route.post("/ratingandreviews/:listingId",ratingandreviewscont);
route.get("/getalllisting",getalllisting);
route.get("/getspecifiedlistingcat/:cat",getspecifiedlisting);
route.get("/getspecifiedlistingid/:id",getspecifiedlistingid);
route.delete("/deletelisting/:id",deletelisting);
route.post("/editlisting/:id",updatelisting);

route.post("/check",authmiddleware,(req,res)=>{

      res.status(200).json({

            success:true,
            message:"check"
      })
});

module.exports = route;