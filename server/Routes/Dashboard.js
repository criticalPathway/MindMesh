const express = require("express");
const router = express.Router();
const User = require("../models/User"); //we select the table

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "abcdefghijklmnopqrstuvwxyz";
const { fetchuser } = require("../middleware/fetchuser");

router.post("/dashboard", fetchuser, async (req, res) => {
  console.log("dashboard data")
  const id = req.user.id;
  console.log(id);

  const userdata = await User.find({ _id: id })
    .select("-password")
    .select("-mob");
  // console.log(userdata);
  res.send({id:id})
});
module.exports = router;
