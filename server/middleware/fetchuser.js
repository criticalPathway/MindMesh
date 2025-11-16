const jwt = require("jsonwebtoken");
const jwtSecret = "abcdefghijklmnopqrstuvwxyz";
const User = require("../models/User");

const fetchuser = (req, res,next) => {
//   console.log(req.body);
  const authToken = req.body.Token;
  if (!authToken) {
    console.log("tokennotfound");
  }
  try {
    const data = jwt.verify(authToken, jwtSecret);
    req.user=data.user;
    next();
   //  console.log(req.user);
    
  } catch (e) {}
};
module.exports = { fetchuser };
