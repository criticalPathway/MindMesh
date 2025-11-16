const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile"); //we select the table

router.post(
  "/profileupdate",

  async (req, ress) => {
    console.log("update section")
      console.log(req.body.ProfileUrl)
      let query={id:req.body.UserId}
      if(query.length!==0){

        let newvalue={ $set: {url:req.body.ProfileUrl} };
        Profile.updateOne(query, newvalue, function(err,res) {
            if (err) throw err;
            console.log("1 document updated");
          ress.send({UserId:req.body.UserId})
        });
      }
      else{
        console.log("no image")
      }
        
    try {
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
