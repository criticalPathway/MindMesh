//route to frontend and table
// the data from form will store here and go to backend

const express = require("express");
const router = express.Router();
const User = require("../models/User"); //we select the table
const Profile = require("../models/Profile"); //we select the table
const Wallet = require("../models/Wallet"); //we select the table
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "abcdefghijklmnopqrstuvwxyz";

router.post(
  "/creatuser",
  body("email", "invalid email").isEmail(),
  body("password", "too small").isLength({ min: 5 }),
  async (req, res) => {
    // console.log(req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const salt = await bcrypt.genSalt(10);
      const securepassword = await bcrypt.hash(req.body.password, salt);
      console.log(securepassword);

      const data = await User.find({ email: req.body.email });
      console.log(data);
      console.log(data.length);
      if (data.length === 0) {
        await User.create({
          // first_name is column name and instead of hardcode we will write req.body.<parameter_name>
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          age: req.body.age,
          mob: req.body.mob,
          email: req.body.email,
          password: securepassword,
        }).then(console.log("user created"));
        // .then(res.json({success:true,userexist:false}))

        const email = req.body.email;
        let userdata = await User.findOne({ email: req.body.email });
        console.log("user data which is just created");
        console.log(userdata);
        // console.log(userdata.password);
        
        await Wallet.create({
          UserId: userdata._id,
          Amount: 100000,
          Invested:0,
        }).then(console.log("wallet created"));

        await Profile.create({
          userId: userdata._id,
          url: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=6hQNACQQjktni8CxSS_QSPqJv2tycskYmpFGzxv3FNs=",
        }).then(console.log("profile created"));


        const data = {
          user: {
            id: userdata._id,
          },
        };
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success: true, userexist: false, authToken: authToken });
      } else {
        console.log("user exist");
        res.json({ success: false, userexist: true });
        // console.log(res);
      }

      // res.send({ message: "done" });
      // console.log("hello_value created");
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
