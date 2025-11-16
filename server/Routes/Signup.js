const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "abcdefghijklmnopqrstuvwxyz";

const { body, validationResult } = require("express-validator");

router.post(
  "/Signup",
  body("email", "invalid email").isEmail(),
  body("password", "too small").isLength({ min: 5 }),
  async (req, res) => {
    try {
      //logic for signin

      const username = req.body.email;
      const pswd = req.body.password;
      console.log(pswd);
      let userdata = await User.findOne({ email: username });
      // console.log(userdata.password);
      console.log({ userdata });

      const data = {
        user: {
          id: userdata._id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);

      const comparepswd = await bcrypt.compare(pswd, userdata.password);
      console.log(comparepswd);
      if (userdata && comparepswd) {
        res.send({ userdata, authToken });
      } else {
        res.send("No such user found");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
