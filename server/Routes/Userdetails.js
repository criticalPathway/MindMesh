const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Profile = require("../models/Profile");

router.post("/userdetails", async (req, res) => {
  console.log("userid");
  const id = req.body.UserId;
  console.log(id);
  try {
   
    const Data = await User.findOne({ _id: id }).select("-password");
    console.log("userdata");
    console.log(Data);
    const userProfile = await Profile.find({ userId: id });
    console.log("userprofile");
    console.log(userProfile);
    res.send({ Data, userProfile });
    console.log("sent");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
